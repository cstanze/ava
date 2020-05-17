class Docs {
  constructor(type) {
    this.type = type
  }
  getType() {
    return this.type
  }
  compareType(type) {
    if(type == this.type) {
      return true
    }
    return false
  }
}

module.exports = Docs
