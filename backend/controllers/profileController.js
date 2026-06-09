const { pool } = require('../config/db');
const { fetchUser, fetchRepos } = require('../utils/github');
const {
  calculateScore,
  getDeveloperLevel,
  getActivityStatus,
  getPortfolioStrength,
  getCommunityInfluence,
  getLanguageBreakdown,
  getTopRepos,
  getBadges,
  generateInsights,
} = require('../utils/analytics');

const analyzeProfile = async (req, res) => {
  const { username } = req.params;
  if (!username) return res.status(400).json({ error: 'Username is required' });

  try {
    const [user, repos] = await Promise.all([fetchUser(username), fetchRepos(username)]);

    const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
    const totalForks = repos.reduce((s, r) => s + r.forks_count, 0);
    const score = calculateScore(user, repos);
    const level = getDeveloperLevel(score);
    const activityStatus = getActivityStatus(repos);
    const portfolioStrength = getPortfolioStrength(repos, totalStars);
    const communityInfluence = getCommunityInfluence(user.followers, totalStars);
    const languages = getLanguageBreakdown(repos);
    const topRepos = getTopRepos(repos);
    const badges = getBadges(user, repos, totalStars, score);
    const insights = generateInsights(user, repos, score, level, activityStatus);
    const mostUsedLang = languages[0]?.name || null;

    const data = {
      username: user.login,
      name: user.name,
      avatar: user.avatar_url,
      bio: user.bio,
      location: user.location,
      followers: user.followers,
      following: user.following,
      public_repos: user.public_repos,
      total_stars: totalStars,
      total_forks: totalForks,
      most_used_language: mostUsedLang,
      developer_score: score,
      developer_level: level,
      activity_status: activityStatus,
      portfolio_strength: portfolioStrength,
      community_influence: communityInfluence,
      languages_data: JSON.stringify(languages),
      top_repos: JSON.stringify(topRepos),
      badges: JSON.stringify(badges),
      insights,
      github_created_at: user.created_at,
    };

    await pool.execute(
      `INSERT INTO profiles 
        (username, name, avatar, bio, location, followers, following, public_repos,
         total_stars, total_forks, most_used_language, developer_score, developer_level,
         activity_status, portfolio_strength, community_influence, languages_data,
         top_repos, badges, insights, github_created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         name=VALUES(name), avatar=VALUES(avatar), bio=VALUES(bio),
         location=VALUES(location), followers=VALUES(followers),
         following=VALUES(following), public_repos=VALUES(public_repos),
         total_stars=VALUES(total_stars), total_forks=VALUES(total_forks),
         most_used_language=VALUES(most_used_language),
         developer_score=VALUES(developer_score),
         developer_level=VALUES(developer_level),
         activity_status=VALUES(activity_status),
         portfolio_strength=VALUES(portfolio_strength),
         community_influence=VALUES(community_influence),
         languages_data=VALUES(languages_data),
         top_repos=VALUES(top_repos), badges=VALUES(badges),
         insights=VALUES(insights), github_created_at=VALUES(github_created_at),
         analyzed_at=CURRENT_TIMESTAMP`,
      [
        data.username, data.name, data.avatar, data.bio, data.location,
        data.followers, data.following, data.public_repos, data.total_stars,
        data.total_forks, data.most_used_language, data.developer_score,
        data.developer_level, data.activity_status, data.portfolio_strength,
        data.community_influence, data.languages_data, data.top_repos,
        data.badges, data.insights, data.github_created_at,
      ]
    );

    const parsed = {
      ...data,
      languages_data: languages,
      top_repos: topRepos,
      badges,
    };

    return res.json({ success: true, data: parsed });
  } catch (err) {
    if (err.response?.status === 404) {
      return res.status(404).json({ error: `GitHub user "${username}" not found` });
    }
    if (err.response?.status === 403) {
      return res.status(403).json({ error: 'GitHub API rate limit reached. Add a token to increase limits.' });
    }
    return res.status(500).json({ error: err.message || 'Analysis failed' });
  }
};

const getAllProfiles = async (_req, res) => {
  const [rows] = await pool.execute(
    'SELECT username, name, avatar, location, developer_score, developer_level, activity_status, most_used_language, followers, public_repos, analyzed_at FROM profiles ORDER BY analyzed_at DESC LIMIT 50'
  );
  res.json({ success: true, data: rows });
};

const getProfile = async (req, res) => {
  const [rows] = await pool.execute('SELECT * FROM profiles WHERE username = ?', [req.params.username]);
  if (!rows.length) return res.status(404).json({ error: 'Profile not found. Analyze it first.' });
  const p = rows[0];
  p.languages_data = typeof p.languages_data === 'string' ? JSON.parse(p.languages_data) : p.languages_data;
  p.top_repos = typeof p.top_repos === 'string' ? JSON.parse(p.top_repos) : p.top_repos;
  p.badges = typeof p.badges === 'string' ? JSON.parse(p.badges) : p.badges;
  res.json({ success: true, data: p });
};

const getTopDevelopers = async (_req, res) => {
  const [rows] = await pool.execute(
    'SELECT username, name, avatar, developer_score, developer_level, most_used_language, followers, public_repos FROM profiles ORDER BY developer_score DESC LIMIT 20'
  );
  res.json({ success: true, data: rows });
};

const searchByLanguage = async (req, res) => {
  const { language } = req.query;
  if (!language) return res.status(400).json({ error: 'language query param required' });
  const [rows] = await pool.execute(
    'SELECT username, name, avatar, developer_score, developer_level, most_used_language, followers FROM profiles WHERE most_used_language = ? ORDER BY developer_score DESC LIMIT 20',
    [language]
  );
  res.json({ success: true, data: rows });
};

module.exports = { analyzeProfile, getAllProfiles, getProfile, getTopDevelopers, searchByLanguage };
