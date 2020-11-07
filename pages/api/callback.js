const { parse } = require("url");
const { HOST } = require("../../lib/env");
const getAccessToken = require("../../lib/get-access-token");
const setMetadata = require("../../lib/set-metadata");

module.exports = async (req, res) => {
  const {
    query: { code, configurationId },
  } = parse(req.url, true);
  if (!code) {
    res.statusCode = 400;
    res.end("missing query parameter: code");
    return;
  }

  console.log("Getting accessToken");
  const token = await getAccessToken({
    code,
    redirectUri: `${HOST}/redirect`,
  });

  console.log("Storing accessToken to metadata");
  await setMetadata({ configurationId, token }, { token });

  res.json({ token: token });
};
