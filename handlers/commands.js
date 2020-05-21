const Discord = require('discord.js')
let randomFooters = ["Proudly created in nano", "Puppers!", ":O", "CPU Overheating...", "Quacc", "Welcome Cthulu!", "NYU Tisch", "Widen That Keyhole...", "01000110"]
const { didYouMean } = require('../helpers/didyoumean.js')
const TextDocs = require('../cmd_docs/text/index.js') // Text
const PrivateDocs = require('../cmd_docs/private/index.js') // Private
const MusicDocs = require('../cmd_docs/music/index.js')  // Music
const ModDocs = require('../cmd_docs/mod/index.js')  // Mod
const MiscDocs = require('../cmd_docs/misc/index.js')  // Misc
const ImageDocs = require('../cmd_docs/image/index.js')  // Image
const FunDocs = require('../cmd_docs/fun/index.js')  // Fun
const EmojiDocs = require('../cmd_docs/emoji/index.js')  // Emoji

exports.handleCommandDocuments = (msg, type) => {
  let types = ["mod", "image", "fun", "emoji", "text", "private", "misc", "music"]
  if(!types.includes(type)) {
    msg.channel.send("Invalid Command Type: \`"+type+"\`\n***Did you mean:*** "+didYouMean(type, "command_type"))
    return
  }
  let docs = new TextDocs();
  if(type == "mod") docs = new ModDocs()
  if(type == "image") docs = new ImageDocs()
  if(type == "fun") docs = new FunDocs()
  if(type == "emoji") docs = new EmojiDocs()
  if(type == "private") docs = new PrivateDocs()
  if(type == "misc") docs = new MiscDocs()
  if(type == "music") docs = new MusicDocs()
  let listings = chunk(docs.listing(), 1)
  let formattedListings = ""
  for(let i=0;i<listings.length;i++) {
    let listingChunk = listings[i]
    let fixedChunk = listings[i].join(" ")
    if(i == listings.length - 1) {
      formattedListings += fixedChunk
      continue
    }
    formattedListings += fixedChunk+"\n"
  }
  let commandEmbed = new Discord.MessageEmbed()
    .setColor('#c43714')
    .setFooter(randomFooters[Math.floor(Math.random() * randomFooters.length)])
    .setTitle(`Command Topic: \`${type}\``)
    .attachFiles(['./AvaIcon.jpg'])
    .setAuthor(`${type.charAt(0).toUpperCase()+type.substr(1)} Documentation`, 'attachment://AvaIcon.jpg')
    .setThumbnail('attachment://AvaIcon.jpg')
    .setTimestamp()
    .setDescription(docs.description())
    .addField("Command Listing", formattedListings, false)
  msg.channel.send(commandEmbed)
}

chunk = (arr, chunkSizes) => {
  const chunked_arr = []
  for(let i=0;i<arr.length;i++) {
    const last = chunked_arr[chunked_arr.length - 1]
    if(!last || last.length === chunkSizes) {
      chunked_arr.push([arr[i]])
    } else {
      last.push(arr[i])
    }
  }
  return chunked_arr
}
