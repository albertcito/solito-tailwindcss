import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';

Audio.setAudioModeAsync({
  allowsRecordingIOS: false,
  staysActiveInBackground: false,
  interruptionModeIOS: InterruptionModeIOS.DoNotMix,
  playsInSilentModeIOS: true,
  shouldDuckAndroid: true,
  interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
  playThroughEarpieceAndroid: false,
});

const useAudioPlayer = async () => {

};

export default useAudioPlayer;
