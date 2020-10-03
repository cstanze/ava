const fetch = require('node-fetch')

module.exports = {
  name: 'uwuify',
  description: '',
  args: true,
  usage: '<text to uwu>',
  type: 'Text',
  aliases: ['uwu'],
  execute(client, msg, args) {
		if(args[0] == null) args[0] = "You need to have something to say. >w<"
		args = args.join(' ')
    let uwu = args
    uwu = uwu.replace(/(source)/gi, 'sauce')
             .replace(/(?:l+|r+)/gi, 'w')
		         .replace(/n+/gi, "nyo")
		         .replace(/m+/gi, "myo")
             .replace(/the+/gi, "de")
		         .replace(/s+/gi, "sh")
		         .replace(/!+/g, ` >w< `)
             .replace(/(µωµ)/gi, 'owo')
             .replace(/(uωu)/gi, 'µωµ')
             .replace(/(uwu)/gi, 'uωu')
		let f = Math.random() > 0.25
		if(f) uwu = uwu.charAt(0) + '-' + uwu
		msg.channel.send(`${uwu.toLowerCase()} uwu`)
  }
}
