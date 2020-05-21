module.exports = {
  name: 'removerole',
  description: 'Removes the mentioned role from a user',
  type: 'Moderation',
  execute(client, msg, args) {
    if(msg.member.hasPermission("MANAGE_ROLES") || msg.member.user.id == '334067823229796367') {
			let role = msg.mentions.roles.first()
			let member = msg.mentions.members.first()
			if(!role) {
				msg.channel.send("You need to mention a role!")
				return;
			}
			if(!member) {
					msg.channel.send("You need to mention a person!")
					return;
			}
			member.roles.remove(role)
			msg.channel.send(`Removed Role: ${role.name} from member: ${member.nickname ? member.nickname : member.user.username}`)
		} else {
			msg.channel.send("You don't have role permissions, silly");
		}
  }
}
