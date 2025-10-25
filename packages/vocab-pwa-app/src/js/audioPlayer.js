import storage from './storage.js';

class AudioPlayer {
  constructor() {
    this.currentAudio = null;
    this.speed = 1;
    this.speechSynthesis = window.speechSynthesis;
    this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    this.userInteracted = false;
  }

  setSpeed(speed) {
    this.speed = parseFloat(speed);
  }

  async play(word, audioUrl = null) {
    this.stop();

    if (audioUrl) {
      return this.playLocalAudio(audioUrl);
    }

    const cachedAudio = await storage.getCachedAudio(word);
    if (cachedAudio && cachedAudio.blob) {
      return this.playFromBlob(cachedAudio.blob);
    }

    try {
      const audioBlob = await this.fetchGoogleTTS(word);
      await storage.cacheAudio(word, audioBlob);
      return this.playFromBlob(audioBlob);
    } catch (error) {
      console.warn('Google TTS failed, falling back to Web Speech API:', error);
      return this.playWithWebSpeech(word);
    }
  }

  async fetchGoogleTTS(text) {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(text)}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('TTS fetch failed');
    }

    return response.blob();
  }

  playFromBlob(blob) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(blob);
      this.currentAudio = new Audio(url);
      this.currentAudio.playbackRate = this.speed;

      this.currentAudio.onended = () => {
        URL.revokeObjectURL(url);
        resolve();
      };

      this.currentAudio.onerror = (error) => {
        URL.revokeObjectURL(url);
        reject(error);
      };

      const playPromise = this.currentAudio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          if (error.name === 'NotAllowedError') {
            console.warn('Audio playback requires user interaction');
          }
          reject(error);
        });
      }
    });
  }

  playLocalAudio(audioUrl) {
    return new Promise((resolve, reject) => {
      this.currentAudio = new Audio(audioUrl);
      this.currentAudio.playbackRate = this.speed;

      this.currentAudio.onended = () => resolve();
      this.currentAudio.onerror = (error) => reject(error);

      const playPromise = this.currentAudio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(reject);
      }
    });
  }

  playWithWebSpeech(text) {
    return new Promise((resolve, reject) => {
      if (!this.speechSynthesis) {
        reject(new Error('Speech Synthesis not supported'));
        return;
      }

      this.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = this.speed;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onend = () => resolve();
      utterance.onerror = (error) => reject(error);

      this.speechSynthesis.speak(utterance);
    });
  }

  stop() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }

    if (this.speechSynthesis) {
      this.speechSynthesis.cancel();
    }
  }

  enableUserInteraction() {
    this.userInteracted = true;
  }

  async preloadAudio(words) {
    const promises = words.slice(0, 5).map(async (word) => {
      const cached = await storage.getCachedAudio(word.english);
      if (!cached) {
        try {
          const blob = await this.fetchGoogleTTS(word.english);
          await storage.cacheAudio(word.english, blob);
        } catch (error) {
          console.warn(`Failed to preload audio for ${word.english}:`, error);
        }
      }
    });

    return Promise.allSettled(promises);
  }
}

const audioPlayer = new AudioPlayer();

export default audioPlayer;
