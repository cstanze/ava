let randomFooters = ["Proudly created in nano", "Puppers!", ":O", "CPU Overheating...", "Quacc", "Welcome Cthulu!", "NYU Tisch", "Widen That Keyhole...", "01000110"]
const Discord = require('discord.js')
const fetch = require('node-fetch')
const fs = require('fs')
const util = require('util')
const streamPipeline = util.promisify(require('stream').pipeline)
const db = require('quick.db')

module.exports = {
  name: 'profile',
  description: 'Tim Cook draws you on his iPad',
  type: 'User',
  async execute(client, msg, args) {
    const target = msg.mentions.members.first() || msg.member
    msg.channel.send(`Getting and organizing profile information for: \`${target.nickname || target.user.username}\`...`).then(async mxg => {
      const ship = "No Ship Found"
      const xp = await db.get(`user_${msg.guild.id}_${target.user.id}.xp`)
      let image = await fetch(`http://localhost:65535/api/profile?avatar1=${encodeURI(target.user.avatarURL({ size: 512, dynamic: false }))}&username1=${encodeURI(target.nickname || msg.author.username)}&title=${encodeURI(client.config.permLevels.find(l => l.level == msg.author.permLevel).name)}&ship=${ship}&permslevel=${encodeURI(typeof client.config.permLevels.find(l => l.level == target.user.permLevel).name != 'undefined' ? client.config.permLevels.find(l => l.level == target.user.permLevel).name : 'Permissions Not Available')}&permsraw=${target.user.permLevel == 0 ? 1 : target.user.permLevel}&guildname=${encodeURI(msg.guild.name)}&prefix=${encodeURI(msg.prefix)}&totalxp=${encodeURI(xp)}&xp=${encodeURI(xp)}&eris=${encodeURI(await db.get(`user_${msg.guild.id}_${target.user.id}.bal`))}&color=gay`)
      if(image.ok) {
        await streamPipeline(image.body, fs.createWriteStream('./tmp.png'))
      } else {
        mxg.delete()
        console.log(image)
        console.log(await image.json())
        return msg.channel.send(`Something went wrong. Try again later?`)
      }
      let embed = new Discord.MessageEmbed()
  		.setColor('#8074d2')
      .attachFiles(['./tmp.png'])
  		.setImage(`attachment://tmp.png`)
  		.setTimestamp()
  		.setFooter(randomFooters[Math.floor(Math.random() * randomFooters.length)], null)
  		await msg.channel.send(embed)
      mxg.delete()
    })
  }
}
