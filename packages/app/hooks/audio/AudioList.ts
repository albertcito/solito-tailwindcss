import { LoadAudioSuccess } from './loadAudio';

export default class AudioList {
  public audioURL = '';

  public audios : Record<string, LoadAudioSuccess> = {};

  isCurrentAudio(url: string) { return this.audioURL === url; }

  getCurrentURL() { return this.audioURL; }

  getCurrentAudio() { return this.audios[this.audioURL]; }

  async removeWhenDidJustFinish(didJustFinish?: boolean) {
    const audio = this.getCurrentAudio();
    if (audio && didJustFinish) {
      await audio.sound.stopAsync();
      audio.sound.unloadAsync();
    }
  }

  async tooglePlay(playing: boolean) {
    const audio = this.getCurrentAudio();
    if (audio) {
      if (playing) {
        await audio.sound.pauseAsync();
      } else {
        await audio.sound.playAsync();
      }
    }
  }

  setAudioPosition(position: number, time = 3000) {
    const audio = this.getCurrentAudio();
    if (audio && audio.status.isLoaded) {
      audio.sound.setPositionAsync(position + time);
    }
  }

  stopAudio = async () => {
    const audio = this.getCurrentAudio();
    if (audio) {
      await audio.sound.stopAsync();
    }
  };

  async loadAudio(url: string, loadAudio: () => Promise<LoadAudioSuccess>) {
    this.stopAudio();
    this.audioURL = url;
    const audio = await loadAudio();
    this.audios[url] = audio;
    return audio;
  }
}
