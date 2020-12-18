const { ShardingManager } = require('discord.js')
const { ClusterManager } = require('./util/ClusterManager')
const config = require('./config.json')
const chalk = require('chalk')
const manager = new ShardingManager('./app.js', {
  token: config.token,
  totalShards: 4,
  respawn: true,
  mode: "process"
})
const exec = require('child_process').execSync

// These handlers are safe here
manager.on('shardCreate', shard => {
  console.log(chalk.blue(`[Shard]`), chalk.green(`[Launch]`),`Launched Shard With ID:`, chalk.green(`${shard.id}`))
  if(shard.manager.totalShards == shard.id + 1) {
    shard.on('ready', () => {
      exec(`curl -X POST -H "Content-Type: application/json" -d '{"value1": "Ava is now online and ready to go!"}' https://maker.ifttt.com/trigger/ava_event/with/key/fv1KMm9l07e3vmqr183BeJ7t_c7rPLwDtQqR4gK-9Db`)
    })
  }
  shard.on('message', (message) => {
    const shard = manager.shards.get(message.shard)
    switch(message.type) {
      case 'respawn':
        console.log(chalk.cyan(`Shard[${shard.id}]`), chalk.yellow(`Respawning...`))
        shard.respawn(9000, 40000)
        break
      case 'kill':
        console.log(chalk.cyan(`Shard[${shard.id}]`), chalk.hex(`#fc2d1e`)(`Killing...`))
    }
  })
})

manager.spawn(this.totalShards, 9000, 40000)
