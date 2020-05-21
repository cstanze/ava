module.exports = {
  name: 'rero',
  description: 'Rero rero rero rero rero',
  execute(client, msg, args) {
    let final = ""
		if(args[0] == null) args[0] = NaN
		if(args[0] != null) args[0] = Number(args[0])
		if(isNaN(args[0])) {
			msg.channel.send("rero")
			return;
		}
		if(args[0] > 120) {
			msg.channel.send("Sorry! The Limit is 120 rero. (Just out of channel courtesy)")
			return;
		}
		for(let i=0;i<args[0];i++) {
			final += "rero"
		}
		msg.channel.send(final)
  }
}
