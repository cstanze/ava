exports.attachmentIsImage = attachment => {
  let url = attachment.url
  return url.checkForString("png") || url.checkForString("jpg") || url.checkForString("gif")
}

String.prototype.checkForString = (substring) => {
  return this.indexOf(substring, this.length - substring.length) === -1
}
