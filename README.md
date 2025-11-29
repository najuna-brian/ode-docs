# ODE Website

This is the website for ODE. It is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Local Development

```
$ npm install
$ npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Testing Before Pushing

**Always test your changes locally before pushing to avoid broken links and deployment failures:**

```bash
# Clear cache and build the site
$ npm run clear
$ npm run build
```

The build will fail if there are any broken links. Fix any errors before pushing your changes.

### Deployment

The website is deployed automatically using GitHub Actions when changes are pushed to the `main` branch.