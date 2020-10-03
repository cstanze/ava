const { ShardingManager } = require('discord.js')
const config = require('./config.json')
const chalk = require('chalk')
const manager = new ShardingManager('./app.js', {
  token: config.token,
  totalShards: 'auto',
  respawn: true,
  mode: "process"
})
const exec = require('child_process').execSync

manager.spawn(this.totalShards, 9000, 40000)
manager.on('shardCreate', shard => {
  console.log(chalk.blue(`[Shard]`), chalk.green(`[Launch]`),`Launched Shard With ID:`, chalk.green(`${shard.id}`))
  if(shard.manager.totalShards == shard.id + 1) {
    shard.on('ready', () => {
      exec(`curl -X POST -H "Content-Type: application/json" -d '{"value1": "Ava is now online and ready to go!"}' https://maker.ifttt.com/trigger/ava_event/with/key/fv1KMm9l07e3vmqr183BeJ7t_c7rPLwDtQqR4gK-9Db`)
    })
  }
})
manager.on('message', (shard, message) => {
	console.log(`Shard[${shard.id}] : ${message._eval} : ${message._result}`);
})
