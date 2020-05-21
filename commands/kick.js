module.exports = {
  name: 'kick',
  description: 'Mention a user to kick and send the message.',
  type: 'Moderation',
  execute(client, msg, args) {
    if(msg.member.hasPermission("KICK_MEMBERS")) {
			const user = msg.mentions.users.first();
	    if (user) {
	      const member = msg.guild.member(user);
	      if (member) {
	        member
	          .kick('Optional reason that will display in the audit logs')
	          .then(() => {
	            msg.channel.send(`Successfully kicked ${user.tag}`);
	          })
	          .catch(err => {
	            msg.channel.send('I was unable to kick the member');
	            console.error(err);
	          });
	      } else {
	        msg.channel.send("That user isn't in this guild!");
	      }
	    } else {
	      msg.channel.send("You didn't mention the user to kick!");
	    }
		} else {
			msg.channel.send("You don't have kick permissions, silly");
		}
  }
}
