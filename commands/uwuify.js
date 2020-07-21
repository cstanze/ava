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
    uwu = uwu.replace('source', 'sawce')
		uwu = uwu.replace(/(?:l|r)/g, 'w')
		uwu = uwu.replace(/(?:L|R)/g, 'w')
		uwu = uwu.replace("no", "nyo")
		uwu = uwu.replace("mo", "myo")
    uwu = uwu.replace("No", "Nyo")
		uwu = uwu.replace("Mo", "Myo")
    uwu = uwu.replace("the", "de")
    uwu = uwu.replace("The", "De")
		uwu = uwu.replace("s", "sh")
    uwu = uwu.replace("S", "Sh")
		uwu = uwu.replace(/!+/g, `  >w< `)
		let f = Math.random() > 0.25
		if(f) uwu = uwu.charAt(0) + '-' + uwu
		msg.channel.send(uwu.toLowerCase() + " uwu!")
  }
}
