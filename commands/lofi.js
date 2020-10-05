const ytdl = require('ytdl-core')
const fs = require('fs')
const { lofi_yt } = require('../config')

module.exports = {
  name: 'lofi',
  description: 'Command for listening to lofi while in a voice channel',
  type: 'Music',
  aliases: ['study'],
  async execute(client, msg, args) {
    if(!(await client.dbl.hasVoted(msg.author.id))) {
      msg.channel.send(`Please vote before using this command. It helps the creator so much. Thank you!`)
      client.commands.get('vote').execute(client, msg, args)
    }
		// Only try to join the sender's voice channel if they are in one themselves
		if (msg.member.voice.channel) {
      let connection = await msg.member.voice.channel.join()
			let lfv = lofi_yt[Math.floor(Math.random()*lofi_yt.length)]
			let dispatcher = connection.play(ytdl(lfv, { filter: 'audioonly', liveBuffer: 5000 }));
			dispatcher.on("end", () => { connection.disconnect() })
			msg.channel.send(`Now Playing: ${video}`)
      client.dispatcher[`${msg.guild.id}`] = dispatcher
		} else {
			msg.channel.send('You need to join a voice channel first!');
		}
  }
}
