export function isoToLocalDate(isoDateString) {
  const date = new Date(isoDateString);
  const timeZone = 'Europe/Istanbul';

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: timeZone,
  };

  // İstanbul zaman dilimine göre formatlanmış tarih ve saati elde et
  const formatter = new Intl.DateTimeFormat('tr-TR', options);
  return formatter.format(date);
}

export function isoToLocalDateTime(isoDateString) {
  const date = new Date(isoDateString);
  const timeZone = 'Europe/Istanbul';

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timeZone,
  };

  // İstanbul zaman dilimine göre formatlanmış tarih ve saati elde et
  const formatter = new Intl.DateTimeFormat('tr-TR', options);
  return formatter.format(date);
}

export function convertDate(inputDate) {
  const date = new Date(inputDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ay bilgisi 0'dan başladığı için 1 ekliyoruz.
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}
