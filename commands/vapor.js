const vaporString = require('../handlers/vapor')

module.exports = {
  name: 'vapor',
  description: 'Ｖａｐｏｒｗａｖｅ  Ｔｅｘｔ',
  args: true,
  usage: '<vapor_text>',
  execute(client, msg, args) {
    args = args.join(' ')
		if(args == null) args = "You Need Some Text"
		msg.channel.send(vaporString(args))
  }
}
