let config = require('../config.json')
exports.argumentDictionaryFromMessage = (commandName, messageContent, labels) => {
  if(!messageContent) return;
  if(!labels) return;
  // let args = msg.content.replace(config.prefix+"vapor", "")[0] == " " ?
  // msg.content.replace(config.prefix+"vapor ", "") : "You Need Text"
  let args = messageContent.replace(config.prefix+commandName, "")[0] == " " ? messageContent.replace(config.prefix+commandName+" ", "").split(",") : [null]
  let argDictionary = {}
  for(let i=0;i<args.length;i++) {
    argDictionary[labels[i]] = args[i]
  }
  return argDictionary
};
