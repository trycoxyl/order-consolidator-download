# Order Consolidator Download Site

Static one-page download landing page for **Order Consolidator**, designed for Vercel.

The site includes:

- `index.html` for the download landing page
- `features.html` for honest app capability notes
- `version.html` for the release history card stack

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

`src/release.js` maps these fields for the live download controls:

- `version` or `app_version`
- `download_url` or `app_download_url`
- `download_size` or `app_download_size`

The header and hero download buttons use `download_url`, and the page shows only a small live version/package label so frequent releases do not require manual page edits. If `latest.json` cannot be loaded, the page shows a fallback warning and points users to the manual GitHub Releases link:

```text
https://github.com/trycoxyl/warehouse-order-consolidator-releases/releases/latest
```

## Version History

`version.html` reads the public GitHub Releases API:

```text
https://api.github.com/repos/trycoxyl/warehouse-order-consolidator-releases/releases?per_page=100
```

`src/versions.js` converts release notes into concise, impact-oriented cards. If the GitHub API cannot load, the page falls back to a local release history snapshot.
