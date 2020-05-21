let randomFooters = ["Proudly created in nano", "Puppers!", ":O", "CPU Overheating...", "Quacc", "Welcome Cthulu!", "NYU Tisch", "Widen That Keyhole...", "01000110"]
const Discord = require('discord.js')
let oldChannelName = "Semi-Stable"
let channelName = "Stable"
let versionString = `v2.7.0`

module.exports = {
  name: 'changelog',
  description: 'Ava Changelog',
  type: 'Misc',
  execute(client, msg, args) {
    let changelog = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Changelog')
			.attachFiles(['./AvaIcon.jpg'])
			.setAuthor(`Ava ${versionString} ${channelName}`, 'attachment://AvaIcon.jpg')
			//.setAuthor(msg.member.user.username, msg.member.user.avatarURL({ size: "128", dynamic: true, format: "png" }))
			.setDescription(`Current Ava Version: ${versionString}${channelName}`)
			.addFields(
				{ name: `v1.0.0 ${oldChannelName}`, value: 'First Release!', inline: true },
				{ name: `v1.1.0 ${oldChannelName}`, value: 'Added New Commands!', inline: true },
				{ name: `v1.3.0 ${oldChannelName}`, value: 'Such a big update! Wow such bug fixes', inline: true },
				{ name: `v1.4.0 ${oldChannelName}`, value: 'Added uwuify Command. Added informal changelog', inline: true },
				{ name: `v1.4.3 ${oldChannelName}`, value: 'Changed how the starboard functioned', inline: true },
				{ name: `v1.4.6 ${oldChannelName}`, value: 'Added advanced image/gif support for starboard', inline: true },
				{ name: `v1.5.0 ${oldChannelName}`, value: 'Upgraded to embed changelog.', inline: true },
				{ name: `v1.6.0 ${oldChannelName}`, value: 'Bug fixes. Like alot!', inline: true },
				{ name: `v1.7.0 ${oldChannelName}`, value: 'In a new server!', inline: true },
				{ name: `v1.7.9 ${oldChannelName}`, value: 'Even more bug fixes.', inline: true },
				{ name: `v1.8.0 ${oldChannelName}`, value: 'Added the \"hall-of-sin\" for a custom server!', inline: true },
				{ name: `v1.9.0 ${oldChannelName}`, value: 'Fixed the starboard image/gif support.', inline: true },
        { name: `v2.0.0 ${oldChannelName}`, value: 'Fixed a few other things', inline: true },
        { name: `v2.1.0 ${oldChannelName}`, value: 'New Command System, Much Faster!', inline: true },
        { name: `v2.2.0 ${oldChannelName}`, value: 'Fixed a bunch of things. Added cooldowns', inline: true },
        { name: `v2.3.0 ${oldChannelName}`, value: 'NSFW Commands, New Help Page, etc.', inline: true },
        { name: `v2.4.0 ${oldChannelName}`, value: 'Beta Currency Commands. (No Shopping Yet)', inline: true },
        { name: `v2.5.0 ${channelName}`, value: 'Custom Prefixes and a hell of a lot of bug fixes!', inline: true },
        { name: `v2.6.0 ${channelName} (Previous)`, value: `Fixed an issue where \`${msg.prefix}top\` would crash if less than 10 entries into the leaderboard for a guild`, inline: true },
        { name: `v2.7.0 ${channelName} (Current)`, value: `Added Bot Moderators. They don\'t have specific permissions yet. Soon though. Soon.`, inline: true }
			)
			.setThumbnail('attachment://AvaIcon.jpg')
			.setTimestamp()
			.setFooter(randomFooters[Math.floor(Math.random() * randomFooters.length)], null)
    return msg.author.send(changelog)
      .then(() => {
        if(msg.channel.type == 'dm') return;
        msg.reply('I\'ve sent you a DM with my changelog!')
      })
      .catch(err => {
        console.error(`Could not send help DM to ${msg.author.tag}.\n`, err)
        msg.reply('It seems as though I couldn\'t DM you the changelog. Do you have DMs disabled?')
      })
  }
}
