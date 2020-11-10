const { parse } = require("url");
const { HOST } = require("../../lib/env");
const setEnv = require("../../lib/set-env");
import { NowRequest, NowResponse } from "@vercel/node";

module.exports = async (req: NowRequest, res: NowResponse) => {
  const {
    query: { projectId, token, key, value, target },
  } = parse(req.url, true);
  if (!token) {
    res.statusCode = 400;
    res.end("missing query parameter: token");
    return;
  }

  const resp = await setEnv({
    projectId,
    token,
    key,
    value,
    target: ["production"],
  });

  res.json(resp);
};
