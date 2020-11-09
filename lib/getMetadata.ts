const fetch = require("node-fetch");
const { stringify } = require("querystring");
const responseError = require("./response-error");

module.exports = async ({ configurationId, teamId, token }) => {
  const query = stringify({ teamId });
  const res = await fetch(
    `https://api.zeit.co/v1/integrations/configuration/${encodeURIComponent(
      configurationId
    )}/metadata?${query}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    console.error("Error in get-metadata");
    throw await responseError(res);
  }

  const body = await res.json();
  return body;
};
