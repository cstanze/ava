module.exports = {
  name: 'say',
  description: 'Make Ava Say something!',
  execute(client, msg, arg) {
    if(args[0] == null) {
			args[0] = "You Need Something To Say!"
			msg.channel.send(args[0])
			return
		}
		msg.channel.send(args[0].replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0'))
  }
}
