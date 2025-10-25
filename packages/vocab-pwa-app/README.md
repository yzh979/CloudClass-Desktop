# 📚 Vocabulary Learning PWA

A complete, production-ready Progressive Web Application for multi-sensory vocabulary learning. Features 5 learning modes, offline support, responsive design, and works on all devices from mobile to desktop.

> 🎯 **Status**: 100% Complete | ✅ Production Ready | 📱 PWA Enabled | 🌐 Fully Responsive

## Features

### PWA Capabilities
- 📱 Installable on mobile and desktop
- 🔄 Offline support via Service Worker
- 💾 Local data storage with IndexedDB
- 🎨 Responsive design (mobile-first)
- ⚡ Fast loading and performance

### Learning Modes
1. **Spelling Practice** - Type the English word from Chinese meaning
2. **Chinese to English** - Multiple choice from Chinese to English
3. **English to Chinese** - Multiple choice from English to Chinese
4. **Audio to English** - Listen and choose English word
5. **Audio to Chinese** - Listen and choose Chinese meaning

### Core Features
- 📁 Import vocabulary from TXT/CSV files
- 🎵 Text-to-Speech audio playback (Google TTS + Web Speech API)
- 📚 Three word banks: Active, Familiar, Difficult
- ⌨️ Keyboard shortcuts (desktop)
- 👆 Touch gestures (mobile)
- 📊 Progress tracking and statistics
- 🌙 Dark mode support
- 💾 Export/Import data

## 🚀 Quick Start

```bash
# Navigate to package
cd packages/vocab-pwa-app

# Install dependencies
yarn install

# Start development server (opens at http://localhost:3000)
yarn dev

# Build for production
yarn build
```

**📖 New to the project?** Read [QUICKSTART.md](QUICKSTART.md) for a 5-minute tutorial!

## 📁 Project Files

| Document | Purpose |
|----------|---------|
| **[QUICKSTART.md](QUICKSTART.md)** | 5-minute getting started guide |
| **[SETUP.md](SETUP.md)** | Detailed setup & configuration |
| **[DEPLOYMENT.md](DEPLOYMENT.md)** | Deploy to Vercel, Netlify, etc. |
| **[PROJECT-SUMMARY.md](PROJECT-SUMMARY.md)** | Complete feature overview |
| **[CONTRIBUTING.md](CONTRIBUTING.md)** | How to contribute |
| **[STATUS.md](STATUS.md)** | Current project status |
| **[CHANGELOG.md](CHANGELOG.md)** | Version history |

### Development

The app will be available at http://localhost:3000

### File Import Format

**CSV Format:**
```csv
apple,苹果,/audio/apple.mp3
banana,香蕉
orange,橙子
```

**TXT Format (tab-separated):**
```
apple    苹果
banana    香蕉
orange    橙子
```

## Keyboard Shortcuts

- **Ctrl + E** - Toggle English visibility
- **Ctrl + K** - Toggle Chinese visibility
- **Ctrl + Y** - Mark as familiar
- **Ctrl + I** - Mark as difficult
- **Ctrl + Space** - Play/Replay audio
- **Ctrl + N** - Next word
- **Ctrl + P** - Previous word
- **Ctrl + M** - Switch mode
- **Enter** - Submit answer
- **Escape** - Cancel/Go back

## Touch Gestures

- **Swipe Right** - Next word
- **Swipe Left** - Previous word
- **Double Tap** - Replay audio
- **Long Press** - Show definition

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- iOS Safari 14+
- Android Chrome 8+

## Data Storage

All data is stored locally using:
- **IndexedDB** - Word banks, audio cache, progress
- **LocalStorage** - Settings and preferences
- **Cache API** - Static assets (via Service Worker)

## License

MIT
