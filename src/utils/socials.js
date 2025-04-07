export const emailRegex = /^\S+@\S+\.\S+$/;
export const phoneRegex = /^\+?\d{10,15}$/;
export const socialsRegex = /^https:\/\/\S+\.\S+$/;

export function detectSocialPlatform(url) {
  const platforms = [
    { key: 'telegram', substrings: ['t.me', 'telegram.me', 'telegram.org'] },
    { key: 'behance', substrings: ['behance.net'] },
    { key: 'dribbble', substrings: ['dribbble.com'] },
    { key: 'youtube', substrings: ['youtube.com', 'youtu.be'] },
    { key: 'vk', substrings: ['vk.com'] },
    { key: 'facebook', substrings: ['facebook.com', 'fb.me'] },
    { key: 'instagram', substrings: ['instagram.com', 'instagr.am'] },
    { key: 'pinterest', substrings: ['pinterest.com'] },
    { key: 'whatsapp', substrings: ['wa.me', 'whatsapp.com'] },
    { key: 'x', substrings: ['x.com'] },
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
