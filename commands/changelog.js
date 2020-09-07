const Discord = require('discord.js')
const fetch = require('node-fetch')
let oldChannelName = "Semi-Stable"
let channelName = "Stable"
let versionString = `v3.6.0`

module.exports = {
  name: 'changelog',
  description: 'Ava Changelog',
  type: 'Misc',
  async execute(client, msg, args) {
    return msg.channel.send('This command is disabled until further notice.')
    let changes = await fetch(`https://gist.githubusercontent.com/Julz4455/ef5b7457e61d29621a75db1c19757580/raw/f138c2a74cd22d8eb08faba487c3048f8a928039/ava-changelog.json`)
    changes = await changes.json()
    changes = changes.versions
    let changelog = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Changelog')
			.setAuthor(`Ava ${versionString} ${channelName}`, client.user.avatarURL({ size: 128, dynamic: true, format: "png" }))
			//.setAuthor(msg.member.user.username, msg.member.user.avatarURL({ size: "128", dynamic: true, format: "png" }))
			.setDescription(`Current Ava Version: ${versionString} ${channelName}`)
			.setThumbnail(client.user.avatarURL({ size: 512, dynamic: true, format: "png" }))
			.setTimestamp()
			.setFooter(client.randomFooters[Math.floor(Math.random() * client.randomFooters.length)], null)
    changes.forEach(change => {
      change.name = change.name.replace('<ocn>', oldChannelName).replace('<cn>', channelName).replace('[', '\`').replace(']', '\`').replace('<prefix>', msg.prefix)
      change.value = change.value.replace('[', '\`').replace(']', '\`').replace('<prefix>', msg.prefix)
      changelog.addField(change.name, change.value, true)
    })
    return msg.author.send(changelog)
      .then(() => {
        if(msg.channel.type == 'dm') return;
        msg.reply('I\'ve sent you a DM with my changelog!')
      })
      .catch(err => {
        console.error(`Could not send changelog DM to ${msg.author.tag}.\n`, err)
        msg.reply('It seems as though I couldn\'t DM you the changelog. Do you have DMs disabled?')
      })
  }
}
