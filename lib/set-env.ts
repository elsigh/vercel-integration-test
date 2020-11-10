const fetch = require("node-fetch");
const { stringify } = require("querystring");
const responseError = require("./response-error");

module.exports = async ({
  projectId,
  token,
  key,
  value,
  target,
}: {
  projectId: string;
  token: string;
  key: string;
  value: string;
  target: string[];
}) => {
  const res = await fetch(
    `https://api.vercel.com/v6/projects/${projectId}/env`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key,
        value,
        type: "plain",
        target,
      }),
    }
  );

  if (!res.ok) {
    console.error("Error in set-env");
    throw await responseError(res);
  }

  const body = await res.json();
  return body;
};
