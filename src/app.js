import { FALLBACK_RELEASE, getDownloadUrl, loadLatestRelease } from "./release.js";

const els = {
  releaseVersion: document.querySelector("#release-version"),
  releaseDate: document.querySelector("#release-date"),
  releasePackage: document.querySelector("#release-package"),
  releaseNotes: document.querySelector("#release-notes"),
  releaseStatus: document.querySelector("#release-status-text"),
  fallbackMessage: document.querySelector("#fallback-message"),
  manualReleaseLink: document.querySelector("#manual-release-link"),
  downloadLinks: document.querySelectorAll("[data-download-link]"),
};

function setText(element, value) {
  if (element) element.textContent = value;
}

function renderNotes(notes) {
  if (!els.releaseNotes) return;

  els.releaseNotes.replaceChildren(
    ...notes.slice(0, 2).map((note) => {
      const item = document.createElement("li");
      item.textContent = note;
      return item;
    }),
  );
}

function renderDownloadLinks(release) {
  const downloadUrl = getDownloadUrl(release);
  els.downloadLinks.forEach((link) => {
    link.href = downloadUrl;
    link.rel = "noopener";

    if (release.isFallback) {
      link.textContent = link.classList.contains("button-small")
        ? "Releases"
        : "Open GitHub Releases";
      link.removeAttribute("download");
      return;
    }

    link.textContent = link.classList.contains("button-small")
      ? "Download"
      : "Download Latest Version";
    link.setAttribute("download", "");
  });
}

function renderRelease(release) {
  setText(els.releaseVersion, release.version);
  setText(els.releaseDate, release.releaseDate);

  const packageParts = ["ZIP download", release.downloadSizeLabel, release.sha256Short && `SHA ${release.sha256Short}`]
    .filter(Boolean)
    .join(" | ");
  setText(els.releasePackage, packageParts);
  setText(els.releaseStatus, release.isFallback ? "Manual release link available" : "Latest release loaded");

  if (els.fallbackMessage) {
    els.fallbackMessage.hidden = !release.isFallback;
  }

  if (els.manualReleaseLink) {
    els.manualReleaseLink.href = release.manualReleasesUrl || FALLBACK_RELEASE.manualReleasesUrl;
  }

  renderNotes(release.releaseNotes);
  renderDownloadLinks(release);
}

loadLatestRelease().then(renderRelease);
