import { FALLBACK_RELEASE, getDownloadUrl, loadLatestRelease } from "./release.js";

const els = {
  navVersion: document.querySelector("#nav-version"),
  downloadMeta: document.querySelector("#download-meta"),
  cardVersion: document.querySelector("#card-version"),
  fallbackMessage: document.querySelector("#fallback-message"),
  manualReleaseLink: document.querySelector("#manual-release-link"),
  downloadLinks: document.querySelectorAll("[data-download-link]"),
};

function setText(element, value) {
  if (element) element.textContent = value;
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
      : "Download Latest";
    link.setAttribute("download", "");
  });
}

function renderRelease(release) {
  const versionLabel = release.isFallback ? "Version" : `Version ${release.version}`;
  const metaParts = [release.isFallback ? "Manual releases available" : `Version ${release.version}`, release.downloadSizeLabel]
    .filter(Boolean)
    .join(" | ");

  setText(els.navVersion, versionLabel);
  setText(els.downloadMeta, metaParts);
  setText(els.cardVersion, release.isFallback ? "ZIP" : `v${release.version}`);

  if (els.fallbackMessage) {
    els.fallbackMessage.hidden = !release.isFallback;
  }

  if (els.manualReleaseLink) {
    els.manualReleaseLink.href = release.manualReleasesUrl || FALLBACK_RELEASE.manualReleasesUrl;
  }

  renderDownloadLinks(release);
}

loadLatestRelease().then(renderRelease);
