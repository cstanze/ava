const Discord = require('discord.js')
const { inspect } = require(`util`)
const evalLangList = require('../util/langList.js')
const exec = require('child_process').execSync
let embede,
    result,
    fail,
    start,
    argss,
    lang

module.exports = {
  name: 'eval',
  description: 'Execute some code.',
  type: 'Private',
  permissionsLevel: 'Bot Owner',
  async execute(client, msg, args) {
    start = new Date()
    // NOTE: Keep this as a fallback. Just in case
    // argss = msg.content.replace(RegExp(`${msg.prefix}eval\\s+(\\n?)+`, `gi`), ``)
    argss = msg.content.match(/```.*\s*.*\s*```/gs)
    if(argss == null) return msg.channel.send(`Please provide a valid codeblock.`)
    argss = argss[0].replace(/\s*```.*\s*/g, '')
    lang = msg.content.match(/```.*\s*.+\s*```/gs)[0].match(/```.*/g) ?
           msg.content.match(/```.*\s*.+\s*```/gs)[0].match(/```.*/g)[0].replace('```', '')
           : 'js'
    lang = evalLangList[lang] || {
      extension: 'js',
      command: {
        type: 'eval'
      }
    }
    try {
      switch(lang.command.type) {
      case 'eval':
        result = inspect(eval(argss), { depth: 1 })
        break
      case 'exec':
        msg.channel.send(':warning: **This may take some time**')
        result = exec(lang.command.run.replace(/<code>/gi, argss).replace(/<ext>/gi, lang.extension)).toString()
        console.log(result) // Just in case
        break
      default:
        msg.channel.send(`:x: **No command type defined.** Skipping...`)
      }
    } catch(e) {
      result = e
      fail = true
    }
    if (result.length > 1024 && result.length < 80000) {
      require(`hastebin-gen`)(result, { extension: lang.extension, url: 'https://paste.mod.gg'} ).then(haste => msg.channel.send(`Result was too big: ` + haste))
    } else if(result.length > 80000) {
      msg.channel.send(`I was going to send this in a hastebin, but the result is over 2,000 characters!`)
    } else {
      msg.channel.send(new Discord.MessageEmbed()
                       .addField(`\u200B`, `\`\`\`js\n${result}\`\`\``)
                       .setColor(fail ? `#ff0033` : `#8074d2`)
                       .setFooter(`${new Date() - start}ms`, msg.author.avatarURL()))
    }
  }
}
