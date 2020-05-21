const randomPuppy = require('random-puppy')
let randomGivers = ["Here you go!", "Here it is!", "I found it!", "Searching...Found it!", "Looking..."]

module.exports = {
  name: 'dog',
  description: 'Gets an image from r/puppies',
  type: 'Image',
  execute(client, msg, args) {
    randomPuppy().then(url => {
			msg.channel.send(`${randomGivers[Math.floor(Math.random() * randomGivers.length)]} ${url}`)
		})
  }
}
