module.exports = async (client, debugInfo) => {
  return
  console.log(chalk.blue(`[Ava][Shard ${client.shard.ids[0]}]`),chalk.yellow(`[Debug]`), debugInfo)
}
