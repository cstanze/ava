const Docs = require('../utils/docs.js')
/* birdDocs, crabDocs, microbeDocs, reroDocs, simpsonsDocs, snailDocs */

class FunDocs extends Docs {
  constructor(type) {
    super(type)
  }
  description() {
    return `
      Funny Funny Ha Ha! Seriously though, these commands are kinda dumb but funny.
    `
  }
  listing() {
    return ['bird', 'crab', 'rero', 'snail', 'say', 'aight']
  }
}

module.exports = FunDocs
