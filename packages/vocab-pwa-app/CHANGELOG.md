# Changelog

All notable changes to the Vocab PWA App will be documented in this file.

## [1.0.0] - Initial Release

### Added
- 🎯 Five learning modes:
  - Spelling Practice (type English from Chinese)
  - Chinese to English (multiple choice)
  - English to Chinese (multiple choice)
  - Audio to English (listen and choose)
  - Audio to Chinese (listen and choose)

- 📱 Progressive Web App features:
  - Installable on desktop and mobile
  - Offline support with Service Worker
  - Responsive mobile-first design
  - Touch-friendly interface (44px+ targets)

- 💾 Data Management:
  - IndexedDB for local storage
  - Import from TXT/CSV files
  - Manual word entry form
  - Export to CSV/JSON
  - Three word banks (Active, Familiar, Difficult)

- 🎵 Audio System:
  - Google TTS integration
  - Web Speech API fallback
  - Audio caching for offline use
  - Adjustable playback speed (0.5x - 2x)
  - Auto-play option

- ⌨️ Controls:
  - Desktop keyboard shortcuts (Ctrl+E, Ctrl+K, etc.)
  - Mobile touch gestures (swipe, double-tap)
  - Haptic feedback support
  - Voice input option (spelling mode)

- 📊 Progress Tracking:
  - Session statistics
  - Accuracy tracking per word
  - Review count and timestamps
  - Session history

- 🎨 User Experience:
  - Dark mode support
  - Font size adjustment
  - Theme customization
  - Toast notifications
  - Loading states and transitions
  - Animations and feedback

- 🌐 Responsive Design:
  - Works from 320px (iPhone SE) to 4K displays
  - Portrait and landscape modes
  - Bottom navigation (mobile)
  - Side menu (desktop)
  - Adaptive layout

### Technical Implementation
- Webpack 5 build system
- ES6 modules
- IndexedDB for data persistence
- Service Worker with Workbox
- CSS Grid and Flexbox layouts
- Mobile-first CSS
- No external UI frameworks (vanilla JS)

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 8+

### Performance
- First Contentful Paint < 2s on 3G
- Time to Interactive < 5s
- 60fps animations
- Optimized asset loading
- Code splitting ready

### Accessibility
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast support
- Scalable text (up to 200%)
- Touch targets minimum 44px

## [Future Enhancements]

### Planned Features
- [ ] Cloud sync (Firebase/Supabase)
- [ ] Spaced repetition algorithm (SM-2)
- [ ] Voice recording for pronunciation
- [ ] Image association for visual learning
- [ ] Gamification (achievements, streaks)
- [ ] Social features (share progress)
- [ ] Multi-language UI support (i18n)
- [ ] Export to Anki format
- [ ] Flashcard mode
- [ ] Custom audio upload
- [ ] Pronunciation comparison
- [ ] Word categories/tags
- [ ] Study reminders
- [ ] Collaborative word lists
