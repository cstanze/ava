module.exports = {
  name: 'addrole',
  description: 'Adds a mentioned role to the mentioned user',
  type: 'Moderation',
  permissionsLevel: 'Server Moderator',
  execute(client, msg, args) {
    if(msg.member.hasPermission("MANAGE_ROLES") || msg.member.user.id == "334067823229796367") {
			let role = msg.mentions.roles.array()[0]
			let member = msg.mentions.members.array()[0]
			if(!role) {
				msg.channel.send("You need to mention a role!")
				return;
			}
			if(!member) {
					msg.channel.send("You need to mention a person!")
					return;
			}
			member.roles.add(role)
			msg.channel.send(`Added Role: ${role.name} to member: ${member.nickname ? member.nickname : member.user.username}`)
		} else {
			msg.channel.send("You don't have role permissions, silly");
		}
  }
}
