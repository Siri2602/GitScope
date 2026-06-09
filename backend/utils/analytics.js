const calculateScore = (profile, repos) => {
  const followerScore = Math.min(profile.followers / 1000, 1) * 25;
  const repoScore = Math.min(profile.public_repos / 50, 1) * 15;

  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const starScore = Math.min(totalStars / 500, 1) * 25;

  const totalForks = repos.reduce((s, r) => s + r.forks_count, 0);
  const forkScore = Math.min(totalForks / 200, 1) * 10;

  const accountAgeMs = Date.now() - new Date(profile.created_at).getTime();
  const accountAgeYears = accountAgeMs / (1000 * 60 * 60 * 24 * 365);
  const ageScore = Math.min(accountAgeYears / 5, 1) * 15;

  const recentRepos = repos.filter((r) => {
    const updated = new Date(r.pushed_at);
    const monthsAgo = (Date.now() - updated.getTime()) / (1000 * 60 * 60 * 24 * 30);
    return monthsAgo <= 6;
  });
  const activityScore = Math.min(recentRepos.length / 10, 1) * 10;

  const raw = followerScore + repoScore + starScore + forkScore + ageScore + activityScore;
  return Math.round(Math.min(raw, 100) * 100) / 100;
};

const getDeveloperLevel = (score) => {
  if (score >= 75) return 'Expert';
  if (score >= 50) return 'Advanced';
  if (score >= 25) return 'Intermediate';
  return 'Beginner';
};

const getActivityStatus = (repos) => {
  const recent = repos.filter((r) => {
    const days = (Date.now() - new Date(r.pushed_at).getTime()) / (1000 * 60 * 60 * 24);
    return days <= 30;
  }).length;

  if (recent >= 5) return 'Highly Active';
  if (recent >= 2) return 'Active';
  if (recent >= 1) return 'Moderately Active';
  return 'Inactive';
};

const getPortfolioStrength = (repos, stars) => {
  const avgStars = repos.length ? stars / repos.length : 0;
  if (repos.length >= 30 && avgStars >= 10) return 'Excellent';
  if (repos.length >= 15 && avgStars >= 5) return 'Strong';
  if (repos.length >= 5) return 'Average';
  return 'Weak';
};

const getCommunityInfluence = (followers, stars) => {
  const combined = followers + stars * 2;
  if (combined >= 2000) return 'Very High';
  if (combined >= 500) return 'High';
  if (combined >= 100) return 'Medium';
  return 'Low';
};

const getLanguageBreakdown = (repos) => {
  const langMap = {};
  repos.forEach((r) => {
    if (r.language) {
      langMap[r.language] = (langMap[r.language] || 0) + 1;
    }
  });
  const total = Object.values(langMap).reduce((a, b) => a + b, 0) || 1;
  return Object.entries(langMap)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / total) * 100),
    }));
};

const getTopRepos = (repos) => {
  return [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6)
    .map((r) => ({
      name: r.name,
      description: r.description,
      stars: r.stargazers_count,
      forks: r.forks_count,
      language: r.language,
      url: r.html_url,
      updated: r.pushed_at,
    }));
};

const getBadges = (profile, repos, stars, score) => {
  const badges = [];
  if (profile.public_repos >= 20) badges.push({ label: 'Top Repository Owner', icon: 'star' });
  if (profile.followers >= 100) badges.push({ label: 'Community Builder', icon: 'users' });
  const hasForked = repos.some((r) => r.fork);
  if (hasForked) badges.push({ label: 'Open Source Contributor', icon: 'git-fork' });
  if (score >= 70) badges.push({ label: 'Active Maintainer', icon: 'shield' });
  if (profile.followers < 500 && score >= 40) badges.push({ label: 'Rising Developer', icon: 'trending-up' });
  return badges;
};

const generateInsights = (profile, repos, score, level, activityStatus) => {
  const parts = [];
  const lang = getLanguageBreakdown(repos);
  const topLang = lang[0]?.name || 'multiple languages';

  if (activityStatus === 'Highly Active' || activityStatus === 'Active') {
    parts.push(`This profile demonstrates consistent development activity with ${profile.public_repos} public repositories.`);
  } else {
    parts.push(`This profile has a solid repository portfolio spanning ${profile.public_repos} public projects.`);
  }

  if (lang.length > 0) {
    const langList = lang.slice(0, 3).map((l) => l.name).join(', ');
    parts.push(`The primary technology stack includes ${langList}, reflecting depth in modern software development.`);
  }

  if (profile.followers >= 100) {
    parts.push(`A following of ${profile.followers} indicates meaningful community presence and peer recognition.`);
  }

  if (level === 'Expert' || level === 'Advanced') {
    parts.push(`Overall metrics place this developer in the ${level} tier, with a performance score of ${score}/100.`);
  } else {
    parts.push(`With a score of ${score}/100, this developer is on a clear growth trajectory toward the ${level} tier.`);
  }

  return parts.join(' ');
};

module.exports = {
  calculateScore,
  getDeveloperLevel,
  getActivityStatus,
  getPortfolioStrength,
  getCommunityInfluence,
  getLanguageBreakdown,
  getTopRepos,
  getBadges,
  generateInsights,
};
