import storage from './storage.js';

class WordBank {
  constructor() {
    this.words = {
      active: [],
      familiar: [],
      difficult: [],
    };
    this.initialized = false;
  }

  async init() {
    await this.loadWords();
    this.initialized = true;
  }

  async loadWords() {
    const allWords = await storage.getWords();
    
    this.words = {
      active: [],
      familiar: [],
      difficult: [],
    };

    allWords.forEach((word) => {
      const category = word.category || 'active';
      if (this.words[category]) {
        this.words[category].push(word);
      }
    });
  }

  async addWords(words) {
    await storage.addWords(words);
    await this.loadWords();
  }

  async moveWord(wordId, fromCategory, toCategory) {
    await storage.moveWord(wordId, toCategory);
    await this.loadWords();
  }

  async deleteWord(wordId) {
    await storage.deleteWord(wordId);
    await this.loadWords();
  }

  getWords(category) {
    if (category) {
      return this.words[category] || [];
    }
    return [
      ...this.words.active,
      ...this.words.familiar,
      ...this.words.difficult,
    ];
  }

  getWordCount(category) {
    if (category) {
      return this.words[category]?.length || 0;
    }
    return (
      this.words.active.length +
      this.words.familiar.length +
      this.words.difficult.length
    );
  }

  searchWords(query, category = null) {
    const words = category ? this.words[category] : this.getWords();
    const lowerQuery = query.toLowerCase();

    return words.filter(
      (word) =>
        word.english.toLowerCase().includes(lowerQuery) ||
        word.chinese.includes(query)
    );
  }

  getRandomWords(count, category = 'active') {
    const words = [...this.words[category]];
    return this.shuffle(words).slice(0, count);
  }

  shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  getDistractors(correctWord, count, category = 'active') {
    const allWords = this.words[category].filter(
      (word) => word.id !== correctWord.id
    );

    if (allWords.length < count) {
      const otherCategories = Object.keys(this.words).filter(
        (cat) => cat !== category
      );
      for (const cat of otherCategories) {
        allWords.push(...this.words[cat]);
      }
    }

    return this.shuffle(allWords).slice(0, count);
  }

  async recordReview(wordId, correct) {
    await storage.recordReview(wordId, correct);
    await this.loadWords();
  }

  async exportWords(category = null) {
    const words = category ? this.words[category] : this.getWords();
    return words.map((word) => ({
      english: word.english,
      chinese: word.chinese,
      audioUrl: word.audioUrl,
      category: word.category,
    }));
  }

  async importWords(words) {
    await this.addWords(words);
  }

  getCategoryStats(category) {
    const words = this.words[category];
    if (!words || words.length === 0) {
      return {
        count: 0,
        totalReviews: 0,
        accuracy: 0,
      };
    }

    const totalReviews = words.reduce(
      (sum, word) => sum + (word.reviewCount || 0),
      0
    );
    const totalCorrect = words.reduce(
      (sum, word) => sum + (word.correctCount || 0),
      0
    );

    return {
      count: words.length,
      totalReviews,
      accuracy: totalReviews > 0 ? (totalCorrect / totalReviews) * 100 : 0,
    };
  }

  getOverallStats() {
    return {
      active: this.getCategoryStats('active'),
      familiar: this.getCategoryStats('familiar'),
      difficult: this.getCategoryStats('difficult'),
    };
  }
}

const wordBank = new WordBank();

export default wordBank;
