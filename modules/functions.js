module.exports = client => {
  /*
    PERMISSION LEVEL FUNCTION

    This is a very basic permissions system for commands which uses "levels"
    "spaces" are intentionally left black so you can add them if you want.
    NEVER GIVE ANYONE BUT THE OWNER THE LEVEL 10! By default this can run any command
    including the VERY DANGEROUS `eval` and `exec` commands!
  */
  client.permLevel = (msg) => {
    let permlvl = 0
    const permOrder = client.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1)
    while(permOrder.length) {
      const currentLevel = permOrder.shift()
      if(msg.guild && currentLevel.guildOnly) continue
      if(currentLevel.check(msg)) {
        permlvl = currentLevel.level
        break
      }
    }
    return permlvl
  }
  /*
   GUILD SETTINGS FUNCTION

   This function merges the default settings from config.defaultSettings with any guild override you might have for a particular guild.
   If no override are present, the default settings are used.
  */
  // Just a safety measure for accidentally deleting the default guild settings.
  const defaultSettings = {
    'modLogChannel': 'mod-log',
    'modRole': 'Moderator',
    'adminRole': 'Administrator',
    'systemNotice': 'false',
    'welcomeChannel': 'welcome',
    'welcomeMessage': 'Say hello to {{user}}, everyone! Lets welcome our new member!',
    'welcomeEnabled': 'false',
    'no-xp-channel': 'spam',
    "logMessageEdits": "true"
  }
  // getSettings merge the client defaults with the new guild settings.
  // guild settings in enmap should only have *unique* overrides that are different from the defaults.
  client.getSettings = (guild) => {
    client.settings.ensure('default', defaultSettings)
    if(!guild) return client.settings.get('default')
    const guildConf = client.settings.get(guild.id) || {}
    // '...' is the spread operator. It's really awesome.
    return ({...client.settings.get('default'), ...guildConf})
  }
  /*
  GUILD SETTINGS QUICK GET FUNCTION

  This function should perform a search for a client settings key.
  If it can't find a specified key, it returns the default value for that key.
  */
  client.valueForSettingsKey = (key, guild) => {
    if(!key) throw new Error(`NoKey`)
    const settings = client.getSettings(guild)
    return settings[key]
  }
  /*
    const response = await client.awaitReply(msg, "Question?")
    msg.reply(`Something, something, something, ${response}!`)
  */
  client.awaitReply = async (msg, question, limit = 60000, id = 'nid') => {
    if(id == 'nid') id = msg.author.id
    const filter = m => m.author.id == id
    await msg.channel.send(question)
    try {
      const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ['time'] })
      return collected.first().content
    } catch (e) {
      console.error(`[Ava][Error][Await Reply]`, e)
      return false
    }
  }
  client.clean = async (client, text) => {
    return text.replace(client.token, 'mfa.VkO_2G4Qv3T--No-Token-For-U--lWetW_tjND--Cleaned-by-Ava--QFTm6YGtzq9PHtg0')
  }
  /*
  Misc Non-Crit Funcs

  EXTENDING NATIVE TYPES IS BAD PRACTICE.
  */
  Object.defineProperty(String.prototype, "toProperCase", {
    value: function() {
      return this.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + text.substr(1).toLowerCase())
    }
  })
  // <Array>.random()
  Object.defineProperty(Array.prototype, 'random', {
    value: () => {
      return this[Math.floor(Math.random * this.length)]
    }
  })
  // await client.wait(1000) to "pause" for 1 second
  client.wait = require('util').promisify(setTimeout)
  // replace the special characters in a string.
  client.replaceSpecials = (str) => {
    let token = str.replace(  '~' , '')
    token =     token.replace('`' , '')
    token =     token.replace('!' , '')
    token =     token.replace('@' , '')
    token =     token.replace('#' , '')
    token =     token.replace('$' , '')
    token =     token.replace('%' , '')
    token =     token.replace('^' , '')
    token =     token.replace('&' , '')
    token =     token.replace('*' , '')
    token =     token.replace('(' , '')
    token =     token.replace(')' , '')
    token =     token.replace('-' , '')
    token =     token.replace('_' , '')
    token =     token.replace('{' , '')
    token =     token.replace('[' , '')
    token =     token.replace('}' , '')
    token =     token.replace(']' , '')
    token =     token.replace('\'', '')
    token =     token.replace('"' , '')
    token =     token.replace('<' , '')
    token =     token.replace(':' , '')
    token =     token.replace(';' , '')
    token =     token.replace('>' , '')
    token =     token.replace(',' , '')
    token =     token.replace('.' , '')
    token =     token.replace('?' , '')
    token =     token.replace('/' , '')
    token =     token.replace('\\', '')
    return token
  }
  // Format Numbers in the Thousands with commas
  client.numbersWithCommas = (x) => {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
  }
}
