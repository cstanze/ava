const Long = require("long")
exports.getDefaultChannel = (guild) => {
  if(guild.channels.cache.has(guild.id))
    return guild.channels.cache.get(guild.id)

  let generalChannel = guild.channels.cache.find(channel => channel.name == "general")
  if(generalChannel)
    return generalChannel
  generalChannel = guild.channels.cache.find(channel => channel.name == "global-chat")
  if(generalChannel)
    return generalChannel
  generalChannel = guild.channels.cache.find(channel => channel.name == "world-chat")
  if(generalChannel)
    return generalChannel
  return guild.channels.cache.first()
}
