const Discord = require('discord.js')
const backup = require("discord-backup")

module.exports = {
  name: 'backup',
  cooldown: 10,
  description: `Create server backup.`,
  type: 'Utility',
  permissionsLevel: 'Server Owner',
  args: true,
  usage: '<create/load/view> <backup_id (load and view only)>',
  example: 'load 754996287338265696',
  async execute(client, msg, args) {
    if(!['create', 'load', 'view'].includes(args[0].toLowerCase())) return msg.channel.send(`Please select to either create, load, or view a backup.`)
    if(['load', 'view'].includes(args[0].toLowerCase()) && !args[1]) return msg.channel.send(`To load or view a backup, you need to provide a backup id.`)
    if(args[0] == 'create') {
      const response = await client.awaitReply(msg, `Please type: \`a!confirm\` to confirm that you want to create a backup.`)
      if(response.toLowerCase() != 'a!confirm') return
      let bd = await backup.create(msg.guild, {
        jsonBeautify: true,
        maxMessagesPerChannel: 0
      })
      msg.author.send(`:heavy_check_mark: Successfully saved a backup of **${msg.guild.name}**!`,
                      new Discord.MessageEmbed()
                        .setAuthor(`${msg.guild.name} - Backup ${bd.id}`, msg.guild.iconURL({ dynamic:true, format: 'png' }))
                        .setDescription(`Backup \`${bd.id}\` Saved!`)
                        .addField(`Backup ID`, `\`${bd.id}\``, true)
                        .setFooter(msg.author.tag, msg.author.avatarURL({ dynamic: true, format: 'png' }))
                        .setThumbnail(client.user.avatarURL({ dynamic: true, format: 'png' })))
      .then(() => {
        msg.channel.send(`<@!${msg.author.id}>, I've sent a DM!`)
      })
      .catch(_ => {
  			msg.channel.send(`:warning: Couldn't send DM. The following may contain sensitive server information. Please store this information and delete the message soon after.`).then(mxg => {
  				setTimeout(mxg => {
  					mxg.delete()
  				}, 15e3, mxg)
          msg.channel.send(`:heavy_check_mark: Successfully saved a backup of **${msg.guild.name}**!`,
                        new Discord.MessageEmbed()
                          .setAuthor(`${msg.guild.name} - Backup ${bd.id}`, msg.guild.iconURL({ dynamic:true, format: 'png' }))
                          .setDescription(`Backup \`${bd.id}\` Saved!`)
                          .addField(`Backup ID`, `\`${bd.id}\``, true)
                          .setFooter(msg.author.tag, msg.author.avatarURL({ dynamic: true, format: 'png' }))
                          .setThumbnail(client.user.avatarURL({ dynamic: true, format: 'png' })))
  		  })
      })
    } else if(args[0] == 'load') {
      msg.delete()
      msg.channel.send(`:satellite: Fetching backup. Please wait...`).then(mxg => {
        backup.fetch(args[1])
        .then(async (bi) => {
          mxg.delete()
          msg.channel.send(`Backup Found!`)
          const response = await client.awaitReply(msg, `Please type: \`a!confirm\` to confirm that you want to load this backup. Warning: This will clear all channels, roles, and messages. This backup will also be erased from our servers.`)
          if(response.toLowerCase() != 'a!confirm') return
          backup.load(bi.id, msg.guild).then(() => {
            backup.remove(bi.id)
          })
        })
        .catch((err) => {
          // Log the error just in case
          console.error(err)
          mxg.delete()
          msg.channel.send(`:x: Backup Not Found... Please note that the backup id is **case-sensitive**`)
        })
      })
    } else if(args[0] == 'view') {
      msg.delete()
      msg.channel.send(`:satellite: Fetching backup. Please wait...`).then(mxg => {
        backup.fetch(args[1])
        .then(async (bi) => {
          const date = new Date(bi.data.createdTimestamp).toDateString();
          const guild = await client.guilds.fetch(bi.data.guildID)
          let embed = new Discord.MessageEmbed()
          .setAuthor(`${guild.name} - Backup Information`, guild.iconURL({ dynamic: true, format: 'png' }))
          .addField("Backup ID", bi.id, true)
          .addField("Server ID", bi.data.guildID, true)
          .addField("Size", `${bi.size} mb`, true)
          .addField("Created", formatedDate, true)
          .setColor("#F15152");
        })
        .catch((err) => {
          // Log the error just in case
          console.error(err)
          mxg.delete()
          msg.channel.send(`:x: Backup Not Found... Please note that the backup id is **case-sensitive**`)
        })
      })
    }
  }
}
