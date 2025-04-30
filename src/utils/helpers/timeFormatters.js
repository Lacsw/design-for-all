export function formatTimestamp(unixTimestamp, lang) {
  const date = new Date(unixTimestamp * 1000);
  const region = lang || 'ru-RU';

  const weekday = date.toLocaleDateString(region, { weekday: 'long' });
  const dateStr = date.toLocaleDateString(region);
  const timeStr = date.toLocaleTimeString(region, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  });

  return `${dateStr} ${weekday} ${timeStr}`;
}

export function formatUpdatedAt(updatedAt, lang = 'ru-RU') {
  const updatedDate = new Date(updatedAt * 1000);
  const today = new Date();

  const toDateOnly = (date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const updatedDay = toDateOnly(updatedDate);
  const todayDay = toDateOnly(today);

  const diffInMs = todayDay - updatedDay;
  const daysAgo = Math.round(diffInMs / (1000 * 60 * 60 * 24));

  const datePart = updatedDate.toLocaleDateString(lang);
  const weekday = updatedDate.toLocaleDateString(lang, { weekday: 'long' });
  const time = updatedDate.toLocaleTimeString(lang, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return `${datePart} ${weekday} ${time} (${daysAgo} ${getDaysPlural(
    daysAgo,
    lang
  )} ${getAgoWord(lang)})`;
}

function getDaysPlural(days, lang) {
  if (lang.startsWith('ru')) {
    const mod10 = days % 10;
    const mod100 = days % 100;
    if (mod10 === 1 && mod100 !== 11) return 'день';
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'дня';

    return 'дней';
  }

  return days === 1 ? 'day' : 'days';
}

function getAgoWord(lang) {
  if (lang.startsWith('ru')) return 'назад';

  return 'ago';
}
