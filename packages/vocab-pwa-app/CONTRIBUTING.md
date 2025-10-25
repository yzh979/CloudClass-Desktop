# Contributing to Vocab PWA App

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/CloudClass-Desktop.git
   cd CloudClass-Desktop/packages/vocab-pwa-app
   ```
3. **Install dependencies**
   ```bash
   yarn install
   ```
4. **Create a feature branch**
   ```bash
   git checkout -b feat/your-feature-name
   ```

## Development Workflow

### Running the App

```bash
# Development server with hot reload
yarn dev

# Build for production
yarn build

# Serve production build
npx serve dist
```

### Code Style

- **JavaScript**: ES6+ modules, no semicolons (optional)
- **CSS**: Mobile-first approach, use CSS custom properties
- **HTML**: Semantic markup, accessible ARIA labels
- **Comments**: Add comments for complex logic only

### File Organization

- `src/js/` - JavaScript modules (one class/functionality per file)
- `src/css/` - Stylesheets (main.css, mobile.css, desktop.css if needed)
- `src/components/` - Reusable UI components (future)
- `public/` - Static assets (HTML, manifest, icons, samples)

### Naming Conventions

- **Files**: kebab-case (`audio-player.js`, `file-importer.js`)
- **Classes**: PascalCase (`AudioPlayer`, `FileImporter`)
- **Functions**: camelCase (`playAudio`, `importFile`)
- **Constants**: UPPER_SNAKE_CASE (`DB_NAME`, `MAX_WORDS`)
- **CSS classes**: kebab-case (`.practice-card`, `.word-item`)

## Types of Contributions

### 🐛 Bug Reports

When reporting bugs, include:
- Browser and version
- Device (mobile/desktop)
- Steps to reproduce
- Expected vs actual behavior
- Console errors (if any)
- Screenshots (if applicable)

### ✨ Feature Requests

For new features, provide:
- Clear description of the feature
- Use case / motivation
- Expected behavior
- Mockups (if UI-related)

### 🔧 Pull Requests

1. **Write clear commit messages**
   ```
   feat: add voice input for spelling mode
   fix: audio not playing on iOS Safari
   docs: update setup instructions
   style: improve mobile responsiveness
   ```

2. **Test thoroughly**
   - Test on multiple browsers
   - Test on mobile and desktop
   - Check responsive design
   - Verify offline functionality
   - Run Lighthouse audit

3. **Update documentation**
   - Update README.md if needed
   - Add inline comments for complex code
   - Update CHANGELOG.md

4. **Keep PRs focused**
   - One feature/fix per PR
   - Small, reviewable changes
   - Reference related issues

## Testing Guidelines

### Manual Testing

- [ ] All 5 learning modes work
- [ ] File import (TXT and CSV)
- [ ] Audio playback
- [ ] Word bank management
- [ ] Settings persistence
- [ ] Offline functionality
- [ ] Install as PWA
- [ ] Responsive on all screen sizes
- [ ] Keyboard shortcuts (desktop)
- [ ] Touch gestures (mobile)

### Browser Testing

Test on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (desktop)
- Mobile Safari (iOS)
- Chrome (Android)

### Performance Testing

Run Lighthouse audit:
```bash
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

Target scores:
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90
- PWA: > 90

## Code Review Process

1. **Automated checks**: Ensure no console errors
2. **Code quality**: Follow style guidelines
3. **Testing**: Verify functionality works
4. **Performance**: Check for regressions
5. **Documentation**: Ensure docs are updated

## Areas Needing Help

### High Priority
- [ ] Real PNG icon generation
- [ ] Comprehensive unit tests
- [ ] E2E testing with Playwright/Cypress
- [ ] Improved error handling
- [ ] Better loading states

### Medium Priority
- [ ] Spaced repetition algorithm
- [ ] Voice recording feature
- [ ] Image association
- [ ] Cloud sync integration
- [ ] Gamification features

### Low Priority
- [ ] UI theme customization
- [ ] Multiple language support (i18n)
- [ ] Social sharing
- [ ] Export to Anki
- [ ] Analytics integration

## Questions?

- Check [README.md](README.md) for basic info
- Check [SETUP.md](SETUP.md) for setup instructions
- Open a GitHub issue for questions
- Review existing issues before creating new ones

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing! 🎉
