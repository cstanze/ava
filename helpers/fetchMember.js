exports.fetchUserWithId = (client, userId) => {
  return client.users.fetch(userId).then(usr => {return usr})
};
