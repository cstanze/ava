const randomPuppy = require('random-puppy')
let randomGivers = ["Here you go!", "Here it is!", "I found it!", "Searching...Found it!", "Looking..."]

module.exports = {
  name: 'kitten',
  description: 'Gets a random image of a kitten',
  type: 'Image',
  execute(client, msg, args) {
    randomPuppy('kitten').then(url => {
			msg.channel.send(`${randomGivers[Math.floor(Math.random() * randomGivers.length)]} ${url}`)
		})
  }
}
