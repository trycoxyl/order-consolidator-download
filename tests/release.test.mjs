import test from "node:test";
import assert from "node:assert/strict";

import {
  FALLBACK_RELEASE,
  formatBytes,
  getDownloadUrl,
  loadLatestRelease,
  normalizeRelease,
} from "../src/release.js";

const samplePayload = {
  version: "0.6.4",
  release_date: "2026-06-07",
  release_notes: [
    "Global Config Sync for shared users, companies, roles, permissions, and user-company assignment.",
    "Startup and manual Sync Global Config merge access data before login without replacing local operational data.",
  ],
  download_url:
    "https://github.com/trycoxyl/warehouse-order-consolidator-releases/releases/download/v0.6.4/OrderConsolidator-v0.6.4.zip",
  download_size: 114269599,
  sha256: "74b85feabb2cac9ddb540ff6d5a195e0ab4fc030c8a55278c375cbb2e274a7d3",
};

test("normalizeRelease maps latest.json fields into display data", () => {
  const release = normalizeRelease(samplePayload);

  assert.equal(release.version, "0.6.4");
  assert.equal(release.releaseDate, "2026-06-07");
  assert.equal(release.downloadUrl, samplePayload.download_url);
  assert.equal(release.releaseNotes.length, 2);
  assert.equal(release.downloadSizeLabel, "109 MB");
  assert.equal(release.sha256Short, "74b85fea...");
  assert.equal(release.isFallback, false);
});

test("normalizeRelease supports app_* compatibility fields", () => {
  const release = normalizeRelease({
    app_version: "0.7.0",
    release_date: "2026-06-08",
    release_notes: "Maintenance release",
    app_download_url: "https://example.com/app.zip",
    app_download_size: 2048,
    app_sha256: "abcdef1234567890",
  });

  assert.equal(release.version, "0.7.0");
  assert.equal(release.downloadUrl, "https://example.com/app.zip");
  assert.deepEqual(release.releaseNotes, ["Maintenance release"]);
  assert.equal(release.downloadSizeLabel, "2 KB");
  assert.equal(release.sha256Short, "abcdef12...");
});

test("getDownloadUrl prefers release URL and falls back to manual releases URL", () => {
  assert.equal(getDownloadUrl(normalizeRelease(samplePayload)), samplePayload.download_url);
  assert.equal(getDownloadUrl(FALLBACK_RELEASE), FALLBACK_RELEASE.manualReleasesUrl);
});

test("loadLatestRelease returns fallback data when latest.json cannot be loaded", async () => {
  const failingFetch = async () => ({
    ok: false,
    status: 500,
    json: async () => ({}),
  });

  const release = await loadLatestRelease(failingFetch);

  assert.equal(release.isFallback, true);
  assert.equal(release.version, FALLBACK_RELEASE.version);
  assert.equal(release.downloadUrl, "");
});

test("loadLatestRelease fetches and normalizes live JSON", async () => {
  const requests = [];
  const fetcher = async (url) => {
    requests.push(url);
    return {
      ok: true,
      json: async () => samplePayload,
    };
  };

  const release = await loadLatestRelease(fetcher);

  assert.equal(requests.length, 1);
  assert.equal(requests[0], "https://raw.githubusercontent.com/trycoxyl/warehouse-order-consolidator-releases/main/latest.json");
  assert.equal(release.version, "0.6.4");
});

test("formatBytes keeps empty and invalid values quiet", () => {
  assert.equal(formatBytes(undefined), "");
  assert.equal(formatBytes(Number.NaN), "");
  assert.equal(formatBytes(0), "0 B");
  assert.equal(formatBytes(1536), "1.5 KB");
});
