exports.domainName = (url) => {
  if(typeof url != 'string') return
  if(url.indexOf('//') > -1) {
    hostname = url.split('/')[2]
  } else {
    hostname = url.split('/')[0]
  }
  hostname = hostname.split(':')[0].split('?')[0].replace('www', '').split('.')[0]
  return hostname
}
