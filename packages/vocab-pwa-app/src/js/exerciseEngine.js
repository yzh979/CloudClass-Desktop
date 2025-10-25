import wordBank from './wordBank.js';
import audioPlayer from './audioPlayer.js';
import storage from './storage.js';

class ExerciseEngine {
  constructor() {
    this.currentMode = 'spelling';
    this.words = [];
    this.currentIndex = 0;
    this.correctCount = 0;
    this.startTime = null;
    this.sessionData = [];
  }

  init(mode, wordsPerSession = 20) {
    this.currentMode = mode;
    this.words = wordBank.getRandomWords(wordsPerSession);
    this.currentIndex = 0;
    this.correctCount = 0;
    this.startTime = Date.now();
    this.sessionData = [];

    if (this.words.length === 0) {
      throw new Error('No words available for practice');
    }

    return {
      totalWords: this.words.length,
      currentWord: this.getCurrentWord(),
    };
  }

  getCurrentWord() {
    if (this.currentIndex >= this.words.length) {
      return null;
    }
    return this.words[this.currentIndex];
  }

  getProgress() {
    return {
      current: this.currentIndex + 1,
      total: this.words.length,
      percentage: Math.round(((this.currentIndex + 1) / this.words.length) * 100),
      correctCount: this.correctCount,
    };
  }

  async checkAnswer(answer) {
    const currentWord = this.getCurrentWord();
    if (!currentWord) return null;

    let correct = false;

    switch (this.currentMode) {
      case 'spelling':
        correct = answer.toLowerCase().trim() === currentWord.english.toLowerCase();
        break;
      case 'cn-to-en':
      case 'en-to-cn':
      case 'audio-to-en':
      case 'audio-to-cn':
        correct = answer === currentWord.id;
        break;
    }

    if (correct) {
      this.correctCount++;
    }

    await wordBank.recordReview(currentWord.id, correct);

    this.sessionData.push({
      wordId: currentWord.id,
      english: currentWord.english,
      chinese: currentWord.chinese,
      correct,
      timestamp: Date.now(),
    });

    return {
      correct,
      correctAnswer: this.getCorrectAnswer(currentWord),
    };
  }

  getCorrectAnswer(word) {
    switch (this.currentMode) {
      case 'spelling':
        return word.english;
      case 'cn-to-en':
      case 'audio-to-en':
        return word.english;
      case 'en-to-cn':
      case 'audio-to-cn':
        return word.chinese;
      default:
        return word.english;
    }
  }

  nextWord() {
    this.currentIndex++;
    return this.getCurrentWord();
  }

  previousWord() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
    return this.getCurrentWord();
  }

  isComplete() {
    return this.currentIndex >= this.words.length;
  }

  async generateExercise() {
    const currentWord = this.getCurrentWord();
    if (!currentWord) return null;

    const exercise = {
      word: currentWord,
      mode: this.currentMode,
    };

    switch (this.currentMode) {
      case 'spelling':
        exercise.display = currentWord.chinese;
        exercise.type = 'input';
        break;

      case 'cn-to-en':
        exercise.display = currentWord.chinese;
        exercise.type = 'choice';
        exercise.options = this.generateChoices(currentWord, 'english');
        break;

      case 'en-to-cn':
        exercise.display = currentWord.english;
        exercise.type = 'choice';
        exercise.options = this.generateChoices(currentWord, 'chinese');
        break;

      case 'audio-to-en':
        exercise.display = currentWord.chinese;
        exercise.type = 'choice';
        exercise.options = this.generateChoices(currentWord, 'english');
        exercise.autoPlayAudio = true;
        break;

      case 'audio-to-cn':
        exercise.display = currentWord.english;
        exercise.type = 'choice';
        exercise.options = this.generateChoices(currentWord, 'chinese');
        exercise.autoPlayAudio = true;
        break;
    }

    return exercise;
  }

  generateChoices(correctWord, field) {
    const distractors = wordBank.getDistractors(correctWord, 3);
    const choices = [
      { id: correctWord.id, text: correctWord[field] },
      ...distractors.map((word) => ({ id: word.id, text: word[field] })),
    ];

    return this.shuffleArray(choices);
  }

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  async playCurrentAudio() {
    const currentWord = this.getCurrentWord();
    if (currentWord) {
      await audioPlayer.play(currentWord.english, currentWord.audioUrl);
    }
  }

  async finishSession() {
    const duration = Math.round((Date.now() - this.startTime) / 1000);
    const accuracy = (this.correctCount / this.words.length) * 100;

    const sessionSummary = {
      mode: this.currentMode,
      wordsStudied: this.words.length,
      accuracy: accuracy,
      duration: duration,
      details: this.sessionData,
    };

    await storage.saveSession({
      mode: this.currentMode,
      wordsStudied: this.words.length,
      accuracy: accuracy,
      duration: duration,
    });

    return sessionSummary;
  }

  getSessionSummary() {
    const duration = Math.round((Date.now() - this.startTime) / 1000);
    const accuracy = (this.correctCount / this.words.length) * 100;

    return {
      mode: this.currentMode,
      totalWords: this.words.length,
      correctCount: this.correctCount,
      incorrectCount: this.words.length - this.correctCount,
      accuracy: accuracy.toFixed(1),
      duration: this.formatDuration(duration),
    };
  }

  formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  }
}

const exerciseEngine = new ExerciseEngine();

export default exerciseEngine;
