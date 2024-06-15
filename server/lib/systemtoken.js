function modifyString(token) {
  const SYSTEM_REQUEST_TOKEN = 'F7A1C2D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2E3F7';
  let part1 = token.slice(17, 27);
  let newString = token + part1;
  let part2 = newString.slice(77, 97);
  newString = newString.slice(0, 7) + part2 + newString.slice(7);
  let part3 = SYSTEM_REQUEST_TOKEN.slice(17, 27);
  newString = newString.slice(0, 17) + part3 + newString.slice(27);
  let part4 = SYSTEM_REQUEST_TOKEN.slice(27, 47);
  newString = newString.slice(0, 27) + part4 + newString.slice(47);
  return newString;
}

module.exports = { modifyToken };
