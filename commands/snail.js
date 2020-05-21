module.exports = {
  name: 'snail',
  description: 'Slooowlyy Moooving :snail:',
  execute(client, msg, args) {
    let final = ""
		if(args[0] == null) args[0] = NaN
		if(args[0] != null) args[0] = Number(args[0])
		if(isNaN(args[0])) {
			msg.channel.send(":snail:")
			return;
		}
		if(args[0] > 120) {
			msg.channel.send("Sorry! The Limit is 120 emoji. (Just out of channel courtesy)")
			return;
		}
		for(let i=0;i<args[0];i++) {
			final += ":snail:"
		}
		msg.channel.send(final)
  }
}
