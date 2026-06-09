const axios = require('axios');
require('dotenv').config();

const gh = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github+json',
    ...(process.env.GITHUB_TOKEN && {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    }),
  },
  timeout: 10000,
});

const fetchUser = async (username) => {
  const { data } = await gh.get(`/users/${username}`);
  return data;
};

const fetchRepos = async (username) => {
  const perPage = 100;
  let page = 1;
  let all = [];
  while (true) {
    const { data } = await gh.get(`/users/${username}/repos`, {
      params: { per_page: perPage, page, sort: 'pushed' },
    });
    all = all.concat(data);
    if (data.length < perPage) break;
    page++;
    if (page > 5) break;
  }
  return all;
};

module.exports = { fetchUser, fetchRepos };
