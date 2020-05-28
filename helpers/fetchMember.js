exports.fetchUserWithId = (client, userId) => {
  return client.users.fetch(userId).then(usr => {return usr})
}


exports.fetchMemberWithId = (guild, userId) => {
  return guild.members.fetch(userId).then(mbr => {return mbr})
}
