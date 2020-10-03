const Discord = require('discord.js')
const chalk = require('chalk')
const gKeys = ['guildid', 'mdl', 'mr', 'ar', 'sn', 'wc', 'wm', 'we', 'nxp', 'sc', 'ssc', 'avc']
const tKeys = {
  mdl: 'modLogChannel',
  mr: 'modRole',
  ar: 'adminRole',
  sn: 'systemNotice',
  wc: 'welcomeChannel',
  wm: 'welcomeMessage',
  we: 'welcomeEnabled',
  nxp: 'noXPChannel',
  sc: 'starboardChannel',
  ssc: 'sinboardChannel',
  avc: 'autoVoiceChannel'
}
const oKeys = {
  modLogChannel: 'mdl',
  modRole: 'mr',
  adminRole: 'ar',
  systemNotice: 'sn',
  welcomeChannel: 'wc',
  welcomeMessage: 'wm',
  welcomeEnabled: 'we',
  noXPChannel: 'nxp',
  starboardChannel: 'sc',
  sinboardChannel: 'ssc',
  autoVoiceChannel: 'avc'
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
    const settings = msg.settings;
    const defaults = (await client.database.selectFrom('guild', `WHERE guildid = 'default'`)).rows[0]
    let overrides = (await client.database.selectFrom('guild', `WHERE guildid = '${msg.guild.id}'`)).rows[0]
    let overrideDefaultSettings = defaults
    overrideDefaultSettings.guildid = msg.guild.id
    overrideDefaultSettings = Object.values(overrideDefaultSettings)
    overrideDefaultSettings.shift()
    if(typeof overrides == 'undefined') await client.database.insertInto('guild', gKeys, overrideDefaultSettings)
    overrides = (await client.database.selectFrom('guild', `WHERE guildid = '${msg.guild.id}'`)).rows[0]

    if(action == 'edit' || action == 'set') {
      if(!key) return msg.channel.send(`Please specify a key to edit`)
      if(!defaults[oKeys[key]]) return msg.channel.send(`The key: \`${key}\` doesn't exist in the settings. Please check the key, they are case-senstitive`)
      const joinedValue = value.join(' ')
      if(joinedValue.length < 1) return msg.channel.send(`You must specify a value to set \`${key}\` to.`)
      if(joinedValue == settings[oKeys[key]]) return msg.channel.send(`The setting: \`${key}\` is already set to: \`${joinedValue}\``)
      await client.database.updateRow('guild', [`${oKeys[key]} = '${joinedValue}'`], [`guildid = '${msg.guild.id}'`])
      return msg.channel.send(`${msg.member.nickname || msg.member.user.username}, I've changed \`${key}\` to: \`${joinedValue}\``)
    } else if(action == 'del' || action == 'reset') {
      if(!key) return msg.channel.send(`Please specify a key to reset`)
      if(!defaults[oKeys[key]]) return msg.channel.send(`The key: \`${key}\` doesn't exist in the settings. Please check the key, they are case-senstitive`)
      if(overrides[oKeys[key]] == defaults[oKeys[key]]) return msg.channel.send(`This key doesn't to appear to have an override. The default was used: \`${defaults[key]}\``)
      const response = await client.awaitReply(msg, `Are you sure you want to reset ${key} to the default value? (yes/no)`)

      if(['y', 'yes'].includes(response.toLowerCase())) {
        client.database.updateRow('guild', [`${oKeys[key]} = '${defaults[oKeys[key]]}'`], [`guildid = '${msg.guild.id}'`])
        msg.channel.send(`\`${key}\` was successfully reset to default value of: ${defaults[oKeys[key]]}`)
      } else if(['no', 'n', 'cancel'].includes(response.toLowerCase())) {
        msg.channel.send(`\`${key}\` remains unchanged.`)
      } else {
        msg.channel.send(`\`${response}\` is not a valid response. Try doing \`no\` or \`cancel\` if you would like to cancel resetting the value.`)
      }
    } else if(action == 'get') {
      if(!key) return msg.channel.send(`Please specify a key to get`)
      if(!defaults[oKeys[key]]) return msg.channel.send(`The key: \`${key}\` doesn't exist in the settings. Please check the key, they are case-senstitive`)
      const isDefault = overrides[oKeys[key]] == defaults[oKeys[key]] ? `\nThis the global default value.` : ``
      msg.channel.send(`Settings value for \`${key}\`: \`${settings[oKeys[key]]}\`${isDefault}`)
    } else {
      let settingsDetails = new Discord.MessageEmbed()
        .setFooter(client.randomFooters[Math.floor(Math.random() * client.randomFooters.length)])
        .setColor("#8074d2")
        .setTitle(`Settings for: ${msg.guild.name}`)
        .setAuthor(`${msg.guild.name}'s Settings`, msg.guild.iconURL({ size: 512, dynamic: true }))
        .setTimestamp()
      let desc = '\`\`\`asciidoc\n'
      let guildSettings = []
      Object.entries(overrides).forEach(([key, value]) => {
        if(key == 'id' || key == 'guildid') return
        guildSettings.push(`${tKeys[key]}${' '.repeat(20 - tKeys[key].length)}:: ${value.substring(0, 27)+(value.length > 27 ? '...' : '')}`)
      })
      desc += guildSettings.join('\n')
      desc += '\n\`\`\`'
      settingsDetails.setDescription(desc == '' ? 'No Settings Found' : desc)
      msg.channel.send(settingsDetails)
    }
  }
}
