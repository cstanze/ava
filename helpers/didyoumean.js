const emojiWordList = ["nou_100", "uwu_100", "loli_100", "KannaWhat", "KannaSip", "Hehe", "blush_eoto", "LewMegumin", "Akko_Blush",
											 "shrek_lip_thing", "flushed", "glasses_aww", "servericon", "smugneko", "ahegao", "uhh", "lip_thing_zoom",
											 "barry", "homer", "ios13", "the_owner", "aesthetic", "conor", "koolaid_uhh", "april", "uwu_pat", "tired",
										   "interested", "smug", "smol", "mio_walk"]
const commandTypeList = ["mod", "image", "fun", "emoji", "text", "private", "misc", "music"]
const autoemoji = require('autocorrect')({ words: emojiWordList })
const autotype = require('autocorrect')({ words: commandTypeList })

exports.didYouMean = (word, listType) => {
  if(listType == "emoji") {
    return autoemoji(word)
  } else if(listType == "command_type") {
    return autotype(word)
  }
}

exports.didYouMeanCustom = (word, list) => {
	const customCorrect = require('autocorrect')({ words: list })
	return customCorrect(word)
}
