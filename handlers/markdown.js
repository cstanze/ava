exports.escapeMarkdown = text => {
  let unescaped = text.replace(/\\(\*|_|`|~|\\)/g, '$1')
  let escaped = unescaped.replace(/\\(\*|_|`|~|\\)/g, '\\$1')
  return escaped
}
