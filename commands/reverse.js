module.exports = {
  name: 'reverse',
  description: 'Reverse some text!',
  args: true,
  usage: '<text_to_reverse>',
  execute(client, msg, args) {
    args[0] = args.join(" ")
    if(args[0] == null) {
			args[0] = "You Need Text"
			msg.channel.send(args[0])
			return
		}
		msg.channel.send(args[0].split("").reverse().join(""))
  }
}
