const ytdl = require('ytdl-core')
const fs = require('fs')
const { lofi_yt } = require('../config')

module.exports = {
  name: 'lofi',
  description: 'Command for listening to lofi while in a voice channel',
  type: 'Music',
  aliases: ['study'],
  async execute(client, msg, args) {
    return // Under Construction
    if(!(await client.dbl.hasVoted(msg.author.id)) && msg.author.permLevel != 10) {
      msg.channel.send(`Please vote before using this command. It helps the creator so much. Thank you!`)
      return client.commands.get('vote').execute(client, msg, args)
    }
		// Only try to join the sender's voice channel if they are in one themselves
		if (msg.member.voice.channel) {
      let connection = await msg.member.voice.channel.join()
      connection.voice.setSelfDeaf()
			let lfv = lofi_yt[Math.floor(Math.random()*lofi_yt.length)]
			let dispatcher = connection.play(ytdl(lfv, { filter: 'audioonly', liveBuffer: 5000 }));
      dispatcher.on('error', console.log)
      dispatcher.on('debug', console.log)
			dispatcher.on("end", () => { connection.disconnect() })
			msg.channel.send(`Now Playing: ${lfv}`)
      client.dispatcher[`${msg.guild.id}`] = {
        dispatcher,
        connection
      }
		} else {
			msg.channel.send('You need to join a voice channel first!');
		}
  }
}
