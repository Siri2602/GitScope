export const formatNumber = (n) => {
  if (n == null) return '0';
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
};

export const timeAgo = (dateStr) => {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const levelColor = (level) => {
  const map = {
    Expert: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    Advanced: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    Intermediate: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    Beginner: 'text-green-400 bg-green-400/10 border-green-400/20',
  };
  return map[level] || 'text-gray-400 bg-gray-400/10 border-gray-400/20';
};

export const activityColor = (status) => {
  const map = {
    'Highly Active': 'text-green-400',
    Active: 'text-emerald-400',
    'Moderately Active': 'text-yellow-400',
    Inactive: 'text-red-400',
  };
  return map[status] || 'text-gray-400';
};

export const LANG_COLORS = {
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Python: '#3776AB',
  Go: '#00ADD8',
  Rust: '#DEA584',
  Java: '#B07219',
  'C++': '#F34B7D',
  C: '#555555',
  Ruby: '#CC342D',
  PHP: '#4F5D95',
  Swift: '#FA7343',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Shell: '#89E051',
  HTML: '#E34C26',
  CSS: '#563D7C',
  Vue: '#41B883',
  Svelte: '#FF3E00',
};

export const getLangColor = (lang) =>
  LANG_COLORS[lang] || '#94A3B8';
