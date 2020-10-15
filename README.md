# In App Payments Redirect for Vercel

Unfortunately Apple only allow developers to add a single domain for their In App Payments (IAP) web hooks, cause you know, who needs a development environment?

This project is a single Lambda that will redirect to a given URL depending on whether or not the webhook came from Apple's production environment or not.

## Getting started

This project has been configured to run on Vercel all you need to do is press the button below.

<div style="text-align: center">

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2FFabFit%2Fvercel-iap-redirect&env=PRODUCTION_REDIRECT,DEVELOPMENT_REDIRECT)

</div>

Pressing the above button will also create two environment variables, if you'd prefer not to use the automatic deployments then you will need to manually add the following variables:

- `DEVELOPMENT_REDIRECT`: your development API endpoint
- `PRODUCTION_REDIRECT`: your production API endpoint

Once deployed update your webhook URL in App Store Connect to `<domain>/api/redirect`.
