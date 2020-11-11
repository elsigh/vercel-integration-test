# Vercel Integration Example Code

This demo is just a proof-of-concept to help you realize a likely-common pattern for your integration - allowing users to create or point an existing "project" in your system to a Vercel project. Then you'll set consistently-named environment variables that your SDK depends on.

See the Deploy button in action:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fhello-world&integration-ids=oac_4FhKvY0Ia1NHtuKGFtl5GgSf)

[Deploy button documentation](https://vercel.com/docs/more/deploy-button)

## Integration Flow

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
