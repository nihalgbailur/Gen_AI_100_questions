"use strict";

const MARKDOWN_PATH = "../learning/docker.md";
const LOCAL_SERVER_COMMAND = "python3 -m http.server 8000";
const REPO_PATH = "/Users/nihalgbailur/Desktop/Gen_AI_100_questions";
const VISUALIZER_URL = "http://localhost:8000/vizualizer/index.html";

const elements = {
  meta: document.getElementById("meta"),
  toc: document.getElementById("toc"),
  content: document.getElementById("content"),
  search: document.getElementById("search-input"),
  progress: document.getElementById("progress-bar"),
  status: document.getElementById("status-banner"),
  sectionCount: document.getElementById("section-count"),
  matchCount: document.getElementById("match-count"),
  activeSection: document.getElementById("active-section"),
  tocToggle: document.getElementById("toc-toggle"),
  sidebar: document.getElementById("sidebar"),
};

const state = {
  headings: [],
  sections: [],
  tocLinks: new Map(),
  activeHeadingId: "",
};

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function setStatus(message, tone = "info", allowHtml = false) {
  elements.status.className = `status is-${tone}`;
  if (allowHtml) {
    elements.status.innerHTML = message;
    return;
  }
  elements.status.textContent = message;
}

function slugify(rawText) {
  return rawText
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function withUniqueSlug(baseSlug, usedSlugs) {
  let candidate = baseSlug || "section";
  if (!usedSlugs.has(candidate)) {
    usedSlugs.add(candidate);
    return candidate;
  }

  let counter = 2;
  while (usedSlugs.has(`${candidate}-${counter}`)) {
    counter += 1;
  }
  const uniqueCandidate = `${candidate}-${counter}`;
  usedSlugs.add(uniqueCandidate);
  return uniqueCandidate;
}

function updateUrlParams({ query, sectionId }) {
  const params = new URLSearchParams(window.location.search);

  if (typeof query !== "undefined") {
    const normalizedQuery = query.trim();
    if (normalizedQuery) {
      params.set("q", normalizedQuery);
    } else {
      params.delete("q");
    }
  }

  if (typeof sectionId !== "undefined") {
    if (sectionId) {
      params.set("section", sectionId);
    } else {
      params.delete("section");
    }
  }

  const nextSearch = params.toString();
  const nextUrl = `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ""}${window.location.hash}`;
  window.history.replaceState(null, "", nextUrl);
}

function extractMetadata(markdownText) {
  const metadata = {};
  const metadataRegex = /^>\s+\*\*([^*]+)\*\*:\s*(.+)$/;
  const lines = markdownText.split("\n");

  for (const rawLine of lines) {
    const line = rawLine.trim();
    const match = line.match(metadataRegex);
    if (!match) {
      continue;
    }

    const key = match[1].trim();
    const value = match[2].trim();
    metadata[key] = value;
  }

  return metadata;
}

function renderMetadata(metadata) {
  const orderedKeys = ["Audience", "Prerequisites", "Estimated time", "Last reviewed", "Tags"];
  elements.meta.innerHTML = "";

  for (const key of orderedKeys) {
    if (!metadata[key]) {
      continue;
    }

    const wrapper = document.createElement("section");
    wrapper.className = "meta-item";

    const label = document.createElement("p");
    label.className = "meta-label";
    label.textContent = key;
    wrapper.append(label);

    if (key === "Tags") {
      const tags = metadata[key]
        .split(",")
        .map((entry) => entry.replaceAll("`", "").trim())
        .filter(Boolean);

      const tagsContainer = document.createElement("div");
      tagsContainer.className = "meta-tags";

      for (const tag of tags) {
        const chip = document.createElement("span");
        chip.className = "tag";
        chip.textContent = tag;
        tagsContainer.append(chip);
      }
      wrapper.append(tagsContainer);
    } else {
      const value = document.createElement("p");
      value.className = "meta-value";
      value.textContent = metadata[key].replaceAll("`", "");
      wrapper.append(value);
    }

    elements.meta.append(wrapper);
  }
}

function configureMarkdownRenderer() {
  if (!window.marked) {
    throw new Error("Marked library is not available.");
  }
  window.marked.setOptions({
    gfm: true,
    breaks: false,
  });
}

function renderMarkdownToHtml(markdownText) {
  const html = window.marked.parse(markdownText);
  if (window.DOMPurify) {
    return window.DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
  }
  return html;
}

function assignHeadingIds(root) {
  const usedSlugs = new Set();
  const headings = root.querySelectorAll("h1, h2, h3, h4, h5, h6");

  for (const heading of headings) {
    const baseSlug = slugify(heading.textContent || "");
    heading.id = withUniqueSlug(baseSlug, usedSlugs);
  }
}

function groupIntoSections(root) {
  const existingNodes = Array.from(root.childNodes);
  root.textContent = "";

  const fragment = document.createDocumentFragment();
  let currentSection = document.createElement("section");
  currentSection.className = "doc-section";
  currentSection.dataset.sectionLabel = "Overview";
  fragment.append(currentSection);

  for (const node of existingNodes) {
    if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "H2") {
      currentSection = document.createElement("section");
      currentSection.className = "doc-section";
      currentSection.dataset.sectionLabel = node.textContent?.trim() || "Untitled";
      fragment.append(currentSection);
    }
    currentSection.append(node);
  }

  if (!fragment.firstChild?.textContent?.trim()) {
    fragment.firstChild?.remove();
  }

  root.append(fragment);

  state.sections = Array.from(root.querySelectorAll(".doc-section"));
  for (const section of state.sections) {
    section.dataset.searchText = section.textContent.toLowerCase();
  }
}

function decorateCallouts(root) {
  const paragraphs = root.querySelectorAll("p");
  for (const paragraph of paragraphs) {
    const text = paragraph.textContent.trim();
    if (text.startsWith("🎯 One-Liner")) {
      paragraph.classList.add("callout", "one-liner");
      continue;
    }
    if (text.startsWith("📖 ")) {
      paragraph.classList.add("callout", "detail");
    }
  }
}

function createCopyButton(codeText) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "code-copy";
  button.textContent = "Copy";

  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      button.textContent = "Copied";
      button.dataset.state = "ok";
    } catch (error) {
      button.textContent = "Failed";
      button.dataset.state = "error";
    }
    window.setTimeout(() => {
      button.textContent = "Copy";
      button.dataset.state = "";
    }, 1200);
  });

  return button;
}

function prepareCodeAndMermaidBlocks(root) {
  const codeNodes = Array.from(root.querySelectorAll("pre > code"));
  for (const codeNode of codeNodes) {
    const pre = codeNode.parentElement;
    if (!pre) {
      continue;
    }

    const classList = Array.from(codeNode.classList);
    const languageClass = classList.find((className) => className.startsWith("language-")) || "";
    const language = languageClass.replace("language-", "").toLowerCase();

    if (language === "mermaid") {
      const frame = document.createElement("div");
      frame.className = "mermaid-frame";

      const diagram = document.createElement("div");
      diagram.className = "mermaid";
      diagram.textContent = codeNode.textContent;
      diagram.dataset.source = codeNode.textContent;

      frame.append(diagram);
      pre.replaceWith(frame);
      continue;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "code-shell";

    const copyButton = createCopyButton(codeNode.textContent);
    pre.replaceWith(wrapper);
    wrapper.append(copyButton, pre);

    if (window.hljs) {
      window.hljs.highlightElement(codeNode);
    }
  }
}

async function renderMermaidDiagrams(root) {
  const diagramNodes = Array.from(root.querySelectorAll(".mermaid"));
  if (!diagramNodes.length) {
    return "ok";
  }

  if (!window.mermaid) {
    setStatus("Mermaid library is unavailable. Diagram source is still shown.", "warn");
    return "warn";
  }

  window.mermaid.initialize({
    startOnLoad: false,
    securityLevel: "loose",
    theme: "dark",
  });

  try {
    await window.mermaid.run({ nodes: diagramNodes });
    return "ok";
  } catch (error) {
    for (const node of diagramNodes) {
      const fallback = document.createElement("pre");
      fallback.className = "mermaid-fallback";
      fallback.textContent = node.dataset.source || node.textContent;
      const host = node.closest(".mermaid-frame") || node;
      host.replaceWith(fallback);
    }
    setStatus("Mermaid rendering failed in the browser. Showing diagram source blocks.", "warn");
    return "warn";
  }
}

function updateStats() {
  const totalSections = state.sections.length;
  const visibleSections = state.sections.filter((section) => !section.classList.contains("dimmed")).length;
  elements.sectionCount.textContent = String(totalSections);
  elements.matchCount.textContent = String(visibleSections);
}

function setActiveHeading(headingId) {
  if (!headingId || state.activeHeadingId === headingId) {
    return;
  }

  if (state.activeHeadingId) {
    state.tocLinks.get(state.activeHeadingId)?.classList.remove("active");
  }

  state.activeHeadingId = headingId;
  const activeLink = state.tocLinks.get(headingId);
  if (activeLink) {
    activeLink.classList.add("active");
    elements.activeSection.textContent = activeLink.textContent || "None";
  }
}

function scrollToHeading(headingId, pushToUrl = false) {
  const heading = document.getElementById(headingId);
  if (!heading) {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  heading.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
  setActiveHeading(headingId);

  if (pushToUrl) {
    updateUrlParams({ sectionId: headingId });
  }
}

function buildToc(root) {
  elements.toc.innerHTML = "";
  state.tocLinks.clear();

  const headings = Array.from(root.querySelectorAll("h2, h3"));
  state.headings = headings;

  const list = document.createElement("ul");
  for (const heading of headings) {
    const listItem = document.createElement("li");
    listItem.className = `level-${heading.tagName.toLowerCase()}`;

    const link = document.createElement("a");
    link.href = `?section=${encodeURIComponent(heading.id)}`;
    link.textContent = heading.textContent?.trim() || heading.id;
    link.dataset.target = heading.id;
    link.addEventListener("click", (event) => {
      event.preventDefault();
      scrollToHeading(heading.id, true);
      if (window.innerWidth <= 1024) {
        document.body.classList.remove("sidebar-open");
        elements.tocToggle.setAttribute("aria-expanded", "false");
      }
    });

    listItem.append(link);
    list.append(listItem);
    state.tocLinks.set(heading.id, link);
  }

  elements.toc.append(list);
}

function applySearchFilter(queryText) {
  const normalizedQuery = queryText.trim().toLowerCase();

  for (const section of state.sections) {
    const sectionText = section.dataset.searchText || "";
    const matches = !normalizedQuery || sectionText.includes(normalizedQuery);
    section.classList.toggle("dimmed", Boolean(normalizedQuery) && !matches);
  }

  for (const [headingId, link] of state.tocLinks.entries()) {
    const heading = document.getElementById(headingId);
    const section = heading?.closest(".doc-section");
    const headingText = heading?.textContent?.toLowerCase() || "";
    const sectionMatches = section ? !section.classList.contains("dimmed") : true;
    const headingMatches = !normalizedQuery || headingText.includes(normalizedQuery) || sectionMatches;
    link.classList.toggle("hidden", Boolean(normalizedQuery) && !headingMatches);
  }

  updateStats();
  updateUrlParams({ query: queryText });
}

function updateReadingProgress() {
  const scrollTop = window.scrollY;
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollableHeight <= 0 ? 0 : (scrollTop / scrollableHeight) * 100;
  elements.progress.style.width = `${Math.min(100, Math.max(0, percent)).toFixed(2)}%`;
}

function updateScrollSpy() {
  if (!state.headings.length) {
    return;
  }

  const offset = 210;
  let current = state.headings[0];
  for (const heading of state.headings) {
    if (heading.getBoundingClientRect().top - offset <= 0) {
      current = heading;
      continue;
    }
    break;
  }
  setActiveHeading(current.id);
}

function attachGlobalEvents() {
  elements.search.addEventListener("input", (event) => {
    applySearchFilter(event.target.value);
  });

  elements.tocToggle.addEventListener("click", () => {
    const willOpen = !document.body.classList.contains("sidebar-open");
    document.body.classList.toggle("sidebar-open", willOpen);
    elements.tocToggle.setAttribute("aria-expanded", String(willOpen));
  });

  document.addEventListener("click", (event) => {
    if (window.innerWidth > 1024 || !document.body.classList.contains("sidebar-open")) {
      return;
    }

    const clickedInsideSidebar = elements.sidebar.contains(event.target);
    const clickedToggle = elements.tocToggle.contains(event.target);
    if (!clickedInsideSidebar && !clickedToggle) {
      document.body.classList.remove("sidebar-open");
      elements.tocToggle.setAttribute("aria-expanded", "false");
    }
  });

  window.addEventListener("scroll", () => {
    updateReadingProgress();
    updateScrollSpy();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      document.body.classList.remove("sidebar-open");
      elements.tocToggle.setAttribute("aria-expanded", "false");
    }
    updateReadingProgress();
    updateScrollSpy();
  });
}

function applyInitialUrlState() {
  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get("q") || "";
  const initialSection = params.get("section") || "";

  if (initialQuery) {
    elements.search.value = initialQuery;
    applySearchFilter(initialQuery);
  } else {
    updateStats();
  }

  if (initialSection) {
    window.setTimeout(() => {
      scrollToHeading(initialSection, false);
    }, 60);
  } else {
    updateScrollSpy();
  }
}

async function fetchMarkdown() {
  const response = await fetch(MARKDOWN_PATH, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Unable to fetch markdown (${response.status}).`);
  }
  return response.text();
}

function showFetchError() {
  const errorMessage = [
    `Unable to load <code>${escapeHtml(MARKDOWN_PATH)}</code>.`,
    `Run <code>${escapeHtml(LOCAL_SERVER_COMMAND)}</code> from`,
    `<code>${escapeHtml(REPO_PATH)}</code> and then open`,
    `<code>${escapeHtml(VISUALIZER_URL)}</code>.`,
  ].join(" ");
  setStatus(errorMessage, "error", true);
}

function showFileProtocolError() {
  const message = [
    "This page cannot fetch markdown over <code>file://</code>.",
    `Run <code>${escapeHtml(LOCAL_SERVER_COMMAND)}</code> from <code>${escapeHtml(REPO_PATH)}</code>.`,
    `Then open <code>${escapeHtml(VISUALIZER_URL)}</code>.`,
  ].join(" ");
  setStatus(message, "error", true);
}

async function initialize() {
  attachGlobalEvents();

  if (window.location.protocol === "file:") {
    showFileProtocolError();
    return;
  }

  setStatus("Loading markdown content...", "info");

  try {
    const markdown = await fetchMarkdown();
    renderMetadata(extractMetadata(markdown));

    configureMarkdownRenderer();
    elements.content.innerHTML = renderMarkdownToHtml(markdown);

    assignHeadingIds(elements.content);
    groupIntoSections(elements.content);
    decorateCallouts(elements.content);
    prepareCodeAndMermaidBlocks(elements.content);
    buildToc(elements.content);
    const mermaidStatus = await renderMermaidDiagrams(elements.content);

    applyInitialUrlState();
    updateReadingProgress();
    if (mermaidStatus === "warn") {
      return;
    }
    setStatus("Loaded learning/docker.md successfully.", "ok");
  } catch (error) {
    showFetchError();
  }
}

initialize();
