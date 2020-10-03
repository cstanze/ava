module.exports = {
  name: 'shards',
  description: 'Get information on the shards Ava runs!',
  type: 'Utility',
  async execute(client, msg, args) {
    if(!(client.shard.count > 20)) {
      const idSizeArray = (await client.shard.broadcastEval('[this.shard.ids[0], this.guilds.cache.size, this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0), this.guilds.cache.reduce((acc, guild) => acc + guild.shard.ping, 0)]')).filter(c => c[0] <= 20)
      const tableHeader = `Shard|Guilds |Users   |Status|Ping  \n`
      const tableHeaderSep = `-----+-------+--------+------+------\n`
      let tableBody = ''
      for(const [id, size, usize, gping] of idSizeArray) {
        let tableRow = `${' '.repeat((5-id.toString().length)-(id == client.shard.ids[0] ? 1 : 0))}${client.shard.ids[0] == id ? '>' : ''}${id}|`
        tableRow += `${size}${' '.repeat(7-size.toString().length)}|`
        tableRow += `${usize}${' '.repeat(8-usize.toString().length)}|`
        tableRow += `READY |` // TODO: Add Status Indicator
        tableRow += `${gping/size}ms`
        tableBody += `${tableRow}\n`
      }
      msg.channel.send(client.code('', tableHeader+tableHeaderSep+tableBody))
    }
  }
}
