const Discord = require('discord.js')
const chalk = require('chalk')
const gKeys = ['mdl', 'mr', 'ar', 'sn', 'wc', 'wm', 'we', 'nxp', 'sc', 'ssc']
const tKeys = {
  modLogChannel: 'mdl',
  modRole: 'mr',
  adminRole: 'ar',
  systemNotice: 'sn',
  welcomeChannel: 'wc',
  welcomeMessage: 'wm',
  welcomeEnabled: 'we',
  noXPChannel: 'nxp',
  starboardChannel: 'sc',
  sinboardChannel: 'ssc'
}

module.exports = {
  name: 'settings',
  description: 'View or change settings for your server',
  type: 'Settings',
  permissionsLevel: 'Server Administrator',
  aliases: ['configure'],
  usage: '<set/get/reset> <key> <value>',
  example: 'edit modrole Mods',
  async execute(client, msg, [action, key, ...value]) {
    console.log(chalk.blue('testl'))
    const settings = msg.settings;
    const defaults = (await client.database.selectFrom('guild', `WHERE guildid = 'default'`)).rows[0]
    let overrides = (await client.database.selectFrom('guild', `WHERE guildid = '${msg.guild.id}'`)).rows[0]
    if(typeof overrides == 'undefined') await client.database.insertInto('guild', gKeys, Object.values(defaults))
    overrides = (await client.database.selectFrom('guild', `WHERE guildid = '${msg.guild.id}'`)).rows[0]

    if(action == 'edit' || action == 'set') {
      if(!key) return msg.channel.send(`Please specify a key to edit`)
      if(!defaults[key]) return msg.channel.send(`The key: \`${key}\` doesn't exist in the settings`)
      const joinedValue = value.join(' ')
      if(joinedValue.length < 1) return msg.channel.send(`You must specify a value to set \`${key}\` to.`)
      if(joinedValue == settings[key]) return msg.channel.send(`The setting: \`${key}\` is already set to: \`${joinedValue}\``)
      let mergedValues = { ...defaults }
      mergedValues[key] = joinedValue
      await client.database.upsertInto('guild', gKeys, Object.values(mergedValues), key, `${key} = '${joinedValue}'`)
      return msg.channel.send(`${msg.member.nickname || msg.member.user.username}, I've changed \`${key}\` to: \`${joinedValue}\``)
    } else if(action == 'del' || action == 'reset') {
      if(!key) return msg.channel.send(`Please specify a key to reset`)
      if(!defaults[key]) return msg.channel.send(`The key: \`${key}\` doesn't exist in the settings`)
      if(!overrides[key]) return msg.channel.send(`This key doesn't to appear to have an override. The default was used: \`${defaults[key]}\``)
      const response = await client.awaitReply(msg, `Are you sure you want to reset ${key} to the default value? (yes/no)`)

      if(['y', 'yes'].includes(response.toLowerCase())) {
        client.database.updateRow('guild', [`'${key}' = '${defaults[key]}'`], [`guildid = '${msg.guild.id}'`])
        msg.channel.send(`\`${key}\` was successfully reset to default value of: ${defaults[key]}`)
      } else if(['no', 'n', 'cancel'].includes(response.toLowerCase())) {
        msg.channel.send(`\`${key}\` remains unchanged.`)
      } else {
        msg.channel.send(`\`${response}\` is not a valid response. Try doing \`no\` or \`cancel\` if you would like to cancel resetting the value.`)
      }
    } else if(action == 'get') {
      if(!key) return msg.channel.send(`Please specify a key to reset`)
      if(!defaults[key]) return msg.channel.send(`The key: \`${key}\` doesn't exist in the settings`)
      const isDefault = overrides[key] == defaults[key] ? `\nThis the global default value.` : ``
      msg.channel.send(`Settings value for \`${key}\`: \`${settings[key]}\`${isDefault}`)
    } else {
      console.log(chalk.blue('testm'))
      let settingsDetails = new Discord.MessageEmbed()
        .setFooter(client.randomFooters[Math.floor(Math.random() * client.randomFooters.length)])
        .setColor("#8074d2")
        .setTitle(`Settings for: ${msg.guild.name}`)
        .setAuthor(`${msg.guild.name}'s Settings`, msg.guild.iconURL({ size: 512, dynamic: true }))
        .setTimestamp()
      let desc = '\`\`\`asciidoc\n'
      let guildSettings = []
      console.log(chalk.blue('testn'))
      Object.entries(settings).forEach(([key, value]) => {
        guildSettings.push(`${key}${' '.repeat(20 - key.length)}:: ${value}`)
      })
      console.log(chalk.blue('testo'))
      desc += guildSettings.join('\n')
      desc += '\n\`\`\`'
      settingsDetails.setDescription(desc == '' ? 'No Settings Found' : desc)
      msg.channel.send(settingsDetails)
    }
  }
}
