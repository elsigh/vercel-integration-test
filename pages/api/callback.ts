const { parse } = require("url");
const { HOST } = require("../../lib/env");
const getAccessToken = require("../../lib/get-access-token");
const getProjects = require("../../lib/get-projects");
const setMetadata = require("../../lib/set-metadata");
import { NowRequest, NowResponse } from "@vercel/node";

module.exports = async (req: NowRequest, res: NowResponse) => {
  const {
    query: { code, configurationId },
  } = parse(req.url, true);
  if (!code) {
    res.statusCode = 400;
    res.end("missing query parameter: code");
    return;
  }

  const token = await getAccessToken({
    code,
    redirectUri: `${HOST}/redirect`,
  });
  const projects = await getProjects({ configurationId, token });

  await setMetadata({ configurationId, token }, { projects, token });
  res.json({ token, projects });
};
