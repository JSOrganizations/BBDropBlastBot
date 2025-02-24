/*CMD
  command: script.js
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

const tg = window.Telegram.WebApp;
tg.expand();
tg.disableVerticalSwipes();
tg.enableClosingConfirmation();
tg.setHeaderColor('#0f172a');
tg.setBackgroundColor('#1e293b');
tg.setBottomBarColor('#1e293b');

let highScore = 0;
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let gameRunning = false;
let elements = [], particles = [];
let animationFrameId, timerId, spawnTimeout, bombEffectTimeout;
let score = 0, timeLeft = 60, iceAvailable = 3;
let isFrozen = false, iceActive = false, freezeTime = false;
let lastFrame = performance.now();

const assets = {
    element: Object.assign(new Image(), { src: 'https://play-lh.googleusercontent.com/0dI3JtAn_MZNjVy1njKtdfRWGhriJyILLownK3HY6jlXatw774YRVRrXBftkZfBWSQ' }),
    bomb: Object.assign(new Image(), { src: 'https://pngimg.com/d/bomb_PNG32.png' }),
    ice: Object.assign(new Image(), { src: 'https://i.imgur.com/gdcxKlv.png' })
};

const config = {
    spawnRate: 300,
    elementSpeed: { min: 120, max: 160 },
    iceDuration: 4000,
    maxElements: 100,
    bombChance: 0.15,
    elementSizes: [35, 40, 50, 55, 60]
};

let fsHideTimeout;
let lastFullscreenState = tg.isFullscreen;

function setupFullscreenControls() {
    if (tg.isVersionAtLeast("8.0")) {
        const startScreen = document.getElementById('startScreen');
        const fullscreenButton = document.createElement('button');
        fullscreenButton.className = 'game-button';
        fullscreenButton.id = 'toggleFullscreen';
        fullscreenButton.innerHTML = getFullscreenButtonContent();
        
        fullscreenButton.addEventListener('click', () => {
            if (tg.isFullscreen) {
                tg.exitFullscreen();
            } else {
                tg.requestFullscreen();
            }
            updateFullscreenButton();
            showFullscreenStatus();
        });
        
        startScreen.appendChild(fullscreenButton);
        updateFullscreenButton();
        
        setInterval(() => {
            if (tg.isFullscreen !== lastFullscreenState) {
                lastFullscreenState = tg.isFullscreen;
                updateFullscreenButton();
                showFullscreenStatus();
            }
        }, 100);
    }
}

function getFullscreenButtonContent() {
    return tg.isFullscreen 
        ? `<img src="https://cdn-icons-png.flaticon.com/512/6398/6398944.png" class="ui-icon"> Exit Fullscreen`
        : `<img src="https://img.icons8.com/ios/50/full-screen.png" class="ui-icon"> Enter Fullscreen`;
}

function updateFullscreenButton() {
    const btn = document.getElementById('toggleFullscreen');
    if (!btn) return;
    btn.innerHTML = getFullscreenButtonContent();
}

function showFullscreenStatus() {
    const indicator = document.getElementById('fullscreenIndicator');
    const statusSpan = document.getElementById('fullscreenStatus');
    if (!indicator) return;
    
    statusSpan.textContent = tg.isFullscreen ? 'On' : 'Off';
    const icon = indicator.querySelector('img');
    icon.src = tg.isFullscreen 
        ? 'https://cdn-icons-png.flaticon.com/512/6398/6398944.png'
        : 'https://img.icons8.com/ios/50/full-screen.png';
    
    indicator.classList.add('visible');
    clearTimeout(fsHideTimeout);
    fsHideTimeout = setTimeout(() => {
        indicator.classList.remove('visible');
    }, 2000);
}

function loadUserProfile() {
    const nameElement = document.getElementById('userName');
    const avatarElement = document.getElementById('userAvatar');
    
    nameElement.textContent = 'Guest';
    avatarElement.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

    if (tg.initDataUnsafe.user) {
        const user = tg.initDataUnsafe.user;
        const userName = `${user.first_name || ''} ${user.last_name || ''}`.trim();
        if (userName) nameElement.textContent = userName;
        
        if (user.photo_url) {
            avatarElement.src = user.photo_url;
        }

        if (tg.isVersionAtLeast("8.0") && user.is_premium) {
            addEmojiStatusButton();
        }
    }
}

function addEmojiStatusButton() {
    const profileTop = document.querySelector('.profile-top');
    const btn = document.createElement('div');
    btn.className = 'emoji-status-btn';
    btn.id = 'emojiStatusBtn';
    
    const img = document.createElement('img');
    img.className = 'ui-icon';
    
    tg.CloudStorage.getItem('emoji_status_set', (err, value) => {
        img.src = value === 'yes' 
            ? 'https://play-lh.googleusercontent.com/0dI3JtAn_MZNjVy1njKtdfRWGhriJyILLownK3HY6jlXatw774YRVRrXBftkZfBWSQ'
            : 'https://img.icons8.com/ios-filled/50/plus-math.png';
    });

    btn.appendChild(img);
    profileTop.appendChild(btn);
    
    btn.addEventListener('click', handleEmojiStatus);
}

function handleEmojiStatus() {
    const btn = this;
    const img = btn.querySelector('img');

    tg.requestEmojiStatusAccess((isGranted) => {
        if (isGranted) {
            setEmojiStatus(btn);
        } else {
            tg.showConfirm("Need permission to set emoji status. Allow access?", (ok) => {
                if (ok) tg.requestEmojiStatusAccess(handleEmojiStatus);
            });
        }
    });
}

function setEmojiStatus(btn) {
    const img = btn.querySelector('img');
    
    tg.setEmojiStatus('6064140861539618361', {}, (success) => {
        if (success) {
            tg.CloudStorage.setItem('emoji_status_set', 'yes');
            img.src = 'https://play-lh.googleusercontent.com/0dI3JtAn_MZNjVy1njKtdfRWGhriJyILLownK3HY6jlXatw774YRVRrXBftkZfBWSQ';
            tg.showAlert("Special status activated!");
        } else {
            tg.showConfirm("Failed to set status. Try again?", (retry) => {
                if (retry) setEmojiStatus(btn);
            });
        }
    });
}

function loadHighScore() {
    if (tg.initDataUnsafe.user) {
        tg.CloudStorage.getItem('high_score', (err, value) => {
            if (!err && value) {
                highScore = parseInt(value) || 0;
                document.getElementById('highScore').textContent = highScore;
            }
        });
    }
}

function saveHighScore(newScore) {
    if (tg.initDataUnsafe.user && newScore > highScore) {
        highScore = newScore;
        tg.CloudStorage.setItem('high_score', highScore.toString());
    }
}

function handleResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('restartButton').addEventListener('click', startGame);
document.getElementById('mainMenuButton').addEventListener('click', showMainMenu);
document.getElementById('share-to-story-btn').addEventListener('click', function() {
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

canvas.addEventListener('click', handleClick);
window.addEventListener('resize', handleResize);

function init() {
    handleResize();
    loadUserProfile();
    loadHighScore();
    setupFullscreenControls();
}
init();

function showMainMenu() {
    gameRunning = false;
    cancelAnimationFrame(animationFrameId);
    clearTimeout(timerId);
    clearTimeout(spawnTimeout);
    clearTimeout(bombEffectTimeout);
    document.getElementById('gameOverScreen').style.display = 'none';
    document.getElementById('startScreen').style.display = 'flex';
    tg.BackButton.hide();
    resetGameState();
}

function resetGameState() {
    score = 0;
    timeLeft = 60;
    iceAvailable = 3;
    elements = [];
    particles = [];
    isFrozen = false;
    iceActive = false;
    freezeTime = false;
    lastFrame = performance.now();
    document.getElementById('score').textContent = '0';
    document.getElementById('time').textContent = '60';
    document.getElementById('freezeEffect').style.display = 'none';
    document.getElementById('bombEffect').style.display = 'none';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function startGame() {
    tg.BackButton.show();
    tg.BackButton.onClick(() => {
        tg.showConfirm('Return to Main Menu?', (ok) => ok && showMainMenu());
    });
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('gameOverScreen').style.display = 'none';
    resetGameState();
    gameRunning = true;
    animationFrameId = requestAnimationFrame(gameLoop);
    spawnElements();
    updateTimer();
}

function spawnElements() {
    if (!gameRunning || isFrozen || elements.length >= config.maxElements) return;
    
    let type = 'element';
    const rand = Math.random();
    if (rand < config.bombChance) type = 'bomb';
    else if (iceAvailable > 0 && rand > 0.9 && !iceActive) {
        type = 'ice';
        iceAvailable--;
        iceActive = true;
    }

    const size = config.elementSizes[Math.floor(Math.random() * config.elementSizes.length)];
    elements.push({
        type,
        x: Math.random() * (canvas.width - size),
        y: -size,
        speed: config.elementSpeed.min + Math.random()*(config.elementSpeed.max - config.elementSpeed.min),
        alpha: 1,
        size: size
    });

    spawnTimeout = setTimeout(spawnElements, config.spawnRate);
}

function updateTimer() {
    if (!gameRunning) return;
    
    if (!freezeTime) {
        timeLeft = Math.max(0, timeLeft - 1);
        document.getElementById('time').textContent = timeLeft;
    }
    
    if (timeLeft <= 0) {
        endGame();
    } else {
        timerId = setTimeout(updateTimer, 1000);
    }
}

function endGame() {
    gameRunning = false;
    document.getElementById('gameOverScreen').style.display = 'flex';
    document.getElementById('finalScore').textContent = score;
    saveHighScore(score);
    tg.BackButton.hide();
    
    if (tg.isVersionAtLeast("8.0")) {
        tg.checkHomeScreenStatus((status) => {
            if (status === 'unsupported') return;
            if (status === 'missed') {
                tg.addToHomeScreen();
                tg.onEvent('homeScreenAdded', () => {
                    tg.showAlert('App successfully added to the home screen!');
                });
            }
        });
    }
}

function handleClick(e) {
    if (!gameRunning) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    elements = elements.filter(el => {
        if (x > el.x && x < el.x + el.size && y > el.y && y < el.y + el.size) {
            processClick(el);
            createParticles(el.x + el.size/2, el.y + el.size/2, el.type);
            return false;
        }
        return true;
    });
}

function processClick(el) {
    switch(el.type) {
        case 'element': score += 10; break;
        case 'bomb': 
            score = Math.max(0, score - 30);
            if (navigator.vibrate) navigator.vibrate(300);
            showBombEffect();
            break;
        case 'ice': activateFreeze(); break;
    }
    document.getElementById('score').textContent = score;
}

function activateFreeze() {
    if (isFrozen) return;
    isFrozen = true;
    freezeTime = true;
    
    const freezeEffect = document.getElementById('freezeEffect');
    freezeEffect.style.display = 'block';
    
    for(let i = 0; i < 15; i++) {
        const crack = document.createElement('div');
        crack.className = 'ice-crack';
        crack.style.left = Math.random() * 100 + '%';
        crack.style.top = Math.random() * 100 + '%';
        crack.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random()})`;
        freezeEffect.appendChild(crack);
    }

    const particleInterval = setInterval(() => {
        if(!isFrozen) return;
        const particle = document.createElement('div');
        particle.className = 'freeze-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '-10px';
        particle.style.animation = `fall ${2 + Math.random() * 3}s linear`;
        particle.style.opacity = 0.5 + Math.random() * 0.5;
        freezeEffect.appendChild(particle);
        
        setTimeout(() => particle.remove(), 3000);
    }, 100);

    elements.forEach(el => {
        el.originalSpeed = el.speed;
        el.speed = el.speed * 0.2;
    });

    setTimeout(() => {
        isFrozen = false;
        freezeTime = false;
        iceActive = false;
        freezeEffect.style.display = 'none';
        freezeEffect.innerHTML = '';
        clearInterval(particleInterval);
        elements.forEach(el => el.speed = el.originalSpeed);
        spawnElements();
    }, config.iceDuration);
}

function showBombEffect() {
    const bombEffect = document.getElementById('bombEffect');
    bombEffect.style.display = 'block';
    bombEffectTimeout = setTimeout(() => bombEffect.style.display = 'none', 500);
}

function createParticles(x, y, type) {
    const colors = {
        element: '#6366f1',
        bomb: '#ef4444',
        ice: '#60a5fa'
    };
    
    for (let i = 0; i < 20; i++) {
        particles.push({
            x, y,
            vx: (Math.random() - 0.5) * 12,
            vy: (Math.random() - 1) * 20,
            life: 1,
            size: Math.random() * 4 + 2,
            color: colors[type]
        });
    }
}

function updateGame(delta) {
    elements = elements.filter(el => el.y < canvas.height + 100);
    
    if (!isFrozen) {
        elements.forEach(el => {
            el.y += el.speed * (delta / 1000);
            el.alpha = Math.min(1, el.alpha + delta * 0.002);
        });
    }

    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.7;
        p.life -= 0.015;
    });
    particles = particles.filter(p => p.life > 0);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    elements.forEach(el => {
        ctx.globalAlpha = el.alpha;
        ctx.drawImage(assets[el.type], el.x, el.y, el.size, el.size);
    });
    
    particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });
    
    ctx.globalAlpha = 1;
}

function gameLoop(timestamp) {
    if (!gameRunning) return;
    const delta = timestamp - lastFrame;
    lastFrame = timestamp;
    
    updateGame(delta);
    draw();
    animationFrameId = requestAnimationFrame(gameLoop);
}
