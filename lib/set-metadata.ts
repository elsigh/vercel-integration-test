const fetch = require("node-fetch");
const { stringify } = require("querystring");
const responseError = require("./response-error");

module.exports = async ({ configurationId, teamId, token }, data) => {
  const query = stringify({ teamId });
  const res = await fetch(
    `https://api.vercel.com/v1/integrations/configuration/${encodeURIComponent(
      configurationId
    )}/metadata?${query}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    console.error("Error in set-metadata");
    throw await responseError(res);
  }

  const body = await res.json();

  return body;
};
