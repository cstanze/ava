exports.fetchMemberWithId = (guild, userId) => {
  return guild.members.fetch(userId).then(mbr => {return mbr})
}
