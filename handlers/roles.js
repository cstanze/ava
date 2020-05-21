exports.roleInGuildWithName = (guild, name) => {
  return guild.roles.cache.find(r => r.name == name)
}

exports.roleInGuildWithId = (guild, id) => {
  return guild.roles.cache.find(r => r.id == id)
}
