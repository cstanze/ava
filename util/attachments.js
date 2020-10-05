exports.attachmentIsImage = attachment => {
  let url = attachment.url
  return checkForString(url, "png") || checkForString(url, "jpg") || checkForString(url, "gif")
}

checkForString = (string, substring) => {
  return string.indexOf(substring, this.length - substring.length) === -1
}
