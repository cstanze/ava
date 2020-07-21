const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
  name: 'eval',
  description: 'Evaluates Some JavaScript',
  useMySQL: true,
  type: 'Private',
  permissionsLevel: 'Bot Owner',
  async execute(client, msg, args) {
    try {
      let evalReturn = eval(msg.content.replace(`${msg.prefix}eval`,""))
      msg.channel.send(`\`\`\`\n${evalReturn == null || undefined ? "null" : evalReturn}\`\`\``)
      return;
    } catch(e) {
      msg.channel.send(`\`\`\`${e}\`\`\``)
      return;
    }
  }
}
