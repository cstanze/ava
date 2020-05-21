module.exports = {
  name: 'scramble',
  description: 'Scramble the letters of some text',
  type: 'Text',
  execute(client, msg, args) {
    args[0] = args.join(" ")
    if(args[0] == null) {
			args[0] = "You Need Text"
			msg.channel.send(args[0])
			return
		}
		let a = args[0].split(""),
				n = a.length
		for(let i=n-1;i>0;i--) {
			let j = Math.floor(Math.random() * (i + 1))
			let tmp = a[j]
			a[i] = a[j]
			a[j] = tmp
		}
		msg.channel.send(a.join(""))
  }
}
