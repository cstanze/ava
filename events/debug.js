const chalk = require('chalk')

module.exports = async (client, debugInfo) => {
  if(!process.env.DEBUG) return
  console.log(chalk.blue(`[Ava][Shard ${client.shard.ids[0]}]`),chalk.yellow(`[Debug]`), debugInfo)
}
