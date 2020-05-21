const randomPuppy = require('random-puppy')
let randomGivers = ["Here you go!", "Here it is!", "I found it!", "Searching...Found it!", "Looking..."]

module.exports = {
  name: 'aww',
  description: 'Gets an image from r/aww',
  execute(client, msg, args) {
    randomPuppy('aww').then(url => {
			msg.channel.send(`${randomGivers[Math.floor(Math.random() * randomGivers.length)]} ${url}`)
		})
  }
}
