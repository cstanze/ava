const fs = require('fs')
const chalk = require('chalk')

module.exports = {
  name: 'reload_event',
  description: 'Fetches & Reloads a new event file',
  type: 'Private',
  aliases: ['revent'],
  permissionsLevel: 'Bot Owner',
  async execute(client, msg, args) {
    if(!args.length) return msg.channel.send(`You didn't pass any event to reload, ${msg.author}`)
    msg.channel.send(`Reloading the following events: \`${args.join(' ')}\``).then(async mxg => {
      const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))
      mxg.delete()
      for(const arg of args) {
        for(const ev of eventFiles) {
          try {
            const evName = ev.split('.')[0]
            if(evName.toLowerCase() == arg.toLowerCase()) {
              delete require.cache[require.resolve(`../events/${ev}`)]
              const evx = require(`../events/${ev}`)
              client.on(evName, evx.bind(null, client))
              mxg.channel.send(`Event \`${evName}\` was reloaded`)
              console.log(chalk.blue('[Ava]'), chalk.yellow(`[Event]`), chalk.white(`[Reload]`), chalk.green(`[Success]`), evName)
            }
          } catch (e) {
            console.log(e)
            msg.channel.send(`Error while reloading \`${ev.split('.')[0]}\`:`)
            msg.channel.send(`\`\`\`\n${e.toString()}\`\`\``)
          }
        }
      }
    })
  }
}

/*
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))
console.log(chalk.blue('[Ava]'), chalk.yellow(`[Event] [Load]`), `Loading a total of ${eventFiles.length} events`)
for(const ev of eventFiles) {
	const eventName = ev.split('.')[0]
	console.log(chalk.blue(`[Ava]`), chalk.yellow(`[Event]`), chalk.white(`[Loading]`), `Loading event with name: ${eventName}`)
	const evx = require(`./events/${ev}`)
	client.on(eventName, evx.bind(null, client))
	console.log(ev.split('.')[0])
	client.events.set(ev.split('.')[0].toLowerCase(), evx)
}
*/
