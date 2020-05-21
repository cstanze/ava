const Discord = require('discord.js')

module.exports = {
  name: 'embarrass',
  description: 'Ever got embarrassed by someone? Ever got embarrassed by yourself?',
  type: 'Text',
  aliases: ['enbarrass', 'embarass', 'embarras', 'enbarass', 'embrass', 'embaras', 'emvarras', 'emvarrass'],
  async execute(client, msg, args) {
    let preCommand = msg.content.slice(msg.prefix.length).split(/\s+/)
  	let commandName = preCommand.shift().toLowerCase()
    let chan = msg.channel
    if(this.aliases.includes(commandName)) {
			chan.createWebhook(`${msg.member.nickname ? msg.member.nickname : msg.author.username}`, { avatar: msg.member.user.avatarURL({ size: 512, dynamic: true }) }).then(async wh => {
        await wh.send(`I don't know how to spell \`embarrass\``)
        wh.delete()
      })
			return
		}
    chan.createWebhook(`${msg.member.nickname ? msg.member.nickname : msg.author.username}`, { avatar: msg.member.user.avatarURL({ size: 512, dynamic: true }) }).then(async wh => {
      let { embarrassRemarks } = require('../helpers/embarrassRemarks.js')
      await wh.send(embarrassRemarks[Math.floor(Math.random() * embarrassRemarks.length)])
      wh.delete()
    })
  }
}
