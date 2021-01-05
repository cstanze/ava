const { ShardingManager } = require('discord.js')
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
    shard.on('ready', () => { console.log(chalk.blue(`[Shard]`), chalk.green(`[Launched]`), `Sucessfully launched`, chalk.white(`${shard.id}`), `shards.`) })
  }
  shard.on('message', (message) => {
    // let currentShard
    console.log(message)
    if(message.shard && typeof message.shard == 'number') console.log(manager.shards.get(message.shard))
  })
})

manager.spawn(this.totalShards, 9000, 40000)
