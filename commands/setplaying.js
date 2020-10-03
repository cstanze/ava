const Discord = require('discord.js')

module.exports = {
  name: 'setplaying',
  description: 'Set Playing Status of Ava',
  type: 'Private',
  aliases: ['setstatus'],
  usage: '<status> <activity_type> <activity_name>',
  example: 'online streaming cod mobile',
  args: true,
  async execute(client, msg, args) {
    const allowedStatuses = ['online', 'idle', 'invisible', 'dnd', 'offline']
    if(!allowedStatuses.includes(args[0])) return
    const allowedTypes = ['LISTENING', 'STREAMING', 'PLAYING', 'WATCHING']
    if(!allowedTypes.includes(args[1].toUpperCase())) return
    let xrgs = msg.content.slice(msg.prefix.length).split(/\s+/)
    xrgs.shift()
    xrgs.shift()
    xrgs.shift()
    args[2] = xrgs.join(' ')
    client.user.setPresence({
      activity: {
        name: args[2],
        type: args[1].toUpperCase(),
        browser: 'Discord iOS'
      },
      status: args[0] == 'offline' ? 'invisible' : args[0]
    })
    msg.channel.send(`\`\`\`asciidoc\nStatus::${' '.repeat(5)}${args[0]}\nActivity Name::${' '.repeat(5)}${args[2]}\nActivity Type::${' '.repeat(5)}${args[1].toUpperCase()}\n\`\`\``)
  }
}
