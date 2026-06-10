import test from "node:test";
import assert from "node:assert/strict";

import {
  formatReleaseDate,
  getImpactSummary,
  loadReleaseHistory,
  normalizeGithubRelease,
} from "../src/versions.js";

const githubRelease = {
  tag_name: "v0.6.7",
  name: "Order Consolidator v0.6.7",
  published_at: "2026-06-07T15:56:27Z",
  html_url: "https://github.com/example/releases/tag/v0.6.7",
  body: [
    "Shared Config Folder Auto-Setup.",
    "",
    "- Auto Configure detects Google Drive Desktop.",
    "- Creates OrderConsolidator-Sync and saves the path automatically.",
    "- Adds simple Shared Config Status and keeps Browse Folder fallback.",
  ].join("\n"),
  assets: [
    {
      name: "OrderConsolidator-v0.6.7.zip",
      size: 114363863,
      browser_download_url: "https://example.com/download.zip",
    },
  ],
};

const guidedRelease = {
  tag_name: "v0.6.10",
  name: "Order Consolidator v0.6.10",
  published_at: "2026-06-10T09:02:08Z",
  html_url: "https://github.com/example/releases/tag/v0.6.10",
  body: [
    "Guided reconciliation and batch reporting release built from source tag v0.6.10 at commit 2432403ce6e958d30adce77727b34e8943c708a1.",
    "",
    "- Reconciliation is now a Control Room with a decision banner, KPI cards, and a focused Action Queue.",
    "- Tracking-only shipment IDs, parser warnings, and courier review actions now persist review state and refresh only affected surfaces.",
  ].join("\n"),
  assets: [
    {
      name: "OrderConsolidator-v0.6.10.zip",
      size: 133708869,
      browser_download_url: "https://example.com/v0610.zip",
    },
  ],
};

const awbPreviewRelease = {
  tag_name: "v0.6.9",
  name: "Order Consolidator v0.6.9",
  published_at: "2026-06-09T01:35:10Z",
  html_url: "https://github.com/example/releases/tag/v0.6.9",
  body: "AWB Preview and App Branding release built from source tag v0.6.9 at commit b6e9ef6a1e8e7e058f4a8347980bbdd833728221. Includes compact AWB PDF preview, Product Master usability refinements, and packaged logo/icon assets.",
  assets: [],
};

test("normalizeGithubRelease maps GitHub release data into page-ready fields", () => {
  const release = normalizeGithubRelease(githubRelease);

  assert.equal(release.version, "v0.6.7");
  assert.equal(release.title, "Shared Config Folder Auto-Setup");
  assert.equal(release.date, "Jun 7, 2026");
  assert.equal(release.downloadUrl, "https://example.com/download.zip");
  assert.equal(release.sizeLabel, "109.1 MB");
  assert.equal(release.notes.length, 3);
  assert.equal(release.impact, "Shared config folder setup reduces manual path setup for teams using Google Drive Desktop or similar shared folders.");
});

test("normalizeGithubRelease strips release plumbing from newer GitHub release bodies", () => {
  const release = normalizeGithubRelease(guidedRelease);

  assert.equal(release.version, "v0.6.10");
  assert.equal(release.title, "Guided reconciliation and batch reporting");
  assert.equal(release.notes.length, 2);
  assert.match(release.impact, /lighter batch reporting/i);
});

test("normalizeGithubRelease can recover a clean heading from single-line release bodies", () => {
  const release = normalizeGithubRelease(awbPreviewRelease);

  assert.equal(release.version, "v0.6.9");
  assert.equal(release.title, "AWB Preview and App Branding");
  assert.equal(release.notes.length, 1);
  assert.match(release.notes[0], /compact AWB PDF preview/i);
});

test("getImpactSummary keeps update descriptions honest and impact oriented", () => {
  assert.match(getImpactSummary("v0.6.10", "Guided reconciliation and batch reporting release"), /operators/i);
  assert.match(getImpactSummary("v0.6.9", "AWB Preview and App Branding"), /compact awb preview/i);
  assert.match(getImpactSummary("v0.6.1", "Client-ready manual updater diagnostics"), /manual updater/i);
  assert.match(getImpactSummary("v0.6.2", "Offline local login and Admin roles"), /local login/i);
  assert.match(getImpactSummary("v0.6.4", "Global Config Sync release"), /configuration/i);
  assert.match(getImpactSummary("v9.9.9", "Small maintenance update"), /Small maintenance update/);
});

test("formatReleaseDate handles valid and missing release dates", () => {
  assert.equal(formatReleaseDate("2026-06-07T15:56:27Z"), "Jun 7, 2026");
  assert.equal(formatReleaseDate(""), "Date unavailable");
});

test("loadReleaseHistory returns fallback releases when GitHub cannot be loaded", async () => {
  const releases = await loadReleaseHistory(async () => ({ ok: false, status: 500 }));

  assert.ok(releases.length >= 1);
  assert.equal(releases[0].isFallback, true);
  assert.equal(releases[0].version, "v0.6.10");
});
