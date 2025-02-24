/*CMD
  command: /start
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var AppURL = WebApp.getUrl({ command: "index" });

Api.sendMessage({
  text: "🎮 Click below to play BB Drop Blast!\n🎮 Start Game!\n🖱️ Tap BB Logo\n💣 Avoid Bombs",
  reply_markup: {
    inline_keyboard: [
      [{ text: "Play BB Drop Blast", web_app: { url: AppURL } }]
    ]
  }
});

