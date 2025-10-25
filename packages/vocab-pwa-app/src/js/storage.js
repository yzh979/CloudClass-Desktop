const DB_NAME = 'VocabLearnerDB';
const DB_VERSION = 1;
const STORES = {
  WORDS: 'words',
  SESSIONS: 'sessions',
  AUDIO_CACHE: 'audioCache',
};

class StorageManager {
  constructor() {
    this.db = null;
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        if (!db.objectStoreNames.contains(STORES.WORDS)) {
          const wordStore = db.createObjectStore(STORES.WORDS, {
            keyPath: 'id',
            autoIncrement: true,
          });
          wordStore.createIndex('english', 'english', { unique: false });
          wordStore.createIndex('category', 'category', { unique: false });
          wordStore.createIndex('addedDate', 'addedDate', { unique: false });
        }

        if (!db.objectStoreNames.contains(STORES.SESSIONS)) {
          const sessionStore = db.createObjectStore(STORES.SESSIONS, {
            keyPath: 'id',
            autoIncrement: true,
          });
          sessionStore.createIndex('date', 'date', { unique: false });
        }

        if (!db.objectStoreNames.contains(STORES.AUDIO_CACHE)) {
          const audioStore = db.createObjectStore(STORES.AUDIO_CACHE, {
            keyPath: 'word',
          });
          audioStore.createIndex('cachedDate', 'cachedDate', { unique: false });
        }
      };
    });
  }

  async addWord(word) {
    const transaction = this.db.transaction([STORES.WORDS], 'readwrite');
    const store = transaction.objectStore(STORES.WORDS);
    
    const wordData = {
      english: word.english,
      chinese: word.chinese,
      audioUrl: word.audioUrl || null,
      category: word.category || 'active',
      addedDate: new Date().toISOString(),
      reviewCount: 0,
      correctCount: 0,
      lastReviewed: null,
    };

    return new Promise((resolve, reject) => {
      const request = store.add(wordData);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async addWords(words) {
    const promises = words.map((word) => this.addWord(word));
    return Promise.all(promises);
  }

  async getWords(category = null) {
    const transaction = this.db.transaction([STORES.WORDS], 'readonly');
    const store = transaction.objectStore(STORES.WORDS);

    return new Promise((resolve, reject) => {
      let request;

      if (category) {
        const index = store.index('category');
        request = index.getAll(category);
      } else {
        request = store.getAll();
      }

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async updateWord(id, updates) {
    const transaction = this.db.transaction([STORES.WORDS], 'readwrite');
    const store = transaction.objectStore(STORES.WORDS);

    return new Promise((resolve, reject) => {
      const getRequest = store.get(id);

      getRequest.onsuccess = () => {
        const word = getRequest.result;
        if (!word) {
          reject(new Error('Word not found'));
          return;
        }

        const updatedWord = { ...word, ...updates };
        const updateRequest = store.put(updatedWord);

        updateRequest.onsuccess = () => resolve(updatedWord);
        updateRequest.onerror = () => reject(updateRequest.error);
      };

      getRequest.onerror = () => reject(getRequest.error);
    });
  }

  async deleteWord(id) {
    const transaction = this.db.transaction([STORES.WORDS], 'readwrite');
    const store = transaction.objectStore(STORES.WORDS);

    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async moveWord(id, newCategory) {
    return this.updateWord(id, { category: newCategory });
  }

  async recordReview(wordId, correct) {
    const transaction = this.db.transaction([STORES.WORDS], 'readwrite');
    const store = transaction.objectStore(STORES.WORDS);

    return new Promise((resolve, reject) => {
      const getRequest = store.get(wordId);

      getRequest.onsuccess = () => {
        const word = getRequest.result;
        if (!word) {
          reject(new Error('Word not found'));
          return;
        }

        word.reviewCount = (word.reviewCount || 0) + 1;
        if (correct) {
          word.correctCount = (word.correctCount || 0) + 1;
        }
        word.lastReviewed = new Date().toISOString();

        const updateRequest = store.put(word);
        updateRequest.onsuccess = () => resolve(word);
        updateRequest.onerror = () => reject(updateRequest.error);
      };

      getRequest.onerror = () => reject(getRequest.error);
    });
  }

  async saveSession(sessionData) {
    const transaction = this.db.transaction([STORES.SESSIONS], 'readwrite');
    const store = transaction.objectStore(STORES.SESSIONS);

    const session = {
      date: new Date().toISOString(),
      mode: sessionData.mode,
      wordsStudied: sessionData.wordsStudied,
      accuracy: sessionData.accuracy,
      duration: sessionData.duration,
    };

    return new Promise((resolve, reject) => {
      const request = store.add(session);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getSessions(limit = 10) {
    const transaction = this.db.transaction([STORES.SESSIONS], 'readonly');
    const store = transaction.objectStore(STORES.SESSIONS);
    const index = store.index('date');

    return new Promise((resolve, reject) => {
      const request = index.openCursor(null, 'prev');
      const sessions = [];

      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor && sessions.length < limit) {
          sessions.push(cursor.value);
          cursor.continue();
        } else {
          resolve(sessions);
        }
      };

      request.onerror = () => reject(request.error);
    });
  }

  async cacheAudio(word, audioBlob) {
    const transaction = this.db.transaction([STORES.AUDIO_CACHE], 'readwrite');
    const store = transaction.objectStore(STORES.AUDIO_CACHE);

    const audioData = {
      word,
      blob: audioBlob,
      cachedDate: new Date().toISOString(),
    };

    return new Promise((resolve, reject) => {
      const request = store.put(audioData);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getCachedAudio(word) {
    const transaction = this.db.transaction([STORES.AUDIO_CACHE], 'readonly');
    const store = transaction.objectStore(STORES.AUDIO_CACHE);

    return new Promise((resolve, reject) => {
      const request = store.get(word);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async clearAllData() {
    const stores = [STORES.WORDS, STORES.SESSIONS, STORES.AUDIO_CACHE];
    const promises = stores.map((storeName) => {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    });

    return Promise.all(promises);
  }

  async exportData() {
    const words = await this.getWords();
    const sessions = await this.getSessions(100);

    return {
      words,
      sessions,
      exportDate: new Date().toISOString(),
    };
  }

  async importData(data) {
    if (data.words && Array.isArray(data.words)) {
      for (const word of data.words) {
        await this.addWord({
          english: word.english,
          chinese: word.chinese,
          audioUrl: word.audioUrl,
          category: word.category || 'active',
        });
      }
    }
  }
}

const storage = new StorageManager();

export default storage;
