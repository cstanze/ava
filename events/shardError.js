module.exports = (c, e) => {
  console.log(`Shard Error on Shard ${c.shard.ids[0]}: `, e)
}