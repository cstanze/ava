const Discord = require('discord.js')
const download = require('download-file')

module.exports = {
  name: 'parse',
  description: 'Parse a commands from an Ava command file (`*.ava`)',
  type: 'Private',
  permissionsLevel: 'True Owner',
  async execute(client, msg, args) {
    return // TODO: Try this out
    const acf = msg.attachments.first()
    if(!acf) return msg.channel.send(`Please provide an Ava Command File (\`*.ava\`)`)
    if(!acf.name) return msg.channel.send(`Please provide an Ava Command File (\`*.ava\`)`)
    if(!acf.name.split('.')[acf.name.split(',').length - 1] == 'ava') return msg.channel.send(`Please provide an Ava Command File (\`*.ava\`)`)
    let acfMB = acf.size / 1024 / 1024
    if(acfMB >= 2) return msg.channel.send(`File too big. ACF Files must be under 2MB.`)
    download(acf.url, { directory: './assets/', filename: 'commands.acf' }, e => {
      if (e) return msg.channel.send(`Something happened while parsing your file... try again later.`)
      const commands = require('fs').readFileSync('./assets/commands.acf').toString()
      for(const command in commands.split(/<>-<>/gi, '')) {
        client.emit('msg', new Discord.Message(client, { content: command, author: msg.author }, msg.channel))
      }
    })
  }
}
