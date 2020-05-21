exports.isValidYoutube = (url) => {
  if(!url.includes("youtube.com")) {
    return false
  }
  if(!url.startsWith("https://")) {
    return false
  }
  if(!url.includes("/watch?v=")) {
    return false
  }
  if(!(url.startsWith("https://www.youtube.com/watch?v=") || url.startsWith("https://youtube.com/watch?v="))) {
    return false
  }
  return true
}
