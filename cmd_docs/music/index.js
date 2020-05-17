const Docs = require('../utils/docs.js')
/* lofiDocs, stoplofiDocs */

class MusicDocs extends Docs {
  constructor(type) {
    super(type)
  }
  description() {
    return `
      Music Commands for listening to lofi. Its still in beta and is error-prone.
    `
  }
  listing() {
    return ['lofi', 'stoplofi']
  }
}

module.exports = MusicDocs
