const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'level',
  description: 'Find out the level of your user profile for your guild.',
  type: 'User',
  cooldown: 5,
  usage: '@<guild member> (Optional)',
  aliases: ['rank'],
  async execute(client, msg, args) {
    const target = msg.mentions.members.first() || msg.member
    const xp = await db.get(`user_${msg.guild.id}_${msg.author.id}.xp`)
    const level = Math.floor(xp / 200)
    let money = await db.startsWith(`user_${msg.guild.id}`).sort((u1, u2) => u2.data.xp - u1.data.xp)
    let content = ""
    for(let i=0;i<(money.length < 10 ? money.length : 10);i++) {
      if(typeof money[i].data.xp == 'undefined') continue
      let user = await msg.guild.members.fetch(money[i].ID.split('_')[2])
      content += `**${i+1}.**   ${typeof user.nickname == "string" ? user.nickname : user.user.username} ~\\~ Level ${Math.floor(money[i].data.xp.toFixed(0) / 200)}\n`
    }
    const longest = content.split('\n').sort((l1, l2) => l2.length - l1.length)[0].length
    for(let i=0;i<money.length;i++) {
      let userId = money[i].ID.split('_')[2]
      if(userId == target.id) {
        let user = await msg.guild.members.fetch(userId)
        content += `${'-'.repeat(longest)}\n_**${i+1}. ${user.displayName} ~\\~ Level ${Math.floor(money[i].data.xp.toFixed(0) / 200)}**_`
      }
    }
    const topEmbed = new Discord.MessageEmbed()
    .setAuthor(`${msg.guild.name} - Rankings`, msg.guild.iconURL({ size: 512, dynamic: true }))
    .setDescription(content == "" ? `Hmm... There seems to be no leaderboard stats for this guild.\nStart gaining XP by messaging!` : content)
    .setColor('#8074d2')
    .setFooter(client.randomFooters[Math.floor(Math.random() * client.randomFooters.length)])
    .setTimestamp()
    msg.channel.send(topEmbed)
  }
}
