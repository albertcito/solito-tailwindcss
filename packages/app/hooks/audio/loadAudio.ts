import { Audio, AVPlaybackStatusSuccess } from 'expo-av';

export interface LoadAudioSuccess {
  sound: Audio.Sound
  status: AVPlaybackStatusSuccess
}

export class AudioErrorResponse extends Error {
  // eslint-disable-next-line no-unused-vars
  constructor(public readonly message: string) {
    super();
    Object.setPrototypeOf(this, AudioErrorResponse.prototype);
  }
}

const loadAudio = async (uri: string): Promise<LoadAudioSuccess> => {
  try {
    const { sound, status } = await Audio.Sound.createAsync({ uri });
    if ('durationMillis' in status) {
      return {
        sound,
        status,
      };
    }
    throw new AudioErrorResponse('Audio could not be downloaded');
  } catch (error) {
    throw new AudioErrorResponse(error.message);
  }
};

export default loadAudio;
