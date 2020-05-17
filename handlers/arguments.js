let config = require('../config.json')
exports.argumentDictionaryFromMessage = (commandName, content, labels) => {
  let singular
  if(!content) return;
  if(!labels) return;
  if((labels.length == 1)) singular = true
  // Add Slashes
  let messageContent = content.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
  let args = messageContent.replace(config.prefix+commandName, "")[0] == " " ? messageContent.replace(config.prefix+commandName+" ", "") : [null]
  args = args != [null] ? (singular ? args : (typeof args.split(", ") == "string" ? (typeof args.split(",") == "string" ? args.split(" ") : args.split(",")) : args.split(", "))) : [null]
  let argDictionary = {}
  if(singular) {
    argDictionary[labels[0]] = args
    return argDictionary
  }
  for(let i=0;i<args.length;i++) {
    argDictionary[labels[i]] = args[i]
  }
  return argDictionary
};
