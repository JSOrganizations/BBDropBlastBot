# BB Drop Blast - Telegram WebApp Game

[![Telegram WebApp](https://img.shields.io/badge/Telegram-WebApp-2AABEE?logo=telegram)](https://core.telegram.org/bots/webapps)
![License](https://img.shields.io/badge/License-MIT-green)

An addictive arcade-style game built for BotsBusiness Bot WebApp Development Contest,In This Game players tap falling elements to score points while avoiding bombs and using power-ups.

![drop](https://github.com/user-attachments/assets/79bf4233-ffac-4bc1-853e-e9bc389f14dc)

## Features

🎮 **Core Gameplay**
- Dynamic falling elements with varying speeds/sizes
- Bomb avoidance mechanics
- Ice power-up to slow down elements
- Real-time score tracking
- High score system with cloud storage

💎 **Premium Features**
- Telegram user profile integration
- Emoji status for premium users [Bot API 8.0]
- Story sharing with score challenges
- Home screen installation prompts

✨ **Special Effects**
- Particle explosion animations
- Screen freeze effect with ice particles
- Bomb shake effect
- Floating UI elements with glassmorphism design

📱 **Telegram Integration**
- Native WebApp UI components
- Cloud storage for high scores
- Fullscreen mode support [Bot API 8.0]
- Telegram BackButton integration
- Device vibration feedback

## 🎮 How It Works

### 1. **Starting the Game**
- **Launch the Game**: Open the game through your Telegram bot or WebApp link.
- **Main Menu**:
  - See your profile (name, avatar, and high score).
  - Tap **"Start Game"** to begin.
  - Use **"Fullscreen"** (if available - *Require [Version 8.0])* for an immersive experience.

![Main Menu Screenshot](https://github.com/user-attachments/assets/691685f3-0c2d-4f88-b91f-3a7a001afb1b)


```javascript
// Initialize Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand(); // Expands the app to full height
tg.setHeaderColor('#0f172a'); // Sets the header color
tg.setBackgroundColor('#1e293b'); // Sets the background color
```

---

### 2. **Gameplay Basics**
- **Objective**: Tap falling elements to score points while avoiding bombs.
- **Falling Elements**:
  - 🟢 **Normal Elements**: Tap to collect (+10 points).
  - 💣 **Bombs**: Avoid tapping (lose -30 points if hit).
  - ❄️ **Ice Power-Ups**: Tap to freeze time and slow down elements.
- **Timer**: You have **60 seconds** to score as many points as possible.

![Gameplay Screenshot](https://github.com/user-attachments/assets/dd859884-8c78-4df6-834b-f60f1d897c06)


```javascript
// Element spawning logic
function spawnElement() {
  const type = Math.random() < 0.15 ? 'bomb' : 'element';
  elements.push({
    type,
    x: Math.random() * canvas.width,
    y: -50,
    speed: 120 + Math.random() * 40
  });
}
```

---

### 3. **Power-Ups**
- **Freeze Power-Up**:
  - Temporarily slows down all falling elements.
  - Activates for **4 seconds** (configurable).
  - Limited uses per game.
![image](https://github.com/user-attachments/assets/24eef628-f56f-4856-bfdd-aafdb8c1d774)

- **Combo System**:
  - Chain consecutive taps for bonus points.
  - Multiplier increases with each successful hit.

```javascript
// Freeze power-up logic
function activateFreeze() {
  isFrozen = true;
  elements.forEach(el => el.speed *= 0.2); // Slow down elements
  setTimeout(() => isFrozen = false, 4000); // Reset after 4 seconds
}
```

---

### 4. **Game Over**
- When the timer runs out, the game ends.
- **Game Over Screen**:
  - See your final score.
  - Compare with your **high score** (saved via Telegram Cloud Storage).
  - Options:
    - 🔄 **Play Again**: Restart the game.
    - 📤 **Share to Story**: Post your score on Telegram (if supported).
    - 🏠 **Main Menu**: Return to the start screen.

![Game Over Screenshot](https://github.com/user-attachments/assets/bb5e1a9e-37a1-496a-a9a2-769da88e7e00)


```javascript
// Save high score to Telegram Cloud Storage
function saveHighScore(score) {
  const highScore = Math.max(score, Telegram.CloudStorage.getItem('highScore') || 0);
  Telegram.CloudStorage.setItem('highScore', highScore);
}
```

---

### 5. **Advanced Features**
- **Telegram Integration**:
  - **Profile Display**: Shows your Telegram name and avatar.
  - **Story Sharing**: Share your score with friends.
  - **Emoji Status**: Premium users can set a custom emoji status. * - Require [Version 8.0]*
- **Fullscreen Mode**: Optimized for mobile and desktop play. *- Require [Version 8.0]*
- **Haptic Feedback**: Vibrates on bomb hits (if supported by the device).
- **Add to Home Screen**: Install the game for quick access. *- Require [Version 8.0]*

![Advanced Features Screenshot](https://github.com/user-attachments/assets/c12db2bf-29b5-465e-a727-96696ef77b27)

**ADD TO Home Screen**
```javascript
// Add to Home Screen logic
function checkHomeScreenInstall() {
  tg.checkHomeScreenStatus((status) => {
    if (status === 'missed') {
      tg.addToHomeScreen(); // Prompt user to add to home screen
      tg.onEvent('homeScreenAdded', () => {
        tg.showAlert('Game added to home screen! 🎉');
      });
    }
  });
}
```
### **Story Sharing**
**Share Your Score:** Post your high score to your Telegram story.

**How It Works:**
- After the game ends, tap **"Share to Story"**.
- A preview of your score is generated.
- Share it directly to your Telegram story.

![Story Sharing Screenshot](https://github.com/user-attachments/assets/00091927-d809-46ef-956f-d1eee508ceb9)


```javascript
// Story sharing logic
const media_url = 'https://botfather.cloud/Assets/Photo/DropBlast.jpg';
    const storyParams = {
        text: `I scored ${score} points in BB Drop Blast! Can you beat me?`,
    };

    if (tg.initDataUnsafe.user && tg.initDataUnsafe.user.is_premium) {
        storyParams.widget_link = {
            url: 'https://app.bots.business/',
            name: 'Create Own Bot',
        };
    }

    if (tg.platform !== 'unknown') {
        tg.shareToStory(media_url, storyParams);
    } else {
        tg.showAlert('Story sharing is not available in this version of Telegram');
    }
});
```

---

### **6. Emoji Status System**
- **For Premium Users**: Players with Telegram Premium can set a custom emoji status.
- **How It Works**:
  - Tap the **emoji button** next to your profile avatar.
  - Grant permission to set your emoji status.
  - A special emoji status is activated for 1 hour.

![Emoji Status Screenshot](https://github.com/user-attachments/assets/dbe303d8-4f5b-4465-9b65-10e77c484a38)

```javascript
// Emoji status logic
function setEmojiStatus() {
  tg.requestEmojiStatusAccess((isGranted) => {
    if (isGranted) {
      tg.setEmojiStatus('6064140861539618361', {}, (success) => {
        if (success) {
          tg.showAlert("Special status activated! 🎉");
        } else {
          tg.showAlert("Failed to set emoji status. Try again!");
        }
      });
    } else {
      tg.showAlert("Permission denied. Enable emoji status access in settings.");
    }
  });
}
```

![Screenshot](https://github.com/user-attachments/assets/3a2e5799-6da2-4423-956e-754f8ac4dee8)
### 7. **Winning Strategy**
- Focus on tapping **normal elements** for consistent points.
- Use **ice power-ups** strategically during high-speed moments.
- Avoid **bombs** to prevent score penalties.
- Aim for **combos** to maximize your score multiplier.

```javascript
// Combo system logic
let comboCount = 0;
function processClick(el) {
  if (el.type === 'element') {
    comboCount++;
    score += 10 * Math.min(comboCount, 4); // Max 4x multiplier
  } else {
    comboCount = 0; // Reset combo on bomb hit
  }
}
```

---

### How We Developed This Using Bots.Business
*Bots.Business Support Devlop and host Telegram WebApp*

#### 1. Creating the `/start` Command
We create a `/start` command that sends a message with an inline button to open the Web App.

```js
var AppURL = WebApp.getUrl({ command: "index" });
```

#### 2. Setting Up the `index` Command
In the `index` command, we define URLs for external CSS and JavaScript files and render them using templates:

```js
var CSSFile = WebApp.getUrl({ command: "renderCSS" });
var JSFile = WebApp.getUrl({ command: "renderJS" });

WebApp.render({
  template: "index.html",
  options: {
    CSSFile: CSSFile,
    JSFile: JSFile
  }
});
```

Using templates allows for better organization by separating CSS and JavaScript into different files, making the code cleaner and more maintainable.

#### 3. Rendering CSS and JavaScript Files
To include external CSS and JavaScript files, we use the following commands:

##### `renderCSS` Command
```js
WebApp.render({
  template: "script.css",
  mime_type: "text/css"
});
```

##### `renderJS` Command
```js
WebApp.render({
  template: "script.js",
  mime_type: "application/javascript"
});
```
These commands allow us to load the main JavaScript and CSS files that were moved to separate files.

#### 4. Linking External CSS and JavaScript in `index.html`
To include the external files in `index.html`, we use the following:

```html
<link rel="stylesheet" href="<% options.CSSFile %>"> <!-- Load external CSS file using BB Template -->
<script src="<% options.JSFile %>"></script> <!-- Load external JS file using BB Template -->
```

This ensures that the styles and scripts are properly loaded from their respective file paths, keeping the project well-structured and modular.




## 🎮 Core Features

### Gameplay Mechanics
| Feature                | Customization Point          | Default Value     |
|------------------------|------------------------------|-------------------|
| Element Spawning       | `config.spawnRate`           | 300ms            |
| Element Speeds         | `config.elementSpeed`        | 120-160px/s      |
| Bomb Probability       | `config.bombChance`          | 15%              |
| Freeze Duration        | `config.iceDuration`         | 4000ms           |
| Score Values           | `processClick()` multipliers | +10/-30 points   |
