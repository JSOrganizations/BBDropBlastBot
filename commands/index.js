/*CMD
  command: index
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

var CSSFile = WebApp.getUrl({ command: "renderCSS" });
var JSFile = WebApp.getUrl({ command: "renderJS" });

WebApp.render({
  template: "index.html",
  options: {
    CSSFile: CSSFile,
    JSFile: JSFile
  }
});

