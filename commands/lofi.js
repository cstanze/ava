const ytdl = require('ytdl-core');
const fs = require('fs')

module.exports = {
  name: 'lofi',
  description: 'Command for listening to lofi while in a voice channel',
  type: 'Music',
  aliases: ['study'],
  async execute(client, msg, args) {
		// Only try to join the sender's voice channel if they are in one themselves
		if (msg.member.voice.channel) {
			msg.member.voice.channel.members.each(mbr => {
        if(mbr.user == client.user) return
				mbr.voice.setMute(true).catch(console.error)
			})
      let connection = await msg.member.voice.channel.join()
			let randomVideo = await fs.readFileSync('./lofi-videos.txt').toString().split('\n')
			let randomNumber = Math.floor(Math.random()*randomVideo.length)
			let video = randomVideo[randomNumber]
			let dispatcher = connection.play(ytdl(video, { filter: 'audioonly', liveBuffer: 5000 }));
			dispatcher.on("end", () => { connection.disconnect() })
			msg.channel.send(`Now Playing: ${video}`)
      client.dispatcher = dispatcher
		} else {
			msg.channel.send('You need to join a voice channel first!');
		}
  }
}
