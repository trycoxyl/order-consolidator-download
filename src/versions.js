import { formatBytes } from "./release.js";

export const GITHUB_RELEASES_URL =
  "https://api.github.com/repos/trycoxyl/warehouse-order-consolidator-releases/releases?per_page=100";

export const FALLBACK_HISTORY = [
  {
    version: "v0.6.10",
    title: "Guided reconciliation and batch reporting",
    date: "Jun 10, 2026",
    impact: "Guided reconciliation, persistent review state, and lighter batch reporting help operators see what is ready, what needs attention, and what to do next without hunting across screens.",
    notes: [
      "Adds a Reconciliation Control Room with a decision banner, KPI cards, and a focused Action Queue.",
      "Keeps tracking-only, parser warning, and courier review decisions persistent while refreshing only affected surfaces.",
      "Adds Line-Based AWB Pack plus a collapsed Report / Batch History panel with clearer operation narrative sections.",
    ],
    downloadUrl: "https://github.com/trycoxyl/warehouse-order-consolidator-releases/releases/tag/v0.6.10",
    sizeLabel: "",
    isFallback: true,
  },
  {
    version: "v0.6.9",
    title: "AWB preview and app branding",
    date: "Jun 9, 2026",
    impact: "Compact AWB preview, Product Master usability refinements, and packaged logo assets improve print checks and polish the shipped desktop app experience.",
    notes: [
      "Adds a compact AWB PDF preview for faster shipment review.",
      "Improves Product Master usability for day-to-day maintenance work.",
      "Packages updated logo and icon assets into the desktop build.",
    ],
    downloadUrl: "https://github.com/trycoxyl/warehouse-order-consolidator-releases/releases/tag/v0.6.9",
    sizeLabel: "",
    isFallback: true,
  },
  {
    version: "v0.6.8",
    title: "Seeded staff login release",
    date: "Jun 7, 2026",
    impact: "New staff data folders can open at Login with the prepared seed database, while existing data folders are left untouched.",
    notes: [
      "Prepared seed SQLite database included with the release.",
      "Fresh staff Data Folders show Login instead of First Admin Setup.",
      "Existing Data Folder databases are never overwritten.",
    ],
    downloadUrl: "https://github.com/trycoxyl/warehouse-order-consolidator-releases/releases/tag/v0.6.8",
    sizeLabel: "",
    isFallback: true,
  },
  {
    version: "v0.6.7",
    title: "Shared Config Folder Auto-Setup",
    date: "Jun 7, 2026",
    impact: "Shared config folder setup reduces manual path setup for teams using Google Drive Desktop or similar shared folders.",
    notes: [
      "Auto Configure detects Google Drive Desktop.",
      "Creates OrderConsolidator-Sync and saves the path automatically.",
      "Adds simple Shared Config Status and keeps Browse Folder fallback.",
    ],
    downloadUrl: "https://github.com/trycoxyl/warehouse-order-consolidator-releases/releases/tag/v0.6.7",
    sizeLabel: "",
    isFallback: true,
  },
  {
    version: "v0.6.6",
    title: "Shared folder config sync",
    date: "Jun 7, 2026",
    impact: "Shared-folder sync helps keep user and company access updates consistent without requiring every station to use a GitHub token.",
    notes: [
      "Supports Google Drive Desktop, OneDrive, Dropbox, NAS, or LAN folders.",
      "Adds Sync Latest Config and Publish Config.",
      "Adds SuperAdmin shared config setup and read/write diagnostics.",
    ],
    downloadUrl: "https://github.com/trycoxyl/warehouse-order-consolidator-releases/releases/tag/v0.6.6",
    sizeLabel: "",
    isFallback: true,
  },
  {
    version: "v0.6.5",
    title: "Permission scoping and live Global Config publish",
    date: "Jun 7, 2026",
    impact: "Permission scoping keeps company admins focused on their own users and audit rows while superadmin retains full visibility.",
    notes: [
      "Companies are visible only to superadmin.",
      "Company admins see assigned-company users and audit trail rows.",
      "Publish Global Config updates the public config files.",
    ],
    downloadUrl: "https://github.com/trycoxyl/warehouse-order-consolidator-releases/releases/tag/v0.6.5",
    sizeLabel: "",
    isFallback: true,
  },
  {
    version: "v0.6.4",
    title: "Global Config Sync release",
    date: "Jun 7, 2026",
    impact: "Global config sync gives admins a way to publish access configuration and lets stations refresh it at startup or manually.",
    notes: [
      "Adds access-only global_config.json support.",
      "Adds startup and manual config sync.",
      "Adds admin publish workflow.",
    ],
    downloadUrl: "https://github.com/trycoxyl/warehouse-order-consolidator-releases/releases/tag/v0.6.4",
    sizeLabel: "",
    isFallback: true,
  },
  {
    version: "v0.6.2",
    title: "Offline local login and roles",
    date: "Jun 7, 2026",
    impact: "Local login and role separation help the desktop app run in warehouse environments without depending on an online login service.",
    notes: [
      "Adds offline local login.",
      "Adds Admin and Warehouse User roles.",
      "Adds audit trail and packaged manual updater release.",
    ],
    downloadUrl: "https://github.com/trycoxyl/warehouse-order-consolidator-releases/releases/tag/v0.6.2",
    sizeLabel: "",
    isFallback: true,
  },
  {
    version: "v0.6.1",
    title: "Manual updater publishing path",
    date: "Jun 7, 2026",
    impact: "Manual updater diagnostics make it easier to verify the update path before asking users to replace their desktop ZIP.",
    notes: [
      "Adds client-ready manual updater diagnostics.",
      "Adds real update publishing path.",
    ],
    downloadUrl: "https://github.com/trycoxyl/warehouse-order-consolidator-releases/releases/tag/v0.6.1",
    sizeLabel: "",
    isFallback: true,
  },
];

export function formatReleaseDate(value) {
  if (!value) return "Date unavailable";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function getImpactSummary(version, text = "") {
  const haystack = `${version} ${text}`.toLowerCase();

  if (haystack.includes("guided reconciliation") || haystack.includes("batch reporting")) {
    return "Guided reconciliation, persistent review state, and lighter batch reporting help operators see what is ready, what needs attention, and what to do next without hunting across screens.";
  }

  if (haystack.includes("awb preview") || haystack.includes("app branding")) {
    return "Compact AWB preview, Product Master usability refinements, and packaged logo assets improve print checks and polish the shipped desktop app experience.";
  }

  if (haystack.includes("seeded staff") || haystack.includes("first admin setup")) {
    return "New staff data folders can open at Login with the prepared seed database, while existing data folders are left untouched.";
  }

  if (haystack.includes("auto configure") || haystack.includes("shared config folder auto")) {
    return "Shared config folder setup reduces manual path setup for teams using Google Drive Desktop or similar shared folders.";
  }

  if (haystack.includes("shared folder config sync")) {
    return "Shared-folder sync helps keep user and company access updates consistent without requiring every station to use a GitHub token.";
  }

  if (haystack.includes("permission scoping") || haystack.includes("company admins")) {
    return "Permission scoping keeps company admins focused on their own users and audit rows while superadmin retains full visibility.";
  }

  if (haystack.includes("global config sync")) {
    return "Global config sync gives admins a way to publish access configuration and lets stations refresh it at startup or manually.";
  }

  if (haystack.includes("offline local login") || haystack.includes("warehouse user roles")) {
    return "Local login and role separation help the desktop app run in warehouse environments without depending on an online login service.";
  }

  if (haystack.includes("manual updater")) {
    return "Manual updater diagnostics make it easier to verify the update path before asking users to replace their desktop ZIP.";
  }

  return text.split(/\r?\n/).find(Boolean)?.replace(/^[-#*\s]+/, "").trim() || "Maintenance update for Order Consolidator.";
}

function parseReleaseBody(body = "") {
  const lines = String(body)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const rawHeading = lines[0] || "Order Consolidator update";
  const inlineNotes = [];
  const inlineIncludes = rawHeading.match(/^(.*?)(?:\.\s+)?(Includes\s+.+)$/i);
  const headingSource = inlineIncludes ? inlineIncludes[1] : rawHeading;

  if (inlineIncludes?.[2]) {
    inlineNotes.push(inlineIncludes[2]);
  }

  const heading =
    headingSource
      .replace(/\s+release built from source tag\s+v[\d.]+\s+at commit\s+[0-9a-f]+\.?$/i, "")
      .replace(/[.]+$/, "")
      .trim() || "Order Consolidator update";
  const notes = lines
    .slice(1)
    .concat(inlineNotes)
    .map((line) => cleanClientReleaseNote(line.replace(/^[-*]\s*/, "")))
    .filter(Boolean);

  return {
    heading,
    notes: notes.length ? notes : [heading],
  };
}

function cleanClientReleaseNote(note = "") {
  return String(note)
    .replace(/^Release ZIP includes\s+/i, "Includes ")
    .replace(/\bZIP\b/g, "release package")
    .trim();
}

export function normalizeGithubRelease(release = {}) {
  const asset = release.assets?.find((item) => item.browser_download_url) || release.assets?.[0] || {};
  const parsed = parseReleaseBody(release.body);

  return {
    version: release.tag_name || "Version unavailable",
    title: parsed.heading,
    date: formatReleaseDate(release.published_at),
    impact: getImpactSummary(release.tag_name, release.body || release.name || ""),
    notes: parsed.notes,
    downloadUrl: asset.browser_download_url || release.html_url || "",
    sizeLabel: formatBytes(asset.size),
    isFallback: false,
  };
}

export async function loadReleaseHistory(fetcher = globalThis.fetch) {
  try {
    if (typeof fetcher !== "function") {
      throw new Error("Fetch API is unavailable.");
    }

    const response = await fetcher(GITHUB_RELEASES_URL, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!response.ok) {
      throw new Error(`GitHub releases request failed with ${response.status}`);
    }

    const payload = await response.json();
    const releases = Array.isArray(payload) ? payload.map(normalizeGithubRelease) : [];
    return releases.length ? releases : FALLBACK_HISTORY.map((release) => ({ ...release }));
  } catch {
    return FALLBACK_HISTORY.map((release) => ({ ...release }));
  }
}
