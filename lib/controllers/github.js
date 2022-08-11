const { Router } = require('express');
const GithubUser = require('../models/GithubUser');
const { exchangeForToken } = require('../services/github');

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user&redirect_uri=${process.env.GITHUB_REDIRECT_URI}`
    );
  })
  .get('/vista', async (req, res, next) => {
    try {
      // get code
      const { code } = req.query;
      const token = await exchangeForToken(code);
      const githubProfile = await getGithubProfile(token);

      let user = await GithubUser.findByUsername(githubProfile.login);
      if (!user) {
        user = await GithubUser.insert({
          username: githubProfile.login,
          email: githubProfile.email,
          avatar: githubProfile.avatar_url,
        });
      }
    } catch (e) {
      next(e);
    }
  });
