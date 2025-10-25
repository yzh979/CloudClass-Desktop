# 🚀 Quick Start Guide

Get up and running with Vocab PWA App in 5 minutes!

## Step 1: Install Dependencies (2 min)

```bash
cd packages/vocab-pwa-app
yarn install
```

If you encounter errors, see [Troubleshooting](#troubleshooting) below.

## Step 2: Start Development Server (30 sec)

```bash
yarn dev
```

The app opens automatically at http://localhost:3000

## Step 3: Import Sample Words (30 sec)

1. Click **"Import Words"** button
2. Click the file upload area
3. Select `public/sample-words.csv` (30 words included)
4. Click **"Import X Words"**

✅ You now have vocabulary to practice with!

## Step 4: Start Practicing! (3 min)

1. Click **"Start Practice"**
2. Try the default **Spelling Practice** mode
3. Type the English word for each Chinese meaning
4. Press Enter to check your answer

### Try Other Modes

Click the **"Change Mode"** button to try:
- 🇨🇳→🇬🇧 Chinese to English (multiple choice)
- 🇬🇧→🇨🇳 English to Chinese (multiple choice)
- 🔊→🇬🇧 Listen and choose English
- 🔊→🇨🇳 Listen and choose Chinese

## Step 5: Explore Features

### 📚 Word Banks
- Click **"Words"** in bottom navigation
- Switch between Active/Familiar/Difficult tabs
- Search, play audio, delete words

### ⚙️ Settings
- Click **"Settings"** in bottom navigation
- Adjust audio speed
- Change theme (light/dark)
- Set words per session

### 📤 Export Your Progress
- Go to Settings
- Click **"Export All Data"**
- Save JSON backup file

## Keyboard Shortcuts (Desktop)

| Shortcut | Action |
|----------|--------|
| `Ctrl + Space` | Play audio |
| `Ctrl + N` | Next word |
| `Ctrl + P` | Previous word |
| `Ctrl + M` | Change mode |
| `Enter` | Submit answer |

## Touch Gestures (Mobile)

| Gesture | Action |
|---------|--------|
| Swipe Right | Next word |
| Swipe Left | Previous word |
| Double Tap | Replay audio |

## Building for Production

```bash
yarn build
```

Output is in `dist/` folder. Deploy to any static host with HTTPS.

## Installing as PWA

### On Desktop (Chrome/Edge)
1. Look for install icon in address bar (⊕)
2. Click to install
3. App opens in standalone window

### On Mobile (iOS/Android)
1. Open in browser
2. Tap menu (⋮ or share icon)
3. Select "Add to Home Screen"
4. Icon appears on home screen

## What's Next?

- 📖 Read [README.md](README.md) for full documentation
- 🔧 See [SETUP.md](SETUP.md) for detailed setup
- 🚀 Check [DEPLOYMENT.md](DEPLOYMENT.md) to deploy
- 📊 Review [PROJECT-SUMMARY.md](PROJECT-SUMMARY.md) for features

## Troubleshooting

### Dependencies Won't Install

**Problem**: `yarn install` fails with network errors

**Solutions**:
```bash
# Try different registry
yarn config set registry https://registry.npmjs.org
yarn config set strict-ssl false
yarn install

# Or use npm
npm install

# Or clear cache
yarn cache clean
rm -rf node_modules yarn.lock
yarn install
```

### App Won't Start

**Problem**: `yarn dev` fails

**Solution**:
```bash
# Ensure dependencies installed
ls node_modules/webpack

# If empty, reinstall
yarn install

# Try alternative dev server
npx webpack serve
```

### Audio Not Playing

**Problem**: No sound in exercises

**Solutions**:
- Click anywhere on page first (browser security)
- Check browser doesn't block audio
- Try different browser
- Check volume settings

### Can't Import Files

**Problem**: File picker doesn't open

**Solutions**:
- Use drag-and-drop instead
- Try manual entry (bottom of import screen)
- Check file format (.txt or .csv)
- Verify file is not corrupted

### Icons Not Showing

**Problem**: Default icons displaying

**Solution**:
```bash
# Generate proper icons
# Option 1: Use HTML tool
open public/icons/generate-icons.html

# Option 2: Use CLI
npx @capacitor/assets generate

# Option 3: Online tool
# Visit realfavicongenerator.net
```

## Common Questions

**Q: Do I need a server?**  
A: No! It's a PWA that runs entirely in the browser. Data is stored locally.

**Q: Can I use this offline?**  
A: Yes! After first visit, Service Worker caches everything for offline use.

**Q: Where is my data stored?**  
A: In your browser's IndexedDB. It stays on your device.

**Q: How do I backup my words?**  
A: Go to Settings → Export All Data → Save JSON file

**Q: Can I share my word lists?**  
A: Yes! Export to CSV from Word Banks screen, then share the file.

**Q: Does it work on iPad?**  
A: Yes! Fully responsive and works on all devices 320px+.

**Q: Why Google TTS?**  
A: Free, no API key needed, works well. Falls back to Web Speech API if blocked.

## Performance Tips

1. **Slow on mobile?**
   - Enable "Reduce data usage" in settings
   - Close other apps
   - Clear browser cache

2. **Audio laggy?**
   - Lower audio speed
   - Let audio preload (wait 1-2 seconds)
   - Cache builds up over time

3. **Large word list?**
   - Reduce "Words per session" in settings
   - Split into multiple lists
   - Use search/filter in word banks

## Video Tutorial (Coming Soon)

Check project repository for video walkthrough:
1. Installation
2. Importing words
3. Using all 5 modes
4. Managing word banks
5. Installing as PWA

## Need More Help?

- 📖 Full docs: [README.md](README.md)
- 🐛 Report issues: GitHub Issues
- 💬 Questions: GitHub Discussions
- 📧 Email: (add your email)

---

**Time to First Practice**: < 5 minutes  
**Difficulty**: Beginner-friendly  
**Cost**: Free & Open Source

---

Enjoy learning! 🎓✨
