// Function derived from Jasmid's AudioPlayer (https://github.com/gasman/jasmid)
//
// Copyright (c) 2010, Matt Westcott & Ben Firshman
//
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//  * Redistributions of source code must retain the above copyright notice, this
//    list of conditions and the following disclaimer.
//  * Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution.
//  * The names of its contributors may not be used to endorse or promote products
//    derived from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
// ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
// ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
export function playMidi(midiFile: { header: any; tracks: any }, onFinishCallback?: () => void) {
  const context = new window.AudioContext();
  const sampleRate = context.sampleRate;
  const channelCount = 2;
  const bufferSize = 4096 * 4;
  const node = context.createScriptProcessor(bufferSize, 0, channelCount);
  const generator = (() => {
    const synth = (() => {
      let generators: any[] = [];

      const addGenerator = (generator: any) => {
        generators.push(generator);
      };

      const generate = (samples: number) => {
        let data = new Array(samples * 2);
        generateIntoBuffer(samples, data, 0);
        return data;
      };

      const generateIntoBuffer = (samplesToGenerate: number, buffer: any[], offset: number) => {
        for (let i = offset; i < offset + samplesToGenerate * 2; i++) {
          buffer[i] = 0;
        }
        for (let i = generators.length - 1; i >= 0; i--) {
          generators[i].generate(buffer, offset, samplesToGenerate);
          if (!generators[i].alive) generators.splice(i, 1);
        }
      };

      return {
        sampleRate,
        addGenerator,
        generate,
        generateIntoBuffer,
      };
    })();
    let trackStates: string | any[] = [];
    let beatsPerMinute = 120;
    let ticksPerBeat = midiFile.header.ticksPerBeat;
    let channelCount = 16;

    for (let i = 0; i < midiFile.tracks.length; i++) {
      trackStates[i] = {
        nextEventIndex: 0,
        ticksToNextEvent: midiFile.tracks[i].length ? midiFile.tracks[i][0].deltaTime : null,
      };
    }

    let channels: {
      noteOn: (note: any, velocity: any) => void;
      noteOff: (note: any, velocity: any) => void;
    }[] = [];

    const Channel = () => {
      let generatorsByNote: Record<string, any> = {};
      let currentProgram = {
        createNote: (note: any, velocity: number) => {
          let frequency = 440 * Math.pow(2, (note - 69) / 12);
          const attackAmplitude = 0.2;
          const sustainAmplitude = 0.1;
          const attackTime = 0.02;
          const decayTime = 0.3;
          const releaseTime = 0.02;

          const SineGenerator = (freq: number) => {
            let period = sampleRate / freq;
            let t = 0;
            return {
              alive: true,
              generate: (buf: number[], offset: number, count: number) => {
                for (; count; count--) {
                  let phase = t / period;
                  let result = Math.sin(phase * 2 * Math.PI);
                  buf[offset++] += result;
                  buf[offset++] += result;
                  t++;
                }
              },
            };
          };

          const ADSRGenerator = (
            child: { alive?: boolean; generate?: any },
            attackAmplitude: number,
            sustainAmplitude: number,
            attackTimeS: number,
            decayTimeS: number,
            releaseTimeS: number
          ) => {
            let attackTime = sampleRate * attackTimeS;
            let decayTime = sampleRate * (attackTimeS + decayTimeS);
            let decayRate = (attackAmplitude - sustainAmplitude) / (decayTime - attackTime);
            let releaseTime: number | null = null;
            let endTime: number | null = null;
            let releaseRate = sustainAmplitude / (sampleRate * releaseTimeS);
            let t = 0;
            let self = {
              alive: true,
              released: false,
              noteOff: () => {
                if (self.released) return;
                releaseTime = t;
                self.released = true;
                endTime = releaseTime + sampleRate * releaseTimeS;
              },
              generate: (buf: number[], offset: number, count: number) => {
                if (!self.alive) return;
                let input = new Array(count * 2);
                for (let i = 0; i < count * 2; i++) {
                  input[i] = 0;
                }
                child.generate(input, 0, count);

                let childOffset = 0;
                while (count) {
                  if (releaseTime != null) {
                    if (t < endTime!) {
                      while (count && t < endTime!) {
                        let ampl = sustainAmplitude - releaseRate * (t - releaseTime);
                        buf[offset++] += input[childOffset++] * ampl;
                        buf[offset++] += input[childOffset++] * ampl;
                        t++;
                        count--;
                      }
                    } else {
                      self.alive = false;
                      return;
                    }
                  } else if (t < attackTime) {
                    while (count && t < attackTime) {
                      let ampl = (attackAmplitude * t) / attackTime;
                      buf[offset++] += input[childOffset++] * ampl;
                      buf[offset++] += input[childOffset++] * ampl;
                      t++;
                      count--;
                    }
                  } else if (t < decayTime) {
                    while (count && t < decayTime) {
                      let ampl = attackAmplitude - decayRate * (t - attackTime);
                      buf[offset++] += input[childOffset++] * ampl;
                      buf[offset++] += input[childOffset++] * ampl;
                      t++;
                      count--;
                    }
                  } else {
                    while (count) {
                      buf[offset++] += input[childOffset++] * sustainAmplitude;
                      buf[offset++] += input[childOffset++] * sustainAmplitude;
                      t++;
                      count--;
                    }
                  }
                }
              },
            };

            return self;
          };

          return ADSRGenerator(
            SineGenerator(frequency),
            attackAmplitude * (velocity / 128),
            sustainAmplitude * (velocity / 128),
            attackTime,
            decayTime,
            releaseTime
          );
        },
      };
      let generator;

      const noteOn = (note: string | number, velocity: any) => {
        if (generatorsByNote[note] && !generatorsByNote[note].released) {
          generatorsByNote[note].noteOff();
        }
        generator = currentProgram.createNote(note, velocity);
        synth.addGenerator(generator);
        generatorsByNote[note] = generator;
      };

      const noteOff = (note: string | number, velocity: any) => {
        if (generatorsByNote[note] && !generatorsByNote[note].released) {
          generatorsByNote[note].noteOff(velocity);
        }
      };

      return {
        noteOn,
        noteOff,
      };
    };

    for (let i = 0; i < channelCount; i++) {
      channels[i] = Channel();
    }

    let nextEventInfo: { event: any; ticksToEvent?: any; track?: number } | null;
    let samplesToNextEvent: number | null = 0;
    let finished = false;

    const getNextEvent = () => {
      let ticksToNextEvent = null;
      let nextEventTrack = null;
      let nextEventIndex = null;

      for (let i = 0; i < trackStates.length; i++) {
        if (
          trackStates[i].ticksToNextEvent != null &&
          (ticksToNextEvent == null || trackStates[i].ticksToNextEvent < ticksToNextEvent)
        ) {
          ticksToNextEvent = trackStates[i].ticksToNextEvent;
          nextEventTrack = i;
          nextEventIndex = trackStates[i].nextEventIndex;
        }
      }
      if (nextEventTrack != null) {
        let nextEvent = midiFile.tracks[nextEventTrack][nextEventIndex];
        if (midiFile.tracks[nextEventTrack][nextEventIndex + 1]) {
          trackStates[nextEventTrack].ticksToNextEvent += midiFile.tracks[nextEventTrack][nextEventIndex + 1].deltaTime;
        } else {
          trackStates[nextEventTrack].ticksToNextEvent = null;
        }
        trackStates[nextEventTrack].nextEventIndex += 1;
        for (let i = 0; i < trackStates.length; i++) {
          if (trackStates[i].ticksToNextEvent != null) {
            trackStates[i].ticksToNextEvent -= ticksToNextEvent;
          }
        }
        nextEventInfo = {
          ticksToEvent: ticksToNextEvent,
          event: nextEvent,
          track: nextEventTrack,
        };
        let beatsToNextEvent = ticksToNextEvent / ticksPerBeat;
        let secondsToNextEvent = beatsToNextEvent / (beatsPerMinute / 60);
        samplesToNextEvent! += secondsToNextEvent * synth.sampleRate;
      } else {
        nextEventInfo = null;
        samplesToNextEvent = null;
        finished = true;
      }
    };

    getNextEvent();

    const generate = (samples: number) => {
      let data = new Array(samples * 2);
      let samplesRemaining = samples;
      let dataOffset = 0;

      while (true) {
        if (samplesToNextEvent != null && samplesToNextEvent <= samplesRemaining) {
          let samplesToGenerate = Math.ceil(samplesToNextEvent);
          if (samplesToGenerate > 0) {
            synth.generateIntoBuffer(samplesToGenerate, data, dataOffset);
            dataOffset += samplesToGenerate * 2;
            samplesRemaining -= samplesToGenerate;
            samplesToNextEvent -= samplesToGenerate;
          }

          handleEvent();
          getNextEvent();
        } else {
          if (samplesRemaining > 0) {
            synth.generateIntoBuffer(samplesRemaining, data, dataOffset);
            samplesToNextEvent! -= samplesRemaining;
          }
          break;
        }
      }
      return data;
    };

    const handleEvent = () => {
      if (!nextEventInfo) return;
      let event = nextEventInfo.event;
      switch (event.type) {
        case "meta":
          switch (event.subtype) {
            case "setTempo":
              beatsPerMinute = 60000000 / event.microsecondsPerBeat;
          }
          break;
        case "channel":
          switch (event.subtype) {
            case "noteOn":
              channels[event.channel].noteOn(event.noteNumber, event.velocity);
              break;
            case "noteOff":
              channels[event.channel].noteOff(event.noteNumber, event.velocity);
              break;
          }
          break;
      }
    };

    return {
      generate,
      get hasFinishedPlaying() {
        return finished;
      },
    };
  })();

  node.onaudioprocess = ({ outputBuffer }) => {
    if (generator.hasFinishedPlaying) {
      node.disconnect();
      onFinishCallback?.();
      return;
    }

    const dataLeft = outputBuffer.getChannelData(0);
    const dataRight = outputBuffer.getChannelData(1);
    const generate = generator.generate(bufferSize);

    for (let i = 0; i < bufferSize; ++i) {
      dataLeft[i] = generate[i * 2];
      dataRight[i] = generate[i * 2 + 1];
    }
  };

  node.connect(context.destination);

  return () => node.disconnect();
}
