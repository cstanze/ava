const Discord = require('discord.js')

module.exports = {
  name: 'setPlaying',
  description: 'Set Playing Status of Ava',
  type: 'Private',
  aliases: ['setstatus'],
  usage: '<status> <activity_type> <activity_name> <activity_url>'
  execute(client, msg, args) {
    const allowedStatuses = ['online', 'idle', 'invisible', 'dnd', 'offline']
    if(allowedStatuses.includes(args[0]))
    const allowedTypes = ['LISTENING', 'STREAMING', 'PLAYING', 'WATCHING']
    if(allowedTypes.includes(args[1].toUpperCase()))
    client.user.setPresence({
      activity: {
        name: args[2],
        type: args[1].toUpperCase(),
        url: args[3]
      },
      status: args[0] == 'offline' ? 'invisible' : args[0]
    })
    msg.channel.send(`\`\`\`asciidoc\nStatus::${' '.repeat(5)}${args[0]}\nActivity Name::${' '.repeat(5)}${args[2]}\nActivity Type::${' '.repeat(5)}${args[1].toUpperCase()}\nActivity URL::${' '.repeat(5)}${args[3]}\n\`\`\``)
  }
}
