const Discord = require('discord.js')
const fetch = require('node-fetch')
const chalk = require('chalk')

module.exports = {
  name: 'reddit',
  description: 'Get a random post from a subreddit',
  cooldown: 10,
  args: true,
  usage: '<subreddit> <amount of posts to fetch>',
  type: 'Search',
  aliases: ['subreddit'],
  async execute(client, msg, args) {
    let subreddit = args[0]
    let amount = args[1] || 1
    if(subreddit.includes('r/')) subreddit = subreddit.replace('r/', '')
    if(isNaN(Number(amount))) amount = 1
    msg.channel.send(`:compass: Fetching ${amount == 1 ? `a random post` : `${amount} random posts`} from the subreddit: \`${subreddit}\``).then(async msg => {
      let body = await fetch(`https://www.reddit.com/r/${subreddit}.json?sort=new`).then(res => res.json()).catch(err => {
        console.error(chalk.red(`[Error]`), chalk.yellow(`[Reddit][Fetch]`), err)
        return msg.channel.send(`I couldn't seem to fetch ${amount == 1 ? `a random post` : `${amount} random posts`} from \`${subreddit}\`. Try again later?`)
      })
      body = body.data
      if(typeof body == 'undefined') return msg.channel.send(`There isn't a subreddit with the name: \`${subreddit}\`.`)
      const allowed = msg.channel.nsfw ? body.children : body.children.filter(post => !post.data.over_18)
      if(!allowed.length) return msg.channel.send(`It seems we are out of fresh, non-nsfw posts from \`${subreddit}\`. Try again later?`)
      let randomNumber = Math.floor(Math.random() * allowed.length)
      msg.channel.send(allowed[randomNumber].data.url)
      if(amount > 1) {
        for(let i=1;i<amount;i++) {
          if(allowed.length <= i) {
            msg.channel.send(`It seems we are out of fresh, non-nsfw posts from \`${subreddit}\`. Try again later?`)
            return
          }
          msg.channel.send(allowed[randomNumber+i].data.url)
        }
      }
      return msg.delete()
    })
  }
}
