exports.formatDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Ay 0'dan başladığı için 1 ekliyoruz.
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(Math.floor(date.getMilliseconds() / 10)).padStart(2, '0');
  return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
};
