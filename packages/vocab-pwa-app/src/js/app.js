import '../css/main.css';
import storage from './storage.js';
import wordBank from './wordBank.js';
import audioPlayer from './audioPlayer.js';
import fileImporter from './fileImporter.js';
import exerciseEngine from './exerciseEngine.js';
import shortcutManager from './shortcutManager.js';

class App {
  constructor() {
    this.currentScreen = 'welcome';
    this.settings = this.loadSettings();
    this.currentExercise = null;
  }

  async init() {
    try {
      this.showLoading();
      
      await storage.init();
      await wordBank.init();
      
      this.applySettings();
      this.setupEventListeners();
      this.setupShortcuts();
      this.updateStats();
      this.registerServiceWorker();
      this.checkInstallPrompt();
      
      this.hideLoading();
      this.showScreen('welcome');
      
      this.showToast('Welcome to Vocab Learner!', 'success');
    } catch (error) {
      console.error('Initialization error:', error);
      this.hideLoading();
      this.showToast('Failed to initialize app', 'error');
    }
  }

  setupEventListeners() {
    document.querySelectorAll('.nav-btn, .side-nav-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const screen = e.currentTarget.dataset.screen;
        if (screen) this.showScreen(screen);
      });
    });

    document.querySelectorAll('.btn-back').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const backTo = e.currentTarget.dataset.backTo;
        this.showScreen(backTo || 'welcome');
      });
    });

    document.getElementById('import-btn')?.addEventListener('click', () => {
      this.showScreen('import');
    });

    document.getElementById('start-practice-btn')?.addEventListener('click', () => {
      this.startPractice();
    });

    const fileUploadArea = document.getElementById('file-upload-area');
    const fileInput = document.getElementById('file-input');

    fileUploadArea?.addEventListener('click', () => {
      fileInput?.click();
    });

    fileInput?.addEventListener('change', (e) => {
      this.handleFileImport(e.target.files);
    });

    fileUploadArea?.addEventListener('dragover', (e) => {
      e.preventDefault();
      fileUploadArea.classList.add('drag-over');
    });

    fileUploadArea?.addEventListener('dragleave', () => {
      fileUploadArea.classList.remove('drag-over');
    });

    fileUploadArea?.addEventListener('drop', (e) => {
      e.preventDefault();
      fileUploadArea.classList.remove('drag-over');
      this.handleFileImport(e.dataTransfer.files);
    });

    document.getElementById('manual-entry-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleManualEntry();
    });

    document.getElementById('confirm-import-btn')?.addEventListener('click', () => {
      this.confirmImport();
    });

    document.getElementById('cancel-import-btn')?.addEventListener('click', () => {
      this.cancelImport();
    });

    document.getElementById('mode-toggle-btn')?.addEventListener('click', () => {
      this.showModeModal();
    });

    document.getElementById('fab')?.addEventListener('click', () => {
      this.showModeModal();
    });

    const modeModal = document.getElementById('mode-modal');
    modeModal?.querySelector('.modal-close')?.addEventListener('click', () => {
      this.hideModal();
    });

    modeModal?.addEventListener('click', (e) => {
      if (e.target === modeModal) {
        this.hideModal();
      }
    });

    document.querySelectorAll('.mode-option').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const mode = e.currentTarget.dataset.mode;
        this.selectMode(mode);
      });
    });

    document.getElementById('menu-btn')?.addEventListener('click', () => {
      const sideMenu = document.getElementById('side-menu');
      sideMenu?.classList.toggle('active');
    });

    document.querySelectorAll('.tab-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const category = e.currentTarget.dataset.category;
        this.switchWordBankCategory(category);
      });
    });

    document.getElementById('word-search')?.addEventListener('input', (e) => {
      this.searchWords(e.target.value);
    });

    document.getElementById('export-btn')?.addEventListener('click', () => {
      this.exportCurrentCategory();
    });

    document.getElementById('export-all-btn')?.addEventListener('click', () => {
      this.exportAllData();
    });

    document.getElementById('clear-data-btn')?.addEventListener('click', () => {
      this.clearAllData();
    });

    document.getElementById('audio-speed')?.addEventListener('change', (e) => {
      this.updateSetting('audioSpeed', e.target.value);
      audioPlayer.setSpeed(e.target.value);
    });

    document.getElementById('auto-play-audio')?.addEventListener('change', (e) => {
      this.updateSetting('autoPlayAudio', e.target.checked);
    });

    document.getElementById('words-per-session')?.addEventListener('change', (e) => {
      this.updateSetting('wordsPerSession', e.target.value);
    });

    document.getElementById('shuffle-words')?.addEventListener('change', (e) => {
      this.updateSetting('shuffleWords', e.target.checked);
    });

    document.getElementById('theme')?.addEventListener('change', (e) => {
      this.updateSetting('theme', e.target.value);
      this.applyTheme(e.target.value);
    });

    document.getElementById('font-size')?.addEventListener('change', (e) => {
      this.updateSetting('fontSize', e.target.value);
      this.applyFontSize(e.target.value);
    });

    window.addEventListener('online', () => {
      this.showToast('Back online', 'success');
    });

    window.addEventListener('offline', () => {
      this.showToast('You are offline', 'warning');
    });
  }

  setupShortcuts() {
    shortcutManager.init();

    const handlers = {
      toggleEnglish: () => this.toggleVisibility('english'),
      toggleChinese: () => this.toggleVisibility('chinese'),
      markFamiliar: () => this.markCurrentWord('familiar'),
      markDifficult: () => this.markCurrentWord('difficult'),
      playAudio: () => this.playCurrentAudio(),
      nextWord: () => this.nextWord(),
      previousWord: () => this.previousWord(),
      switchMode: () => this.showModeModal(),
      submitAnswer: () => this.submitCurrentAnswer(),
      cancel: () => this.showScreen('welcome'),
      showDetails: () => {},
      hideDetails: () => {},
    };

    shortcutManager.registerDefaultShortcuts(handlers);
    shortcutManager.registerDefaultGestures(handlers);
  }

  async handleFileImport(files) {
    if (!files || files.length === 0) return;

    this.showLoading();

    try {
      const result = await fileImporter.parseFiles(Array.from(files));

      if (result.errors.length > 0) {
        console.warn('Import errors:', result.errors);
      }

      if (result.words.length === 0) {
        this.showToast('No valid words found in files', 'error');
        this.hideLoading();
        return;
      }

      this.showImportPreview(result.words, result.errors);
      this.hideLoading();
    } catch (error) {
      console.error('File import error:', error);
      this.showToast('Failed to import files', 'error');
      this.hideLoading();
    }
  }

  showImportPreview(words, errors) {
    const preview = document.getElementById('import-preview');
    const previewList = document.getElementById('preview-list');
    const importCount = document.getElementById('import-count');

    preview.style.display = 'block';
    importCount.textContent = words.length;

    previewList.innerHTML = words
      .slice(0, 10)
      .map((word) => {
        return `
          <div class="word-item">
            <div class="word-info">
              <div class="word-english">${word.english}</div>
              <div class="word-chinese">${word.chinese}</div>
            </div>
          </div>
        `;
      })
      .join('');

    if (words.length > 10) {
      previewList.innerHTML += `<p class="text-secondary">...and ${words.length - 10} more</p>`;
    }

    this.pendingImport = words;
  }

  async confirmImport() {
    if (!this.pendingImport) return;

    this.showLoading();

    try {
      await wordBank.addWords(this.pendingImport);
      this.updateStats();
      this.showToast(`Imported ${this.pendingImport.length} words successfully!`, 'success');
      this.pendingImport = null;
      this.showScreen('welcome');
    } catch (error) {
      console.error('Import error:', error);
      this.showToast('Failed to import words', 'error');
    }

    this.hideLoading();
  }

  cancelImport() {
    this.pendingImport = null;
    document.getElementById('import-preview').style.display = 'none';
    document.getElementById('file-input').value = '';
  }

  async handleManualEntry() {
    const english = document.getElementById('word-english').value.trim();
    const chinese = document.getElementById('word-chinese').value.trim();
    const audioUrl = document.getElementById('word-audio').value.trim();

    if (!english || !chinese) {
      this.showToast('Please fill in both English and Chinese fields', 'error');
      return;
    }

    try {
      await wordBank.addWords([{ english, chinese, audioUrl: audioUrl || null }]);
      this.updateStats();
      this.showToast('Word added successfully!', 'success');

      document.getElementById('manual-entry-form').reset();
    } catch (error) {
      console.error('Manual entry error:', error);
      this.showToast('Failed to add word', 'error');
    }
  }

  startPractice() {
    if (wordBank.getWordCount('active') === 0) {
      this.showToast('Please import some words first', 'warning');
      return;
    }

    this.showScreen('practice');
    this.initPracticeSession(this.settings.currentMode || 'spelling');
  }

  async initPracticeSession(mode) {
    try {
      const wordsPerSession = parseInt(this.settings.wordsPerSession) || 20;
      const result = exerciseEngine.init(mode, wordsPerSession);

      this.updateModeDisplay(mode);
      this.updateProgress();
      await this.renderExercise();

      audioPlayer.enableUserInteraction();
    } catch (error) {
      console.error('Practice init error:', error);
      this.showToast(error.message, 'error');
      this.showScreen('welcome');
    }
  }

  async renderExercise() {
    const exercise = await exerciseEngine.generateExercise();

    if (!exercise) {
      this.finishPracticeSession();
      return;
    }

    this.currentExercise = exercise;
    const content = document.getElementById('practice-content');

    if (exercise.type === 'input') {
      content.innerHTML = `
        <div class="practice-card">
          <div class="word-display">${exercise.display}</div>
          <button class="audio-btn" id="audio-play-btn">🔊</button>
          <input type="text" class="spelling-input" id="spelling-input" 
                 placeholder="Type the English word..." autocomplete="off" autocorrect="off">
          <div class="action-bar">
            <button class="btn btn-secondary" id="hint-btn">Hint</button>
            <button class="btn btn-primary" id="check-btn">Check</button>
          </div>
        </div>
      `;

      document.getElementById('audio-play-btn')?.addEventListener('click', () => {
        this.playCurrentAudio();
      });

      document.getElementById('spelling-input')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.checkSpelling();
        }
      });

      document.getElementById('hint-btn')?.addEventListener('click', () => {
        this.showHint();
      });

      document.getElementById('check-btn')?.addEventListener('click', () => {
        this.checkSpelling();
      });

      document.getElementById('spelling-input')?.focus();
    } else if (exercise.type === 'choice') {
      content.innerHTML = `
        <div class="practice-card">
          <div class="word-display">${exercise.display}</div>
          <button class="audio-btn" id="audio-play-btn">🔊</button>
          <div class="choice-options" id="choice-options">
            ${exercise.options
              .map(
                (option) => `
              <button class="choice-btn" data-id="${option.id}">
                ${option.text}
              </button>
            `
              )
              .join('')}
          </div>
        </div>
      `;

      document.getElementById('audio-play-btn')?.addEventListener('click', () => {
        this.playCurrentAudio();
      });

      document.querySelectorAll('.choice-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          this.checkChoice(e.currentTarget.dataset.id);
        });
      });

      if (exercise.autoPlayAudio && this.settings.autoPlayAudio) {
        setTimeout(() => this.playCurrentAudio(), 500);
      }
    }
  }

  async checkSpelling() {
    const input = document.getElementById('spelling-input');
    const answer = input.value.trim();

    if (!answer) {
      this.showToast('Please type an answer', 'warning');
      return;
    }

    const result = await exerciseEngine.checkAnswer(answer);

    input.classList.remove('correct', 'incorrect');

    if (result.correct) {
      input.classList.add('correct');
      shortcutManager.vibrateSuccess();
      this.showToast('Correct! ✓', 'success');

      setTimeout(() => {
        exerciseEngine.nextWord();
        this.updateProgress();
        this.renderExercise();
      }, 1000);
    } else {
      input.classList.add('incorrect');
      shortcutManager.vibrateError();
      this.showToast(`Incorrect. Answer: ${result.correctAnswer}`, 'error');
    }
  }

  async checkChoice(answerId) {
    const buttons = document.querySelectorAll('.choice-btn');
    buttons.forEach((btn) => (btn.disabled = true));

    const result = await exerciseEngine.checkAnswer(parseInt(answerId));
    const selectedBtn = document.querySelector(`[data-id="${answerId}"]`);

    if (result.correct) {
      selectedBtn.classList.add('correct');
      shortcutManager.vibrateSuccess();
      this.showToast('Correct! ✓', 'success');
    } else {
      selectedBtn.classList.add('incorrect');
      const correctBtn = document.querySelector(
        `[data-id="${this.currentExercise.word.id}"]`
      );
      correctBtn?.classList.add('correct');
      shortcutManager.vibrateError();
      this.showToast('Incorrect', 'error');
    }

    setTimeout(() => {
      exerciseEngine.nextWord();
      this.updateProgress();
      this.renderExercise();
    }, 1500);
  }

  showHint() {
    const input = document.getElementById('spelling-input');
    const correctAnswer = this.currentExercise.word.english;

    if (input && correctAnswer) {
      input.value = correctAnswer[0];
      input.focus();
      this.showToast('Showing first letter as hint', 'info');
    }
  }

  async playCurrentAudio() {
    try {
      await exerciseEngine.playCurrentAudio();
    } catch (error) {
      console.warn('Audio playback error:', error);
      if (error.name === 'NotAllowedError') {
        this.showToast('Please tap anywhere to enable audio', 'warning');
      }
    }
  }

  async markCurrentWord(category) {
    const word = exerciseEngine.getCurrentWord();
    if (word) {
      await wordBank.moveWord(word.id, word.category, category);
      this.showToast(`Moved to ${category} words`, 'success');
    }
  }

  nextWord() {
    exerciseEngine.nextWord();
    this.updateProgress();
    this.renderExercise();
  }

  previousWord() {
    exerciseEngine.previousWord();
    this.updateProgress();
    this.renderExercise();
  }

  submitCurrentAnswer() {
    if (this.currentExercise?.type === 'input') {
      this.checkSpelling();
    }
  }

  toggleVisibility(field) {
    console.log(`Toggle ${field} visibility`);
  }

  updateProgress() {
    const progress = exerciseEngine.getProgress();
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');

    if (progressFill && progressText) {
      progressFill.style.width = `${progress.percentage}%`;
      progressText.textContent = `${progress.current} / ${progress.total} (${progress.percentage}%)`;
    }
  }

  updateModeDisplay(mode) {
    const modeNames = {
      spelling: 'Spelling Practice',
      'cn-to-en': 'Chinese to English',
      'en-to-cn': 'English to Chinese',
      'audio-to-en': 'Audio to English',
      'audio-to-cn': 'Audio to Chinese',
    };

    const modeNameEl = document.getElementById('current-mode-name');
    if (modeNameEl) {
      modeNameEl.textContent = modeNames[mode] || mode;
    }
  }

  async finishPracticeSession() {
    const summary = await exerciseEngine.finishSession();

    const content = document.getElementById('practice-content');
    content.innerHTML = `
      <div class="practice-card">
        <h2>Session Complete! 🎉</h2>
        <div class="stat-card">
          <div class="stat-value">${summary.accuracy.toFixed(1)}%</div>
          <div class="stat-label">Accuracy</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${summary.correctCount}/${summary.totalWords}</div>
          <div class="stat-label">Correct Answers</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${summary.duration}</div>
          <div class="stat-label">Duration</div>
        </div>
        <div class="action-bar">
          <button class="btn btn-primary" id="practice-again-btn">Practice Again</button>
          <button class="btn btn-secondary" id="back-home-btn">Back to Home</button>
        </div>
      </div>
    `;

    document.getElementById('practice-again-btn')?.addEventListener('click', () => {
      this.startPractice();
    });

    document.getElementById('back-home-btn')?.addEventListener('click', () => {
      this.showScreen('welcome');
    });
  }

  showModeModal() {
    const modal = document.getElementById('mode-modal');
    modal?.classList.add('active');
  }

  hideModal() {
    document.getElementById('mode-modal')?.classList.remove('active');
  }

  selectMode(mode) {
    this.settings.currentMode = mode;
    this.saveSettings();
    this.hideModal();

    if (this.currentScreen === 'practice') {
      this.initPracticeSession(mode);
    }
  }

  switchWordBankCategory(category) {
    document.querySelectorAll('.tab-btn').forEach((btn) => {
      btn.classList.remove('active');
    });

    document
      .querySelector(`[data-category="${category}"]`)
      ?.classList.add('active');

    this.displayWordList(category);
  }

  displayWordList(category) {
    const words = wordBank.getWords(category);
    const listEl = document.getElementById('wordbank-list');

    if (!listEl) return;

    if (words.length === 0) {
      listEl.innerHTML = '<p class="text-center text-secondary">No words in this category</p>';
      return;
    }

    listEl.innerHTML = words
      .map(
        (word) => `
        <div class="word-item">
          <div class="word-info">
            <div class="word-english">${word.english}</div>
            <div class="word-chinese">${word.chinese}</div>
          </div>
          <div class="word-actions">
            <button class="icon-btn" onclick="app.playWordAudio('${word.english}', '${word.audioUrl || ''}')">🔊</button>
            <button class="icon-btn" onclick="app.deleteWordById(${word.id})">🗑️</button>
          </div>
        </div>
      `
      )
      .join('');
  }

  async playWordAudio(english, audioUrl) {
    try {
      await audioPlayer.play(english, audioUrl || null);
    } catch (error) {
      console.error('Audio error:', error);
    }
  }

  async deleteWordById(id) {
    if (confirm('Are you sure you want to delete this word?')) {
      await wordBank.deleteWord(id);
      this.updateStats();
      this.switchWordBankCategory('active');
      this.showToast('Word deleted', 'success');
    }
  }

  searchWords(query) {
    const category = document.querySelector('.tab-btn.active')?.dataset.category;
    const words = query ? wordBank.searchWords(query, category) : wordBank.getWords(category);
    
    const listEl = document.getElementById('wordbank-list');
    if (!listEl) return;

    if (words.length === 0) {
      listEl.innerHTML = '<p class="text-center text-secondary">No words found</p>';
      return;
    }

    listEl.innerHTML = words
      .map(
        (word) => `
        <div class="word-item">
          <div class="word-info">
            <div class="word-english">${word.english}</div>
            <div class="word-chinese">${word.chinese}</div>
          </div>
          <div class="word-actions">
            <button class="icon-btn" onclick="app.playWordAudio('${word.english}', '${word.audioUrl || ''}')">🔊</button>
            <button class="icon-btn" onclick="app.deleteWordById(${word.id})">🗑️</button>
          </div>
        </div>
      `
      )
      .join('');
  }

  async exportCurrentCategory() {
    const category = document.querySelector('.tab-btn.active')?.dataset.category;
    const words = await wordBank.exportWords(category);

    if (words.length === 0) {
      this.showToast('No words to export', 'warning');
      return;
    }

    const csv = fileImporter.exportToCSV(words);
    const filename = `vocab-${category}-${new Date().toISOString().split('T')[0]}.csv`;
    fileImporter.downloadFile(csv, filename, 'text/csv');
    this.showToast('Exported successfully', 'success');
  }

  async exportAllData() {
    const data = await storage.exportData();
    const json = fileImporter.exportToJSON(data);
    const filename = `vocab-backup-${new Date().toISOString().split('T')[0]}.json`;
    fileImporter.downloadFile(json, filename, 'application/json');
    this.showToast('Backup created successfully', 'success');
  }

  async clearAllData() {
    if (confirm('Are you sure? This will delete all your words and progress!')) {
      await storage.clearAllData();
      await wordBank.loadWords();
      this.updateStats();
      this.showToast('All data cleared', 'success');
      this.showScreen('welcome');
    }
  }

  updateStats() {
    const stats = wordBank.getOverallStats();

    document.getElementById('stat-active').textContent = stats.active.count;
    document.getElementById('stat-familiar').textContent = stats.familiar.count;
    document.getElementById('stat-difficult').textContent = stats.difficult.count;

    document.getElementById('tab-count-active').textContent = stats.active.count;
    document.getElementById('tab-count-familiar').textContent = stats.familiar.count;
    document.getElementById('tab-count-difficult').textContent = stats.difficult.count;

    const startBtn = document.getElementById('start-practice-btn');
    if (startBtn) {
      startBtn.disabled = stats.active.count === 0;
    }
  }

  showScreen(screenName) {
    this.currentScreen = screenName;

    document.querySelectorAll('.screen').forEach((screen) => {
      screen.classList.remove('active');
    });

    const targetScreen = document.getElementById(`${screenName}-screen`);
    if (targetScreen) {
      targetScreen.classList.add('active');

      if (screenName === 'wordbank') {
        this.switchWordBankCategory('active');
      }
    }
  }

  showLoading() {
    document.getElementById('loading').style.display = 'flex';
  }

  hideLoading() {
    document.getElementById('loading').style.display = 'none';
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  loadSettings() {
    const defaults = {
      audioSpeed: 1,
      autoPlayAudio: true,
      wordsPerSession: 20,
      shuffleWords: true,
      theme: 'auto',
      fontSize: 'medium',
      currentMode: 'spelling',
    };

    const saved = localStorage.getItem('vocabSettings');
    return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
  }

  saveSettings() {
    localStorage.setItem('vocabSettings', JSON.stringify(this.settings));
  }

  updateSetting(key, value) {
    this.settings[key] = value;
    this.saveSettings();
  }

  applySettings() {
    this.applyTheme(this.settings.theme);
    this.applyFontSize(this.settings.fontSize);
    audioPlayer.setSpeed(this.settings.audioSpeed);

    document.getElementById('audio-speed').value = this.settings.audioSpeed;
    document.getElementById('auto-play-audio').checked = this.settings.autoPlayAudio;
    document.getElementById('words-per-session').value = this.settings.wordsPerSession;
    document.getElementById('shuffle-words').checked = this.settings.shuffleWords;
    document.getElementById('theme').value = this.settings.theme;
    document.getElementById('font-size').value = this.settings.fontSize;
  }

  applyTheme(theme) {
    if (theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }

  applyFontSize(size) {
    document.documentElement.setAttribute('data-font-size', size);
  }

  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/service-worker.js');
        console.log('Service Worker registered:', registration);
      } catch (error) {
        console.log('Service Worker registration failed:', error);
      }
    }
  }

  checkInstallPrompt() {
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;

      const installBtn = document.createElement('button');
      installBtn.className = 'btn btn-secondary';
      installBtn.textContent = '📲 Install App';
      installBtn.onclick = async () => {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User choice: ${outcome}`);
        deferredPrompt = null;
        installBtn.remove();
      };

      document.querySelector('.welcome-actions')?.appendChild(installBtn);
    });
  }
}

const app = new App();
window.app = app;

document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
