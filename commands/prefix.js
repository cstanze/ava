const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'prefix',
  description: 'Change the prefix of Ava or find the prefix of Ava!',
  aliases: ['pre'],
  type: 'Settings',
  permissionsLevel: 'Server Administrator',
  async execute(client, msg, args) {
    if(args.length) {
      if(!msg.member.hasPermission('MANAGE_NICKNAMES')) return msg.channel.send(`You don't have sufficient permissions to change the prefix of Ava. Please try again later`)
      if(args[0] == "-") return msg.channel.send(`If you want a dash as the prefix, please use \`${msg.prefix}prefix \\-\`\nThis also applies for when you want a dash *in* the prefix.`)
      await db.set(`prefix_${msg.guild.id}`, args[0].trim().replace(/[^\\-]-/g, ' ').replace(/\\/g, ""))
      return msg.channel.send(`Successfully set prefix to \`${args[0].trim().replace(/[^\\-]-/g, ' ').replace(/\\/g, "")}\``)
    }
    let currentPrefix = await db.get(`prefix_${msg.guild.id}`)
    let prefixEmbed = new Discord.MessageEmbed()
    .setTitle(`${msg.guild.name}\'s Prefix: ${currentPrefix == null ? "a!" : currentPrefix}`)
    .setAuthor(`${msg.guild.name} Prefix`, msg.guild.iconURL({ size: 512, dynamic: true }))
    .setThumbnail(msg.guild.iconURL({ size: 512, dynamic: true }))
    .setColor("#8074d2")
    .setDescription(`${Math.random() < 0.9 ? `\n**Tip:** You can use \`-\` (a single dash or multiple dashes if uses like this: \`--\`) to indicate a space in a prefix.\nYou can also use \`\\-\` to add a dash in your prefix` : `The prefix used for this command: \`${msg.prefix}`}\``)
    .addFields(
      { name: 'Guild Prefix', value: `${currentPrefix == null ? `There is no guild prefix set for ${msg.guild.name}.\n You can use the global prefix or set one using \`a!prefix <new prefix>\`` : currentPrefix}`, inline: false },
      { name: 'Global Prefix', value: 'a!', inline: false }
    )
    .setFooter(client.randomFooters[Math.floor(Math.random() * client.randomFooters.length)])
    .setTimestamp()
    msg.channel.send(prefixEmbed)
  }
}
