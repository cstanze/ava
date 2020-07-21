module.exports = {
  name: 'say',
  description: 'Do you have something to say?',
  type: 'Text',
  async execute(client, msg, args) {
    let chan = msg.channel
    if(args[0] == null) {
      let remarks = [`I don\'t know what to say...`, `Uhh... Line?`, `*Psst. Hey. Pssstt! Hey! What do I say again?*`, `I just completely blanked on what to say.`, `Wow. I just lost my train of thought`, `I'm speechless my friend.`, `No, I'm not mute. I just forgot what I was going to say.`, `What was I going to say again?`]
			chan.createWebhook(`${msg.member.nickname ? msg.member.nickname : msg.author.username}`, { avatar: msg.member.user.avatarURL({ size: 512, dynamic: true }) }).then(async wh => {
        await wh.send(remarks[Math.floor(Math.random() * remarks.length)])
        wh.delete()
      })
			return
		}
    chan.createWebhook(`${msg.member.nickname ? msg.member.nickname : msg.author.username}`, { avatar: msg.member.user.avatarURL({ size: 512, dynamic: true }) }).then(async wh => {
      await wh.send(args.join(" ").replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0').replace('https://', 'https:/').replace('http://', 'http:/'))
      wh.delete()
    })
  }
}
