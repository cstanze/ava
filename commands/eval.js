const Discord = require('discord.js')
const { inspect } = require(`util`)
let embede
let result
let col
let start

module.exports = {
  name: 'eval',
  description: 'Evaluates Some JavaScript uwu',
  type: 'Private',
  permissionsLevel: 'Bot Owner',
  async execute(client, msg, args) {
    start = new Date()
    argss = msg.content.replace(RegExp(`${msg.prefix}eval\\s+(\\n?)+`, `gi`), ``)
    try {
      result = inspect(eval(argss), { depth: 1, })
    } catch(e) {
      result = e
      fail = true
    }
    if (result.length > 1024 && result.length < 80000) {
      require(`hastebin-gen`)(result, { extension: `js`} ).then(haste => msg.channel.send(`Result was too big: ` + haste))
    } else if(result.length > 80000) {
      msg.channel.send(`I was going to send this in a hastebin, but the result is over 2,000 characters!`)
    } else { 
      msg.channel.send(new Discord.MessageEmbed()
                       .addField(`\u200B`, `\`\`\`js\n${result}\`\`\``)
                       .setColor(fail ? `#ff0033` : `#8074d2`)
                       .setFooter(`${new Date() - start}ms`, message.author.avatarURL()))
    }
  }
}
