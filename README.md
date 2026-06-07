# Order Consolidator Download Site

Static one-page download landing page for **Order Consolidator**, designed for Vercel.

## Run Locally

```powershell
npm install
npm test
npm run check
npm start
```

Open the local URL printed by `serve`, usually `http://localhost:3000`.

## Deploy To Vercel

This project is plain static HTML, CSS, and JavaScript. No backend, database, or build step is required.

```powershell
npm install
npm test
npm run check
vercel
vercel --prod
```

For Vercel Git integration, import the GitHub repository and keep the framework preset as **Other**. The output directory can stay as the project root.

## Release Metadata

The page reads the latest app release at runtime from:

```text
https://raw.githubusercontent.com/trycoxyl/warehouse-order-consolidator-releases/main/latest.json
```

`src/release.js` maps these fields into the page:

- `version` or `app_version`
- `release_date` or `published_at`
- `release_notes`, `whats_new`, or `notes`
- `download_url` or `app_download_url`
- `download_size` or `app_download_size`
- `sha256` or `app_sha256`

The header and hero download buttons use `download_url`. If `latest.json` cannot be loaded, the page shows a fallback warning and points users to the manual GitHub Releases link:

```text
https://github.com/trycoxyl/warehouse-order-consolidator-releases/releases/latest
```
