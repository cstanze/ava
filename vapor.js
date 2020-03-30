const charToFullWidth = char => {
	const c = char.charCodeAt(0)
	return c >= 33 && c <= 126 ? String.fromCharCode((c - 33) + 65281) : char
}

const vaporString = string => string.split("").map(charToFullWidth).join("")

module.exports = vaporString
