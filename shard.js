const { ShardingManager } = require('discord.js')
const config = require('./config.json')
const manager = new ShardingManager('./app.js', { token: config.token, totalShards: 'auto', respawn: true, mode: "process" })

manager.spawn(this.totalShards, 11000, 3000000)
manager.on('shardCreate', shard => {
  console.log(`[Shard][Launch] Launched Shard With ID: ${shard.id}`)
})
