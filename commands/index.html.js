/*CMD
  command: index.html
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1.0, user-scalable=no">
    <title>BB Drop Blast - BB Game</title>
    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    <link rel="stylesheet" href="<% options.CSSFile %> "> <!-- We Load external CSS file using BB Template -->
</head>
<body>
    <div class="game-ui">
        <div class="ui-card">
            <img src="https://play-lh.googleusercontent.com/0dI3JtAn_MZNjVy1njKtdfRWGhriJyILLownK3HY6jlXatw774YRVRrXBftkZfBWSQ" class="ui-icon">
            <span id="score">0</span>
        </div>
        <div class="ui-card">
            <img src="https://img.icons8.com/ios-filled/50/clock--v1.png" class="ui-icon">
            <span id="time">60</span>s
        </div>
    </div>

    <div id="startScreen" class="game-screen">
        <div class="user-profile">
            <div class="profile-top">
                <img id="userAvatar" class="user-avatar" src="" alt="Avatar">
            </div>
            <div id="userName" class="user-name"></div>
        </div>
        <h1 class="screen-heading floating">DROP BLAST</h1>
        <div class="ui-card" style="margin-bottom: 2rem;">
            <span>High Score: </span>
            <span id="highScore">0</span>
        </div>
        <button class="game-button" id="startButton">
            <img src="https://img.icons8.com/ios/50/play--v1.png" class="ui-icon">
            Start Game
        </button>
    </div>

    <div id="gameOverScreen" class="game-screen" style="display:none">
        <h1 class="screen-heading">GAME OVER</h1>
        <div class="ui-card" style="margin: 1.5rem 0;">
            <span>Score: </span>
            <span id="finalScore">0</span>
        </div>
        <button class="game-button" id="restartButton">
            <img src="https://img.icons8.com/ios/50/restart--v1.png" class="ui-icon">
            Play Again
        </button>
        <button class="game-button button-success" id="share-to-story-btn">
            <img src="https://i.imgur.com/LKjClrQ.png" class="ui-icon">
            Share to Story
        </button>
        <button class="game-button button-danger" id="mainMenuButton">
            <img src="https://img.icons8.com/ios/50/home-page.png" class="ui-icon">
            Main Menu
        </button>
    </div>

    <div id="freezeEffect" class="game-effect freeze-effect" style="display:none"></div>
    <div id="bombEffect" class="game-effect bomb-effect" style="display:none"></div>
    <canvas id="gameCanvas"></canvas>

    <div id="fullscreenIndicator" class="fullscreen-indicator">
        <img src="https://img.icons8.com/ios/50/full-screen.png" class="ui-icon">
        <span>Fullscreen: </span>
        <span id="fullscreenStatus">Off</span>
    </div>
<script src="<% options.JSFile %>"></script> <!-- We loaded the external JS file here using the BB template for better organization -->
</html>
