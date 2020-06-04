const Discord = require('discord.js')
const fetch = require('node-fetch')
let oldChannelName = "Semi-Stable"
let channelName = "Stable"
let versionString = `v3.2.0`

module.exports = {
  name: 'changelog',
  description: 'Ava Changelog',
  type: 'Misc',
  async execute(client, msg, args) {
    let changes = await fetch(`https://gist.githubusercontent.com/Julz4455/ef5b7457e61d29621a75db1c19757580/raw/15e443df00c5ba6b01a884d8d5ba3230d64caf42/ava-changelog.json`)
    changes = await changes.json()
    changes = changes.versions
    let changelog = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Changelog')
			.attachFiles(['./AvaIcon.jpg'])
			.setAuthor(`Ava ${versionString} ${channelName}`, 'attachment://AvaIcon.jpg')
			//.setAuthor(msg.member.user.username, msg.member.user.avatarURL({ size: "128", dynamic: true, format: "png" }))
			.setDescription(`Current Ava Version: ${versionString} ${channelName}`)
			.setThumbnail('attachment://AvaIcon.jpg')
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
