const ytdl = require('ytdl-core');

module.exports = {
  name: 'lofi',
  description: 'Command for listening to lofi while in a voice channel',
  type: 'Music',
  async execute(client, msg, args) {
		// Only try to join the sender's voice channel if they are in one themselves
		if (msg.member.voice.channel) {
			msg.member.voice.channel.members.each(mbr => {
				if(mbr.client == client) return;
				mbr.voice.setMute(true).catch(console.error)
			})
			let livePre = "WARNING: Lofi Live Streams Might Have Issues\n"
			if(args[0] && args[0].toLowerCase() == "chilledcow") {
				let randomCow = ["https://www.youtube.com/watch?v=QCvi-tBaEfA", "https://www.youtube.com/watch?v=DWcJFNfaw9c", "https://www.youtube.com/watch?v=5qap5aO4i9A", "https://www.youtube.com/watch?v=-FlxM_0S2lA", "https://www.youtube.com/watch?v=lTRiuFIWV54"]
				let cowNumber = Math.floor(Math.random()*randomCow.length)
				let cowVideo = randomCow[cowNumber]
				let liveBufferAmount = (cowNumber == 2 || cowNumber == 3) ? 3000000 : 2000
				let dispatcher = connection.play(ytdl(cowVideo, { filter: 'audioonly', liveBuffer: liveBufferAmount }));
				dispatcher.on("end", () => { connection.disconnect() })
				msg.channel.send(livePre+cowVideo)
			} else if(!args[0]) {
				msg.channel.send("You need to include one of the following lofi channels:")
				msg.channel.send("`chilledcow` `monstafluff` `wp-farm`")
				return;
			} else if(args[0] && args[0].toLowerCase() == "monstafluff") {
				let dispatcher = connection.play(ytdl("https://www.youtube.com/watch?v=pH3xU1YcjaA", {filter:'audioonly', liveBuffer: 3000000}))
				dispatcher.on("end", () => { connection.disconnect() })
				msg.channel.send(livePre+"https://www.youtube.com/watch?v=pH3xU1YcjaA")
			} else if(args[0] && args[0].toLowerCase() == "wp-farm") {
				let dispatcher = connection.play(ytdl('https://www.youtube.com/watch?v=TDcb68Ve97w', {filter:'audioonly', liveBuffer: 3000000}))
				dispatcher.on("end", () => { connection.disconnect() })
				msg.channel.send(livePre+'https://www.youtube.com/watch?v=TDcb68Ve97w')
			} else {
				msg.channel.send("You need to include one of the following lofi channels (We Recommend To Copy And Paste):")
				msg.channel.send("`chilledcow` `monstafluff` `wp-farm`")
			}
		} else {
			msg.channel.send('You need to join a voice channel first!');
		}
  }
}
