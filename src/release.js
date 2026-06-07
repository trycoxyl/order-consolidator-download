export const LATEST_RELEASE_URL =
  "https://raw.githubusercontent.com/trycoxyl/warehouse-order-consolidator-releases/main/latest.json";

export const MANUAL_RELEASES_URL =
  "https://github.com/trycoxyl/warehouse-order-consolidator-releases/releases/latest";

export const FALLBACK_RELEASE = {
  version: "Latest unavailable",
  releaseDate: "Unable to load release metadata",
  releaseNotes: [
    "Release information could not be loaded right now. Use the manual GitHub Releases link to download the latest ZIP.",
  ],
  downloadUrl: "",
  downloadSizeLabel: "",
  sha256Short: "",
  manualReleasesUrl: MANUAL_RELEASES_URL,
  isFallback: true,
};

export function formatBytes(value) {
  const bytes = Number(value);
  if (!Number.isFinite(bytes)) return "";
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB"];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const size = bytes / 1024 ** exponent;
  const label = Number.isInteger(size) ? String(size) : size.toFixed(1).replace(/\.0$/, "");

  return `${label} ${units[exponent]}`;
}

export function normalizeRelease(payload = {}) {
  const notes = payload.release_notes ?? payload.whats_new ?? payload.notes ?? [];
  const releaseNotes = Array.isArray(notes)
    ? notes.filter(Boolean)
    : String(notes)
        .split(/\r?\n/)
        .map((note) => note.trim())
        .filter(Boolean);

  const sha256 = payload.sha256 ?? payload.app_sha256 ?? "";

  return {
    version: String(payload.version ?? payload.app_version ?? "Unknown version"),
    releaseDate: String(payload.release_date ?? payload.published_at ?? "Release date unavailable"),
    releaseNotes: releaseNotes.length ? releaseNotes : ["No release notes were provided for this version."],
    downloadUrl: String(payload.download_url ?? payload.app_download_url ?? ""),
    downloadSizeLabel: formatBytes(payload.download_size ?? payload.app_download_size),
    sha256Short: sha256 ? `${String(sha256).slice(0, 8)}...` : "",
    manualReleasesUrl: MANUAL_RELEASES_URL,
    isFallback: false,
  };
}

export function getDownloadUrl(release) {
  return release?.downloadUrl || release?.manualReleasesUrl || MANUAL_RELEASES_URL;
}

export async function loadLatestRelease(fetcher = globalThis.fetch) {
  try {
    if (typeof fetcher !== "function") {
      throw new Error("Fetch API is unavailable.");
    }

    const response = await fetcher(LATEST_RELEASE_URL, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`latest.json request failed with ${response.status}`);
    }

    return normalizeRelease(await response.json());
  } catch {
    return { ...FALLBACK_RELEASE };
  }
}
