const Discord = require('discord.js')
const db = require('quick.db')
let randomFooters = ["Proudly created in nano", "Puppers!", ":O", "CPU Overheating...", "Quacc", "Welcome Cthulu!", "NYU Tisch", "Widen That Keyhole...", "01000110"]

module.exports = {
  name: 'prefix',
  description: 'Change the prefix of Ava or find the prefix of Ava!',
  aliases: ['pre'],
  handlesPrefix: true,
  type: 'Settings',
  async execute(client, msg, args, prefixes) {
    if(args.length) {
      await db.set(`prefix_${msg.guild.id}`, args[0].replace("-", " "))
      return msg.channel.send(`Successfully set prefix to \`${args[0].replace("-", " ")}\``)
    }
    let currentPrefix = await db.get(`prefix_${msg.guild.id}`)
    let prefixEmbed = new Discord.MessageEmbed()
    .setTitle(`${msg.guild.name}\'s Prefix: ${currentPrefix == null ? "a!" : currentPrefix}`)
    .setAuthor(`${msg.guild.name} Prefix`, msg.guild.iconURL({ size: 512, dynamic: true }))
    .setThumbnail(msg.guild.iconURL({ size: 512, dynamic: true }))
    .setColor("#8074d2")
    .setDescription(`${Math.random() < 0.26 ? `\n**Tip:** You can use \`-\` (a single dash or multiple dashes if uses like this: \`--\`) to indicate a space in a prefix` : `The prefix used for this command: \`${msg.prefix}`}\``)
    .addFields(
      { name: 'Guild Prefix', value: `${currentPrefix == null ? `There is no guild prefix set for ${msg.guild.name}.\n You can use the global prefix or set one using \`a!prefix <new prefix>\`` : currentPrefix}`, inline: false },
      { name: 'Global Prefix', value: 'a!', inline: false }
    )
    .setFooter(randomFooters[Math.floor(Math.random() * randomFooters.length)])
    .setTimestamp()
    msg.channel.send(prefixEmbed)
  }
}
