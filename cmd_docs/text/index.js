const Docs = require('../utils/docs.js')
/* reverse, scramble, vapor */

class TextDocs extends Docs {
  constructor(type) {
    super(type)
  }
  description() {
    return `
      Some good ol\' text commands. Check em out. Nothing much else to say...
    `
  }
  listing() {
    return ['reverse', 'scramble', 'vapor']  
  }
}

module.exports = TextDocs
