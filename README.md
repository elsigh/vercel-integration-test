# Vercel Integration Example Code

This app is just a proof-of-concept to help to realize a likely-common pattern for your integration - creating or mapping "project"-like entities in your system to projects in Vercel. The idea is that an integration sets environment variables which your SDK depends on such that, upon completing the integration, a user installs your integration and it will "just work".

See this integration with the Deploy button in action:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%elsigh%2vercel-deploy-demo&integration-ids=oac_4FhKvY0Ia1NHtuKGFtl5GgSf)

The app that gets cloned by Deploy renders the values set during the integration install flow.

[Deploy button documentation](https://vercel.com/docs/more/deploy-button)

## Integration Flowchart

<div style="width: 480px; height: 360px; margin: 10px; position: relative;"><iframe allowfullscreen frameborder="0" style="width:480px; height:360px" src="https://lucid.app/documents/embeddedchart/5095a92f-606b-4c7e-aa2e-83a56b1d8caa" id="CACN0axiksFG"></iframe></div>

## Building Your Integration

1. Create a production-quality integration on the [Vercel integration console](https://vercel.com/dashboard/integrations/console).

2. Set the "Redirect URL" (do not set UIHook URL) to an URL on your system. You can set this value to localhost for iterative development.

3. When a user adds your integration from the marketplace Vercel will redirect the user to your "Redirect URL" with query parameters:

- `code`: which you'll (exchange)[https://vercel.com/docs/api#endpoints/oauth2/exchanging-code-for-an-access-token] for an OAuth2 `access token`
- `configurationId`: represents the `id` of the related configuration
- `teamId`: The `teamId` for this scope on Vercel (or null if it's a personal account)
- `next`: The URL you'll redirect to once configuration on your side is complete

4. Get in touch with Vercel once your integration is ready so we can begin testing and ultimately make your integration available to our users!

More substantive documentation is available [here](https://vercel.com/docs/integrations#o-auth-integrations/hybrid-mode)

You'll also likely want to reference our [API documentation](https://vercel.com/docs/api)

## Running this Demo

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More
