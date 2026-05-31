# Bann Gya Project - Code Structure Documentation

## 📁 Project Organization

```
bann-gya-project/
├── index.html          # Main HTML file with semantic structure
├── styles.css          # Complete CSS with glassmorphism, animations, responsive design
├── script.js           # ES6 JavaScript with particle system, dialogue logic, confetti
├── .gitignore          # Git ignore rules
├── CODE_STRUCTURE.md   # This documentation file
├── README.md           # Project overview
└── assets/
    ├── sounds/         # Optional audio files (click, confetti, shake)
    ├── images/         # Optional images for dialogues
    └── favicon/        # Favicon files (embedded SVG in HTML)
```

## 🎨 HTML Structure (`index.html`)

### Key Components:
- **Meta Tags**: Responsive viewport, theme color, description
- **Google Fonts**: Montserrat and Poppins imported with fallbacks
- **Favicon**: Embedded as SVG emoji (😎)
- **Background Containers**:
  - `#particles-container`: DOM-based particle system
  - `#emojis-container`: Floating emojis (❤️ 😎 🎯 ✨ 🥳)
  - `#chess-pieces`: Subtle background chess piece decorations
- **UI Elements**:
  - `.sound-toggle`: Fixed position sound button (🔊/🔇)
  - `.card-container`: Glassmorphic main content area
  - `#question`: Dynamic text display with aria-live for accessibility
  - `.button-container`: YES/NO buttons
  - `#progress-indicator`: Tracks NO clicks with color progression
  - `#success-modal`: Success message modal with dialog role
  - `<footer>`: Attribution with built-in hover effect

## 🎯 CSS Architecture (`styles.css`)

### CSS Variables (30+)
Located in `:root` pseudo-class:
- **Colors**: Gradients, glass backgrounds, button colors
- **Sizes**: Card padding (responsive), font sizes, button dimensions
- **Animations**: Durations, easing functions

### Key Features:
1. **Glassmorphism Design**:
   - `backdrop-filter: blur(10px)`
   - `background: rgba(255, 255, 255, 0.1)` with 0.2 alpha border
   - Box shadow with 0.3 opacity

2. **Animations**:
   - `gradientShift`: Background gradient animation (15s loop)
   - `particleFloat`: Particle rise animation (12s)
   - `emojiFloat`: Emoji float up with rotation (8s)
   - `shake`: Button shake effect (0.4s)
   - `buttonGlow`: Glow effect on hover
   - `confettiBurst`: Confetti particle burst
   - `cardEntrance`: Slide-in entrance effect

3. **Responsive Design**:
   - Mobile: `<640px` (compact layout)
   - Tablet: `640px-1024px` (medium layout)
   - Desktop: `>1024px` (full-featured layout)

4. **Accessibility**:
   - Focus-visible outline for keyboard navigation
   - Prefers-reduced-motion support
   - High contrast mode support

## ⚙️ JavaScript Logic (`script.js`)

### Architecture:
- **ES6 Modules**: Uses classes and modern syntax
- **Object-Oriented**: ParticleSystem, FloatingEmojiManager, Confetti classes
- **Event-Driven**: Listeners for clicks, resize, load events

### Key Objects:

#### `CONFIG`
Configuration constants for all animations and interactions:
```javascript
particles.count: 20-50 (responsive)
emojis.list: Array of emoji strings
noButton thresholds: Click counts for various effects
```

#### `state`
Global state management:
```javascript
currentQuestion: Current dialogue index (0-22)
noClickCount: Tracks NO button clicks
soundEnabled: Boolean, persisted in localStorage
gameActive: Boolean, prevents double-clicks
isTyping: Boolean, typing animation status
```

#### `DIALOGUES`
Array of 23 dialogue objects with:
- `text`: Hindi/English dialogue string
- `action`: Optional function to execute (color changes, button effects)

### Classes:

#### `Particle`
- Represents individual particle in the particle system
- Random properties: size, opacity, position, velocity
- Rendered as div with CSS animation
- Removed after animation completes

#### `ParticleSystem`
- Manages 20-50 particles
- `init()`: Create initial particles
- `addParticle()`: Add new particle dynamically
- `destroy()`: Remove all particles
- `toggle()`: Enable/disable particle system

#### `FloatingEmoji`
- Single floating emoji element
- Random position and animation timing
- Auto-destroys after animation

#### `FloatingEmojiManager`
- Manages emoji generation with intervals
- `init()`: Start emoji spawning
- `stop()`: Stop emoji generation
- `start()`: Resume emoji generation

#### `Confetti`
- Burst confetti on YES click
- 50+ particles with rainbow colors
- Physics: Gravity, rotation, fade-out
- Timing: 2-3 second duration per burst

### Key Functions:

#### `handleNoClick()`
- Increments click counter
- Shows progress indicator
- Triggers button challenge effects
- Updates dialogue

#### `handleNoButtonChallenge()`
- Shake animation on every click
- Random movement after 5+ clicks
- Color rotation after 8+ clicks
- Dynamic color changes every 2 clicks

#### `handleYesClick()`
- Disables further interaction
- Launches confetti burst (50 particles)
- Shows success modal
- Redirects to WhatsApp after 3 seconds

#### `typeText(text, element, speed)`
- Async text reveal animation
- Character-by-character typing
- Handles HTML content safely

#### `playSound(soundName)`
- Checks if sound is enabled
- Plays audio from SOUNDS object
- Silent fail if sound unavailable

#### `toggleSound()`
- Toggle sound enabled/disabled
- Save preference to localStorage
- Update sound button display (🔊/🔇)

## 🎮 Interaction Flow

### Initial Load:
1. Page renders with entrance animation
2. Particle system initializes (20-50 particles)
3. Floating emoji system starts
4. Chess pieces begin subtle rotation
5. First dialogue types out
6. Sound preference restored from localStorage

### NO Button Flow:
1. Click triggers `handleNoClick()`
2. Click counter increments
3. Progress indicator appears/updates (color: green → yellow → orange → red)
4. Dialogue changes with typing animation
5. Button shake effect plays
6. If click >= 5: Button repositions randomly
7. If click >= 8: Button color changes
8. Optional action function executes (e.g., style changes)

### YES Button Flow:
1. Click triggers `handleYesClick()`
2. Game state set to inactive (prevents double-clicks)
3. Sound effect plays (if enabled)
4. Confetti burst animates (multiple waves)
5. Success modal displays with fade-in
6. Modal shows celebration message
7. After 3 seconds: Redirect to WhatsApp

### Sound System:
1. Sound toggle button shows current state (🔊 or 🔇)
2. Click toggles `state.soundEnabled`
3. Preference saved to localStorage with key "soundEnabled"
4. All sound calls check enabled status before playing
5. Graceful fallback if audio API unavailable

## 🎨 Visual Effects Summary

| Effect | Trigger | Duration | Details |
|--------|---------|----------|---------|
| Particle Float | Load | 12s | DOM elements float upward with fade |
| Emoji Float | Every 3s | 8s | Random emojis spawn and float up |
| Gradient Shift | Always | 15s | Background gradient color animation |
| Chess Rotate | Load | 20-24s | Subtle background piece rotation |
| Card Entrance | Load | 0.6s | Slide up from bottom with ease |
| Button Glow | Hover | Continuous | Box shadow glow effect |
| Shake | NO click | 0.4s | Horizontal shake with rotation |
| Button Move | Click 5+ | Instant | Random translate transform |
| Color Change | Click 8+ | Instant | Gradient background change |
| Confetti Burst | YES click | 2-3s | Multiple colored particles burst |
| Modal Bounce | YES click | 0.5s | Bounce in animation |
| Text Typing | Change | ~30ms/char | Character reveal animation |

## 🔧 Configuration & Customization

### Change Colors:
Edit CSS variables in `:root`:
```css
--btn-yes-gradient: linear-gradient(135deg, #00d4ff 0%, #0099ff 100%);
--btn-no-gradient: linear-gradient(135deg, #ff6b6b 0%, #ff4757 100%);
```

### Adjust Animations:
```css
--particle-duration: 12s;      /* Slower = 15s, Faster = 8s */
--entrance-duration: 0.6s;     /* Card entrance speed */
--transition-smooth: 0.3s;     /* Button transitions */
```

### Modify Particles:
In `script.js` CONFIG:
```javascript
particles.count: 50,  // Increase for more particles
particles.duration: 12000,  // milliseconds
```

### Customize Dialogues:
Edit `DIALOGUES` array in `script.js`:
```javascript
{
  text: "Your custom text here 😎",
  action: () => { /* optional code */ }
}
```

## ♿ Accessibility Features

- **ARIA Labels**: All buttons have aria-label and aria-labelledby
- **Live Region**: `#question` has `aria-live="polite"` for screen readers
- **Semantic HTML**: Proper use of `<main>`, `<footer>`, `<dialog>`
- **Keyboard Navigation**: Tab through buttons, Enter to activate
- **Color Contrast**: Text meets WCAG AA standards
- **Reduced Motion**: Respects `prefers-reduced-motion` media query
- **Focus Visible**: Custom outline for keyboard navigation

## 📱 Responsive Breakpoints

| Breakpoint | Width | Adjustments |
|------------|-------|-------------|
| Mobile | <640px | 20px padding, 20 particles, smaller fonts |
| Tablet | 640-1024px | 35px padding, 30 particles, medium fonts |
| Desktop | >1024px | 50px padding, 50 particles, large fonts |

## 🚀 Performance Optimization

- **CSS Transforms**: Uses `transform` instead of position for animations
- **Will-change**: Applied to frequently animated elements
- **RequestAnimationFrame**: Particle system uses RAF for smooth 60fps
- **Lazy Loading**: Sounds loaded on-demand
- **Particle Reduction**: Mobile devices get fewer particles
- **Hardware Acceleration**: GPU-backed animations
- **CSS Variables**: Reduce CSS file size with variable reuse

## 🔒 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (full support)
- **Mobile**: iOS Safari, Android Chrome (full responsive support)
- **Fallbacks**: System fonts if Google Fonts fail to load
- **Graceful Degradation**: Audio/confetti degrade without breaking functionality

## 📊 File Sizes

- `index.html`: ~2.5 KB
- `styles.css`: ~15 KB
- `script.js`: ~18 KB
- **Total**: ~35.5 KB (uncompressed)
- **Gzipped**: ~8-10 KB (estimated)

## 🛠️ Development Workflow

### To Run Locally:
1. Open `index.html` in any modern browser
2. No build process needed - pure HTML/CSS/JS
3. Modify CSS for styling changes
4. Modify `DIALOGUES` array for content changes
5. Use browser DevTools for debugging

### To Deploy:
1. Copy all files to web server
2. Ensure Google Fonts CDN is accessible
3. Test on multiple devices/browsers
4. Check Lighthouse performance score

### To Add Features:
1. Add CSS variables if needed
2. Create new classes if adding complex logic
3. Add JSDoc comments for new functions
4. Update DIALOGUES array for new content
5. Test on mobile and desktop

## 📝 Future Enhancement Ideas

1. Add actual sound effect files
2. Add image assets for specific dialogues
3. Implement difficulty levels
4. Add leaderboard functionality
5. Create PWA (Progressive Web App)
6. Add dark/light theme toggle
7. Internationalization (multiple languages)
8. Analytics tracking
9. Share score on social media
10. Mobile app version

## 📄 License & Attribution

Created by Vinay Kumar Sain
Built with ❤️ using vanilla JavaScript, HTML5, and CSS3

---

**Last Updated**: May 31, 2026
**Version**: 1.0.0
