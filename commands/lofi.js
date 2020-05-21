const ytdl = require('ytdl-core');

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
			let randomVideo = ['https://www.youtube.com/watch?v=4X_uoKF2Wvo', 'https://www.youtube.com/watch?v=wAPCSnAhhC8', 'https://www.youtube.com/watch?v=ITRiuFIWV54', 'https://www.youtube.com/watch?v=5xRuk6SW-sg', 'https://www.youtube.com/watch?v=ivNIpLdzh7M']
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
