export const emailRegex = /^\S+@\S+\.\S+$/;
export const phoneRegex = /^\+?\d{10,15}$/;
export const socialsRegex = /^https:\/\/\S+\.\S+$/;

export function detectSocialPlatform(url) {
  const platforms = [
    { key: 'telegram', substrings: ['telegram', 't.me'] },
    { key: 'behance', substrings: ['behance'] },
    { key: 'dribbble', substrings: ['dribbble'] },
    { key: 'youtube', substrings: ['youtube', 'youtu.be'] },
    { key: 'vk', substrings: ['vk'] },
    { key: 'facebook', substrings: ['facebook', 'fb.me'] },
    { key: 'instagram', substrings: ['instagram', 'instagr.am'] },
    { key: 'pinterest', substrings: ['pinterest'] },
    { key: 'whatsapp', substrings: ['whatsapp'] },
    { key: 'x', substrings: ['x'] },
  ];

  const lowerUrl = url.toLowerCase();
  for (let platform of platforms) {
    for (let sub of platform.substrings) {
      if (lowerUrl.includes(sub)) {
        return platform.key;
      }
    }
  }
  return 'default';
}

export function detectTitleName(url, selectedOption) {
  if (selectedOption === 'phone') return 'Номер телефона';
  if (selectedOption === 'email') return 'Email';

  const platform = detectSocialPlatform(url);
  const names = {
    telegram: 'Telegram',
    behance: 'Behance',
    dribbble: 'Dribbble',
    youtube: 'YouTube',
    vk: 'VK',
    facebook: 'Facebook',
    instagram: 'Instagram',
    pinterest: 'Pinterest',
    whatsapp: 'WhatsApp',
    x: 'X',
    default: 'Web-сайт',
  };
  return names[platform] || names.default;
}

export function getSocialHref(name, url) {
  if (name === 'phone') {
    return `tel:${url}`;
  } else if (name === 'email') {
    return `mailto:${url}`;
  }
  return url;
}
