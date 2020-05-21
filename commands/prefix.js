const Discord = require('discord.js')

module.exports = {
  name: 'prefix',
  description: 'Change the prefix of Ava or find the prefix of Ava!',
  aliases: ['pre'],
  handlesPrefix: true,
  async execute(client, msg, args, prefixes) {
    if(args.length) {
      await prefixes.set(msg.guild.id, args[0])
      return msg.channel.send(`Successfully set prefix to \`${args[0]}\``)
    }
    msg.channel.send(`The prefix for ${msg.guild.name} is ${(msg.prefix == "a!" && (await prefixes.get(msg.guild.id) != null)) ? `\`${await prefixes.get(msg.guild.id)}\` but you can also use: \`a!\`` : `\`${await prefixes.get(msg.guild.id)}\``}`)
  }
}
