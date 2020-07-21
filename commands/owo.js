module.exports = {
  name: 'OwO',
  description: 'OwO Whats This?',
  type: 'Text',
  aliases: ['owo'],
  execute(client, msg, args) {
    let final = ""
		if(args[0] == null) args[0] = NaN
		if(args[0] != null) args[0] = Number(args[0])
		if(isNaN(args[0]) || args[0] == 1) {
			msg.channel.send("OwO")
			return;
		}
		if(args[0] > 120) {
			msg.channel.send("Sorry! The Limit is 120 owo. (Just out of channel courtesy)")
			return;
		}
		for(let i=0;i<args[0];i++) {
			final += "OwO "
		}
		msg.channel.send(final)
  }
}
