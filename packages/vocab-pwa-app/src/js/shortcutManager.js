class ShortcutManager {
  constructor() {
    this.shortcuts = new Map();
    this.enabled = true;
    this.gestureHandlers = new Map();
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.minSwipeDistance = 50;
  }

  init() {
    this.setupKeyboardShortcuts();
    this.setupGestureHandlers();
  }

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (!this.enabled) return;

      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      const key = this.getKeyCombo(e);
      const handler = this.shortcuts.get(key);

      if (handler) {
        e.preventDefault();
        handler(e);
      }
    });
  }

  setupGestureHandlers() {
    document.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
      this.touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.touchEndY = e.changedTouches[0].screenY;
      this.handleGesture();
    });

    let doubleTapTimer = null;
    let lastTap = 0;

    document.addEventListener('touchend', (e) => {
      const currentTime = Date.now();
      const tapLength = currentTime - lastTap;

      if (tapLength < 300 && tapLength > 0) {
        const handler = this.gestureHandlers.get('doubletap');
        if (handler) {
          e.preventDefault();
          handler(e);
        }
      }

      lastTap = currentTime;
    });
  }

  handleGesture() {
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;

    if (Math.abs(deltaX) < this.minSwipeDistance && 
        Math.abs(deltaY) < this.minSwipeDistance) {
      return;
    }

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        const handler = this.gestureHandlers.get('swiperight');
        if (handler) handler();
      } else {
        const handler = this.gestureHandlers.get('swipeleft');
        if (handler) handler();
      }
    } else {
      if (deltaY > 0) {
        const handler = this.gestureHandlers.get('swipedown');
        if (handler) handler();
      } else {
        const handler = this.gestureHandlers.get('swipeup');
        if (handler) handler();
      }
    }
  }

  getKeyCombo(event) {
    const keys = [];
    if (event.ctrlKey || event.metaKey) keys.push('ctrl');
    if (event.altKey) keys.push('alt');
    if (event.shiftKey) keys.push('shift');
    keys.push(event.key.toLowerCase());
    return keys.join('+');
  }

  register(keyCombo, handler, description = '') {
    this.shortcuts.set(keyCombo, handler);
  }

  registerGesture(gesture, handler) {
    this.gestureHandlers.set(gesture, handler);
  }

  unregister(keyCombo) {
    this.shortcuts.delete(keyCombo);
  }

  unregisterGesture(gesture) {
    this.gestureHandlers.delete(gesture);
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }

  registerDefaultShortcuts(handlers) {
    this.register('ctrl+e', handlers.toggleEnglish, 'Toggle English visibility');
    this.register('ctrl+k', handlers.toggleChinese, 'Toggle Chinese visibility');
    this.register('ctrl+y', handlers.markFamiliar, 'Mark as familiar');
    this.register('ctrl+i', handlers.markDifficult, 'Mark as difficult');
    this.register('ctrl+ ', handlers.playAudio, 'Play/Replay audio');
    this.register('ctrl+n', handlers.nextWord, 'Next word');
    this.register('ctrl+p', handlers.previousWord, 'Previous word');
    this.register('ctrl+m', handlers.switchMode, 'Switch mode');
    this.register('enter', handlers.submitAnswer, 'Submit answer');
    this.register('escape', handlers.cancel, 'Cancel/Go back');
  }

  registerDefaultGestures(handlers) {
    this.registerGesture('swiperight', handlers.nextWord);
    this.registerGesture('swipeleft', handlers.previousWord);
    this.registerGesture('doubletap', handlers.playAudio);
    this.registerGesture('swipeup', handlers.showDetails);
    this.registerGesture('swipedown', handlers.hideDetails);
  }

  clearAll() {
    this.shortcuts.clear();
    this.gestureHandlers.clear();
  }

  getRegisteredShortcuts() {
    return Array.from(this.shortcuts.entries()).map(([key, handler]) => ({
      key,
      description: handler.description || '',
    }));
  }

  vibrate(pattern = [50]) {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }

  vibrateSuccess() {
    this.vibrate([50, 30, 50]);
  }

  vibrateError() {
    this.vibrate([100]);
  }
}

const shortcutManager = new ShortcutManager();

export default shortcutManager;
