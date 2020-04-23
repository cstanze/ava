exports.fetchMemberWithId = (guild, userId) => {
  return guild.members.fetch(userId).then(mem => {return mem})
};
