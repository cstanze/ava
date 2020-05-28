const { ShardingManager } = require('discord.js')
const config = require('./config.json')
const chalk = require('chalk')
const manager = new ShardingManager('./app.js', { token: config.token, totalShards: 'auto', respawn: true, mode: "process" })

manager.spawn(this.totalShards, 9000, 40000)
manager.on('shardCreate', shard => {
  console.log(chalk.blue(`[Shard]`), chalk.green(`[Launch]`),`Launched Shard With ID:`, chalk.green(`${shard.id}`))
})
