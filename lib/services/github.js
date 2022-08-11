const fetch = require('cross-fetch');

const exchangeForToken = async (code) => {
  const client_id = process.env.GH_CLIENT_ID;
  const client_secret = process.env.GH_CLIENT_SECRET;

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Content_type: 'application/json',
    },
    body: JSON.stringify({ client_id, client_secret, code }),
  });
  const resp = await response.json();
  return resp.access_token;
};

// add getgithubprofile next 

module.exports = { exchangeForToken };
