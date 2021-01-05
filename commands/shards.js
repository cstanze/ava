module.exports = {
  name: 'shards',
  description: 'Get information on the shards Ava runs!',
  type: 'Utility',
  async execute(client, msg, args) {
    try {
      if(!(client.shard.count > 20)) {
        const idSizeArray = (await client.shard.broadcastEval('[this.ws.status, this.shard.ids[0], this.guilds.cache.size, this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0), this.guilds.cache.reduce((acc, guild) => acc + guild.shard.ping, 0)]')).filter(c => c[1] <= 20).map(s => [statusMeta(s[0]), s[1], s[2], s[3], s[4]])
        // const _longestMeta = idSizeArray.reduce((acc, meta) => meta[0].idSpacing > acc ? meta[0].idSpacing : acc, 0)
        // const longestMeta = idSizeArray.find(m => m[0].idSpacing == _longestMeta)
        // console.log(_longestMeta)
        // console.log(longestMeta)
        const tableHeader =    `Shard|Guilds |Users   |Status${' '.repeat(0)}|Ping  \n`
        const tableHeaderSep = `-----+-------+--------+------${'-'.repeat(0)}+------\n`
        let tableBody = ''
        for(const [ws_status, id, size, usize, gping] of idSizeArray) {
          let tableRow = `${' '.repeat((5-id.toString().length) - (id == client.shard.ids[0] ? 1 : 0))}${client.shard.ids[0] == id ? '>' : ''}${id}|`
          tableRow += `${size}${' '.repeat(7-size.toString().length)}|`
          tableRow += `${usize}${' '.repeat(8-usize.toString().length)}|`
          tableRow += `READY${' '.repeat(1)}|` // TODO: Finish this...
          tableRow += `${gping/size}ms`
          tableBody += `${tableRow}\n`
        }
        msg.channel.send(client.code('', `${tableHeader}${tableHeaderSep}${tableBody}`))
      }
    } catch (e) {
      if(e.toString().includes("Shards are still being spawned")) {
        msg.channel.send("Sorry, shards are still being spawned... please wait.")
      } else {
        throw e
      }
    }
  }
}

statusMeta = s => {
  const statusStr = {
    0: 'READY',
    1: 'CONNECTING',
    2: 'RECONNECTING',
    3: 'IDLE',
    4: 'NEARLY',
    5: 'DISCONNECTED',
    6: 'WAITING_FOR_GUILDS',
    7: 'IDENTIFYING',
    8: 'RESUMING',
    9: 'UNKNOWN'
  }[isNaN(Number(s)) ? 9 : Number(s)]
  return {
    statusStr,
    idSpacing: statusStr.length,
    metaSpacingWithLength: l => l - statusStr.length,
  }
}
