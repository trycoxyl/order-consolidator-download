import { loadReleaseHistory } from "./versions.js";

const stack = document.querySelector("#version-stack");

function createList(notes) {
  const list = document.createElement("ul");
  list.className = "version-notes";

  notes.slice(0, 4).forEach((note) => {
    const item = document.createElement("li");
    item.textContent = note;
    list.append(item);
  });

  return list;
}

function createReleaseCard(release, index) {
  const card = document.createElement("article");
  card.className = "version-card";
  card.style.setProperty("--stack-index", index);

  const head = document.createElement("div");
  head.className = "version-card-head";

  const version = document.createElement("span");
  version.textContent = release.version;
  const date = document.createElement("time");
  date.textContent = release.date;
  head.append(version, date);

  const title = document.createElement("h2");
  title.textContent = release.title;

  const impact = document.createElement("p");
  impact.className = "version-impact";
  impact.textContent = release.impact;

  const footer = document.createElement("div");
  footer.className = "version-card-footer";

  const size = document.createElement("span");
  size.textContent = release.sizeLabel ? `ZIP ${release.sizeLabel}` : "Release ZIP";

  const link = document.createElement("a");
  link.href = release.downloadUrl;
  link.rel = "noopener";
  link.textContent = release.isFallback ? "Open release" : "Download ZIP";

  footer.append(size, link);
  card.append(head, title, impact, createList(release.notes), footer);

  return card;
}

async function renderReleaseHistory() {
  if (!stack) return;

  const releases = await loadReleaseHistory();
  stack.replaceChildren(...releases.map(createReleaseCard));
}

renderReleaseHistory();
