const Discord = require('discord.js')

module.exports = {
  name: 'lofivolume',
  description: 'Command for changing the volume of the lofi currently playing.',
  type: 'Music',
  args: true,
  usage: '<volume>',
  cooldown: 10,
  aliases: ['volume'],
  execute(client, msg, args) {
    if(!client.dispatcher[`${msg.guild.id}`]) return msg.channel.send(`Hmm... Looks like you\'re not playing anything.\nTry using \`${msg.prefix}lofi\` before changing the volume.`)
    if(isNaN(Number(args[0]))) return msg.channel.send(`Looks like the volume you sent isn't a number.\nTry using this command with a number instead.`)
    client.dispatcher[`${msg.guild.id}`].setVolumeLogarithmic(Number(args[0]))
    msg.channel.send(`Successfully set the volume to ${Number(args[0])}%`)
  }
}
