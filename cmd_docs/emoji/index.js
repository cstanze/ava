const Docs = require('../utils/docs.js')
/* nitroDocs, listnitroDocs */

class EmojiDocs extends Docs {
  constructor(type) {
    super(type)
  }
  description() {
    return `
      Experimental workaround for not paying \`$5.99 / mo\` for Nitro Classic
    `
  }
  listing() {
    return ['nitro', 'listnitro']
  }
}

module.exports = EmojiDocs
