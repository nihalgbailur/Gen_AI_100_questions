"use strict";

const MARKDOWN_PATH = "../learning/docker.md";
const LOCAL_SERVER_COMMAND = "python3 -m http.server 8000";
const REPO_PATH = "/Users/nihalgbailur/Desktop/Gen_AI_100_questions";
const LAB_URL = "http://localhost:8000/vizualizer/concept-lab.html";
const AUTOPLAY_INTERVAL_MS = 2200;

const CONCEPT_ORDER = ["image-container", "layers", "networking", "volumes"];

const elements = {
  status: document.getElementById("status-banner"),
  tabs: Array.from(document.querySelectorAll(".tab[data-concept]")),
  stepLabel: document.getElementById("step-label"),
  timeline: document.getElementById("timeline-track"),
  controls: document.getElementById("step-controls"),
  prev: document.getElementById("prev-step"),
  next: document.getElementById("next-step"),
  playPause: document.getElementById("play-pause"),
  reset: document.getElementById("reset-step"),
  svg: document.getElementById("concept-svg"),
  title: document.getElementById("concept-title"),
  oneLiner: document.getElementById("one-liner"),
  detail: document.getElementById("detail-text"),
  commandCode: document.getElementById("command-code"),
  copyCommand: document.getElementById("copy-command"),
  sourceLink: document.getElementById("source-link"),
  headerSourceLink: document.getElementById("header-source-link"),
};

const state = {
  currentConcept: "image-container",
  currentStep: 0,
  isAutoplaying: false,
  autoplayTimer: null,
  prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  parsedContent: {},
  warnings: [],
};

const CONCEPT_DEFS = {
  "image-container": {
    label: "Image vs Container Lifecycle",
    sourceHeading: "Image vs Container",
    codeHeadings: ["Container Commands", "Image Commands"],
    steps: [
      "Highlight Dockerfile blueprint",
      "Build Docker image from Dockerfile",
      "Run multiple containers from one image",
      "Emphasize immutable image and independent instances",
    ],
    fallback: {
      oneLiner:
        "An image is a read-only template (like a class); a container is a running instance (like an object).",
      detail:
        "One Dockerfile builds one immutable image. That image can run as many containers as needed, each with an independent runtime lifecycle.",
      commands: "docker build -t myapp:v1 .\ndocker run --name app-a myapp:v1\ndocker run --name app-b myapp:v1",
    },
    render: renderImageContainerScene,
  },
  layers: {
    label: "Image Layers and Cache",
    sourceHeading: "Image Layers",
    codeHeadings: ["Best Practices for Dockerfile", "Image Commands"],
    steps: [
      "Build image layer stack bottom-up",
      "Mark unchanged layers as cache hits",
      "Simulate source change at app code layer",
      "Rebuild only invalidated layers above change",
    ],
    fallback: {
      oneLiner:
        "Docker images are built in layers; each instruction creates a new layer and caches can speed up rebuilds.",
      detail:
        "If a lower layer changes, Docker invalidates that layer and rebuilds the layers above it. Keep stable dependency layers early for faster builds.",
      commands:
        "COPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\ndocker build -t myapp:v1 .",
    },
    render: renderLayersScene,
  },
  networking: {
    label: "Container Networking Communication",
    sourceHeading: "Container Communication",
    codeHeadings: ["Container Communication", "Network Commands"],
    steps: [
      "Place web, db, and redis in one bridge network",
      "Route host traffic into web service",
      "Resolve service names for db and redis",
      "Return successful response from web to host",
    ],
    fallback: {
      oneLiner:
        "Containers on the same Docker network can communicate using container names as hostnames.",
      detail:
        "Application containers use service names like db:5432 and redis:6379 instead of hardcoded IPs, making setups portable and easier to scale.",
      commands:
        "docker network create mynet\ndocker run -d --name db --network mynet postgres\ndocker run -d --name web --network mynet myapp",
    },
    render: renderNetworkingScene,
  },
  volumes: {
    label: "Volume Persistence Across Containers",
    sourceHeading: "Why Volumes?",
    codeHeadings: ["Volume Commands", "Volume Types"],
    steps: [
      "Write data from container to named volume",
      "Remove container while volume remains",
      "Attach same volume to a new container",
      "Verify persisted data is still available",
    ],
    fallback: {
      oneLiner:
        "Volumes persist data outside containers; without them, data is lost when containers are removed.",
      detail:
        "Named volumes keep application state across container restarts, deletions, and recreations, which is critical for databases and durable app data.",
      commands:
        "docker volume create mydata\ndocker run --name app-a -v mydata:/app/data myimage\ndocker rm -f app-a\ndocker run --name app-b -v mydata:/app/data myimage",
    },
    render: renderVolumesScene,
  },
};

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
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

function setStatus(message, tone = "info", allowHtml = false) {
  elements.status.className = `status is-${tone}`;
  if (allowHtml) {
    elements.status.innerHTML = message;
    return;
  }
  elements.status.textContent = message;
}

function updateQueryParams({ concept, autoplay }) {
  const params = new URLSearchParams(window.location.search);

  if (concept) {
    params.set("concept", concept);
  } else {
    params.delete("concept");
  }

  if (autoplay) {
    params.set("autoplay", "1");
  } else {
    params.delete("autoplay");
  }

  const nextSearch = params.toString();
  const nextUrl = `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ""}`;
  window.history.replaceState(null, "", nextUrl);
}

function parseAllHeadingSlugs(markdownText) {
  const lines = markdownText.split(/\r?\n/);
  const usedSlugs = new Set();
  const map = new Map();

  for (const rawLine of lines) {
    const headingMatch = rawLine.match(/^#{1,6}\s+(.+?)\s*$/);
    if (!headingMatch) {
      continue;
    }
    const headingText = headingMatch[1].replace(/\s+#*$/, "").trim();
    const slug = withUniqueSlug(slugify(headingText), usedSlugs);
    if (!map.has(headingText)) {
      map.set(headingText, slug);
    }
  }

  return map;
}

function parseLevel3Sections(markdownText) {
  const lines = markdownText.split(/\r?\n/);
  const sectionMap = new Map();
  let currentHeading = "";
  let currentBody = [];

  for (const rawLine of lines) {
    const headingMatch = rawLine.match(/^###\s+(.+?)\s*$/);
    if (headingMatch) {
      if (currentHeading) {
        sectionMap.set(currentHeading, currentBody.join("\n"));
      }
      currentHeading = headingMatch[1].trim();
      currentBody = [];
      continue;
    }
    if (currentHeading) {
      currentBody.push(rawLine);
    }
  }

  if (currentHeading) {
    sectionMap.set(currentHeading, currentBody.join("\n"));
  }

  return sectionMap;
}

function extractOneLiner(sectionBody) {
  const line = sectionBody
    .split(/\r?\n/)
    .map((entry) => entry.trim())
    .find((entry) => entry.includes("**🎯 One-Liner**:"));

  if (!line) {
    return "";
  }

  const value = line.split("**🎯 One-Liner**:")[1]?.trim() || "";
  return value.replace(/^["“]|["”]$/g, "").trim();
}

function extractDetailText(sectionBody) {
  const withoutCode = sectionBody.replace(/```[\s\S]*?```/g, " ");
  const lines = withoutCode
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const bullets = [];
  const sentences = [];

  for (const line of lines) {
    if (
      line.startsWith("**🎯") ||
      line.startsWith("**📖") ||
      line.startsWith("#") ||
      line.startsWith("|") ||
      line.startsWith(":") ||
      line.startsWith(">") ||
      line === "---"
    ) {
      continue;
    }

    if (line.startsWith("- ")) {
      bullets.push(line.slice(2).trim());
      continue;
    }

    const numberedMatch = line.match(/^\d+\.\s+(.+)/);
    if (numberedMatch) {
      bullets.push(numberedMatch[1].trim());
      continue;
    }

    sentences.push(line);
  }

  if (bullets.length) {
    return bullets.slice(0, 3).join(" ");
  }
  return sentences.slice(0, 3).join(" ");
}

function extractFirstNonMermaidCodeBlock(sectionBody) {
  const regex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
  let match;

  while ((match = regex.exec(sectionBody)) !== null) {
    const language = (match[1] || "").toLowerCase();
    if (language === "mermaid") {
      continue;
    }
    return match[2].trim();
  }

  return "";
}

function buildFallbackContent() {
  const fallback = {};
  for (const conceptKey of CONCEPT_ORDER) {
    const definition = CONCEPT_DEFS[conceptKey];
    fallback[conceptKey] = {
      sourceHeading: definition.sourceHeading,
      docSlug: slugify(definition.sourceHeading),
      oneLiner: definition.fallback.oneLiner,
      detail: definition.fallback.detail,
      commands: definition.fallback.commands,
    };
  }
  return fallback;
}

function buildParsedContent(markdownText) {
  const sections = parseLevel3Sections(markdownText);
  const headingSlugs = parseAllHeadingSlugs(markdownText);
  const content = {};
  const warnings = [];

  for (const conceptKey of CONCEPT_ORDER) {
    const definition = CONCEPT_DEFS[conceptKey];
    const sectionBody = sections.get(definition.sourceHeading);

    let oneLiner = definition.fallback.oneLiner;
    let detail = definition.fallback.detail;
    let commands = definition.fallback.commands;
    let usingFallback = false;

    if (!sectionBody) {
      warnings.push(`Missing source heading "${definition.sourceHeading}". Using fallback copy.`);
      usingFallback = true;
    } else {
      const extractedOneLiner = extractOneLiner(sectionBody);
      if (extractedOneLiner) {
        oneLiner = extractedOneLiner;
      } else {
        warnings.push(`One-liner not found in "${definition.sourceHeading}". Using fallback one-liner.`);
        usingFallback = true;
      }

      const extractedDetail = extractDetailText(sectionBody);
      if (extractedDetail) {
        detail = extractedDetail;
      }
    }

    const codeHeadingCandidates = [definition.sourceHeading, ...definition.codeHeadings];
    let codeFromMarkdown = "";
    for (const candidateHeading of codeHeadingCandidates) {
      const candidateSection = sections.get(candidateHeading);
      if (!candidateSection) {
        continue;
      }
      const candidateCode = extractFirstNonMermaidCodeBlock(candidateSection);
      if (candidateCode) {
        codeFromMarkdown = candidateCode;
        break;
      }
    }

    if (codeFromMarkdown) {
      commands = codeFromMarkdown;
    } else {
      warnings.push(`No command code block found for "${definition.label}". Using fallback commands.`);
      usingFallback = true;
    }

    content[conceptKey] = {
      sourceHeading: definition.sourceHeading,
      docSlug: headingSlugs.get(definition.sourceHeading) || slugify(definition.sourceHeading),
      oneLiner,
      detail,
      commands,
      usingFallback,
    };
  }

  return { content, warnings };
}

function clampStep(value, maxValue) {
  return Math.max(0, Math.min(maxValue, value));
}

function getConceptOrDefault(conceptKey) {
  return CONCEPT_ORDER.includes(conceptKey) ? conceptKey : CONCEPT_ORDER[0];
}

function isHighlightAvailable() {
  return typeof window.hljs !== "undefined" && typeof window.hljs.highlightElement === "function";
}

function renderCodeSnippet(content) {
  elements.commandCode.textContent = content.commands || "";
  if (isHighlightAvailable()) {
    elements.commandCode.className = "language-bash";
    window.hljs.highlightElement(elements.commandCode);
  }
}

function renderConceptDetails() {
  const definition = CONCEPT_DEFS[state.currentConcept];
  const content = state.parsedContent[state.currentConcept];

  elements.title.textContent = definition.label;
  elements.oneLiner.textContent = content.oneLiner;
  elements.detail.textContent = content.detail;
  renderCodeSnippet(content);

  const explorerHref = `./index.html?section=${encodeURIComponent(content.docSlug)}`;
  elements.sourceLink.href = explorerHref;
  elements.headerSourceLink.href = explorerHref;
  elements.sourceLink.textContent = `Open "${content.sourceHeading}" in Doc Explorer`;
}

function buildStepTimeline() {
  const definition = CONCEPT_DEFS[state.currentConcept];
  elements.timeline.textContent = "";

  definition.steps.forEach((stepLabel, stepIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "step-dot";
    button.textContent = `S${stepIndex + 1}`;
    button.title = stepLabel;
    button.setAttribute("aria-label", `Step ${stepIndex + 1}: ${stepLabel}`);
    button.addEventListener("click", () => {
      goToStep(stepIndex);
    });
    elements.timeline.append(button);
  });
}

function updateStepLabel() {
  const definition = CONCEPT_DEFS[state.currentConcept];
  const stepLabel = definition.steps[state.currentStep] || "";
  elements.stepLabel.textContent = `Step ${state.currentStep + 1}/${definition.steps.length}: ${stepLabel}`;

  const dots = Array.from(elements.timeline.querySelectorAll(".step-dot"));
  dots.forEach((dot, index) => {
    dot.classList.toggle("is-active", index === state.currentStep);
  });
}

function updateControlStates() {
  const maxStepIndex = CONCEPT_DEFS[state.currentConcept].steps.length - 1;
  elements.prev.disabled = state.currentStep <= 0;
  elements.next.disabled = state.currentStep >= maxStepIndex;
  elements.playPause.textContent = state.isAutoplaying ? "Pause" : "Play";
}

function baseSvgDefs() {
  return `
    <defs>
      <marker id="arrow-head" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
        <polygon points="0 0, 10 4, 0 8" fill="#8ec9eb"></polygon>
      </marker>
    </defs>
  `;
}

function renderStage() {
  const definition = CONCEPT_DEFS[state.currentConcept];
  elements.svg.innerHTML = definition.render(state.currentStep);
  elements.svg.setAttribute(
    "aria-label",
    `${definition.label}, step ${state.currentStep + 1} of ${definition.steps.length}`,
  );
}

function goToStep(stepIndex) {
  const maxStepIndex = CONCEPT_DEFS[state.currentConcept].steps.length - 1;
  state.currentStep = clampStep(stepIndex, maxStepIndex);
  renderStage();
  updateStepLabel();
  updateControlStates();

  if (state.isAutoplaying && state.currentStep >= maxStepIndex) {
    stopAutoplay();
  }
}

function stopAutoplay() {
  if (state.autoplayTimer) {
    window.clearInterval(state.autoplayTimer);
    state.autoplayTimer = null;
  }
  state.isAutoplaying = false;
  updateControlStates();
  updateQueryParams({ concept: state.currentConcept, autoplay: false });
}

function startAutoplay() {
  if (state.prefersReducedMotion) {
    setStatus("Autoplay is disabled because reduced-motion is enabled in your system preferences.", "warn");
    return;
  }

  const maxStepIndex = CONCEPT_DEFS[state.currentConcept].steps.length - 1;
  if (state.currentStep >= maxStepIndex) {
    state.currentStep = 0;
    renderStage();
    updateStepLabel();
    updateControlStates();
  }

  state.isAutoplaying = true;
  updateControlStates();
  updateQueryParams({ concept: state.currentConcept, autoplay: true });

  state.autoplayTimer = window.setInterval(() => {
    const nextStep = state.currentStep + 1;
    if (nextStep > maxStepIndex) {
      stopAutoplay();
      return;
    }
    goToStep(nextStep);
  }, AUTOPLAY_INTERVAL_MS);
}

function toggleAutoplay() {
  if (state.isAutoplaying) {
    stopAutoplay();
    return;
  }
  startAutoplay();
}

function selectConcept(conceptKey, pushHistory = true) {
  const normalizedKey = getConceptOrDefault(conceptKey);
  stopAutoplay();
  state.currentConcept = normalizedKey;
  state.currentStep = 0;

  elements.tabs.forEach((tab) => {
    const isActive = tab.dataset.concept === normalizedKey;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  });

  renderConceptDetails();
  buildStepTimeline();
  renderStage();
  updateStepLabel();
  updateControlStates();

  if (pushHistory) {
    updateQueryParams({ concept: normalizedKey, autoplay: false });
  }
}

function bindEvents() {
  elements.tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      selectConcept(tab.dataset.concept, true);
    });
  });

  elements.prev.addEventListener("click", () => {
    goToStep(state.currentStep - 1);
  });

  elements.next.addEventListener("click", () => {
    goToStep(state.currentStep + 1);
  });

  elements.playPause.addEventListener("click", () => {
    toggleAutoplay();
  });

  elements.reset.addEventListener("click", () => {
    stopAutoplay();
    goToStep(0);
  });

  elements.controls.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToStep(state.currentStep - 1);
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToStep(state.currentStep + 1);
      return;
    }

    if (event.key === " " || event.key === "Spacebar") {
      event.preventDefault();
      toggleAutoplay();
    }
  });

  elements.copyCommand.addEventListener("click", async () => {
    const snippet = elements.commandCode.textContent || "";
    if (!snippet.trim()) {
      elements.copyCommand.dataset.state = "error";
      elements.copyCommand.textContent = "No Code";
      window.setTimeout(() => {
        elements.copyCommand.dataset.state = "";
        elements.copyCommand.textContent = "Copy";
      }, 1100);
      return;
    }

    try {
      await navigator.clipboard.writeText(snippet);
      elements.copyCommand.dataset.state = "ok";
      elements.copyCommand.textContent = "Copied";
    } catch (error) {
      elements.copyCommand.dataset.state = "error";
      elements.copyCommand.textContent = "Failed";
    }

    window.setTimeout(() => {
      elements.copyCommand.dataset.state = "";
      elements.copyCommand.textContent = "Copy";
    }, 1100);
  });
}

function showFetchFailure() {
  const message = [
    `Could not load <code>${escapeHtml(MARKDOWN_PATH)}</code>.`,
    `Using fallback concept content.`,
    `Run <code>${escapeHtml(LOCAL_SERVER_COMMAND)}</code> from <code>${escapeHtml(REPO_PATH)}</code> and open`,
    `<code>${escapeHtml(LAB_URL)}</code>.`,
  ].join(" ");
  setStatus(message, "error", true);
}

function showFileProtocolFailure() {
  const message = [
    "This page cannot fetch markdown over <code>file://</code>.",
    `Using fallback concept content. Run <code>${escapeHtml(LOCAL_SERVER_COMMAND)}</code> from <code>${escapeHtml(REPO_PATH)}</code> and open`,
    `<code>${escapeHtml(LAB_URL)}</code>.`,
  ].join(" ");
  setStatus(message, "error", true);
}

async function fetchMarkdownContent() {
  const response = await fetch(MARKDOWN_PATH, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Fetch failed with status ${response.status}`);
  }
  return response.text();
}

async function initializeContent() {
  const warnings = [];

  if (!isHighlightAvailable()) {
    warnings.push("highlight.js is unavailable, so command snippets are shown as plain text.");
  }

  if (window.location.protocol === "file:") {
    state.parsedContent = buildFallbackContent();
    showFileProtocolFailure();
    return;
  }

  try {
    const markdownText = await fetchMarkdownContent();
    const parsed = buildParsedContent(markdownText);
    state.parsedContent = parsed.content;
    warnings.push(...parsed.warnings);

    if (warnings.length) {
      const warningText = warnings.slice(0, 3).join(" ");
      setStatus(`Loaded markdown with fallback notes: ${warningText}`, "warn");
    } else {
      setStatus("Concept content loaded from learning/docker.md.", "ok");
    }
  } catch (error) {
    state.parsedContent = buildFallbackContent();
    showFetchFailure();
  }
}

function readInitialParams() {
  const params = new URLSearchParams(window.location.search);
  const rawConcept = params.get("concept") || CONCEPT_ORDER[0];
  const concept = getConceptOrDefault(rawConcept);
  const autoplay = params.get("autoplay") === "1";
  return { concept, autoplay, rawConcept };
}

async function initialize() {
  bindEvents();
  await initializeContent();

  const { concept, autoplay, rawConcept } = readInitialParams();
  if (rawConcept !== concept) {
    state.warnings.push(`Unknown concept "${rawConcept}". Defaulted to "${concept}".`);
  }

  selectConcept(concept, false);
  updateQueryParams({ concept, autoplay: false });

  const hasBlockingStatus = elements.status.classList.contains("is-error");
  if (hasBlockingStatus) {
    return;
  }

  if (autoplay && !state.prefersReducedMotion) {
    startAutoplay();
  } else if (autoplay && state.prefersReducedMotion) {
    setStatus("Autoplay request ignored because reduced-motion is enabled.", "warn");
  } else if (state.warnings.length) {
    setStatus(state.warnings.join(" "), "warn");
  }
}

initialize();

function renderImageContainerScene(step) {
  return `
    ${baseSvgDefs()}
    <g class="scene-enter">
      <text x="34" y="42" class="svg-title">Image vs Container Lifecycle</text>
      <rect x="64" y="180" width="190" height="106" rx="14" class="node ${step >= 0 ? "node-highlight pulse" : ""}"></rect>
      <text x="93" y="228" class="svg-label">Dockerfile</text>
      <text x="85" y="255" class="svg-note">Blueprint</text>

      ${step >= 1 ? '<line x1="256" y1="232" x2="392" y2="232" class="edge edge-active"></line>' : ""}
      ${
        step >= 1
          ? '<rect x="286" y="200" width="82" height="24" rx="8" class="svg-badge"></rect><text x="301" y="217" class="svg-badge-text">docker build</text>'
          : ""
      }
      ${
        step >= 1
          ? '<rect x="394" y="175" width="190" height="116" rx="14" class="node node-highlight"></rect><text x="469" y="228" class="svg-label">Image</text><text x="432" y="255" class="svg-note">Immutable snapshot</text>'
          : ""
      }

      ${
        step >= 2
          ? '<line x1="586" y1="205" x2="726" y2="128" class="edge"></line><line x1="586" y1="232" x2="726" y2="232" class="edge"></line><line x1="586" y1="258" x2="726" y2="336" class="edge"></line>'
          : ""
      }
      ${
        step >= 2
          ? '<rect x="756" y="88" width="154" height="84" rx="12" class="node"></rect><text x="786" y="136" class="svg-label">Container A</text>'
          : ""
      }
      ${
        step >= 2
          ? '<rect x="756" y="188" width="154" height="84" rx="12" class="node"></rect><text x="786" y="236" class="svg-label">Container B</text>'
          : ""
      }
      ${
        step >= 2
          ? '<rect x="756" y="288" width="154" height="84" rx="12" class="node"></rect><text x="786" y="336" class="svg-label">Container C</text>'
          : ""
      }
      ${
        step >= 2
          ? '<rect x="628" y="218" width="94" height="24" rx="8" class="svg-badge"></rect><text x="645" y="235" class="svg-badge-text">docker run</text>'
          : ""
      }

      ${
        step >= 3
          ? '<rect x="274" y="354" width="436" height="70" rx="12" class="svg-badge"></rect><text x="304" y="392" class="svg-note">One image can spawn many independent containers. Image remains immutable.</text>'
          : ""
      }
    </g>
  `;
}

function renderLayersScene(step) {
  return `
    ${baseSvgDefs()}
    <g class="scene-enter">
      <text x="34" y="42" class="svg-title">Image Layers and Cache Invalidation</text>
      <rect x="315" y="324" width="330" height="64" rx="10" class="node ${step >= 0 ? "node-highlight" : ""}"></rect>
      <text x="428" y="362" class="svg-label">Layer 1: Base OS</text>

      ${
        step >= 0
          ? '<rect x="315" y="260" width="330" height="60" rx="10" class="node"></rect><text x="404" y="296" class="svg-label">Layer 2: Install Runtime</text>'
          : ""
      }
      ${
        step >= 0
          ? '<rect x="315" y="196" width="330" height="60" rx="10" class="node"></rect><text x="392" y="232" class="svg-label">Layer 3: Copy Dependencies</text>'
          : ""
      }
      ${
        step >= 0
          ? '<rect x="315" y="132" width="330" height="60" rx="10" class="node"></rect><text x="398" y="168" class="svg-label">Layer 4: Install Packages</text>'
          : ""
      }
      ${
        step >= 0
          ? '<rect x="315" y="68" width="330" height="60" rx="10" class="node"></rect><text x="422" y="104" class="svg-label">Layer 5: Copy App Code</text>'
          : ""
      }

      ${step >= 1 ? '<rect x="660" y="332" width="112" height="28" rx="8" class="node node-success"></rect><text x="693" y="351" class="svg-badge-text">cache hit</text>' : ""}
      ${step >= 1 ? '<rect x="660" y="268" width="112" height="28" rx="8" class="node node-success"></rect><text x="693" y="287" class="svg-badge-text">cache hit</text>' : ""}
      ${step >= 1 ? '<rect x="660" y="204" width="112" height="28" rx="8" class="node node-success"></rect><text x="693" y="223" class="svg-badge-text">cache hit</text>' : ""}
      ${step >= 1 ? '<rect x="660" y="140" width="112" height="28" rx="8" class="node node-success"></rect><text x="693" y="159" class="svg-badge-text">cache hit</text>' : ""}

      ${
        step >= 2
          ? '<rect x="315" y="68" width="330" height="60" rx="10" class="node node-danger pulse"></rect><rect x="660" y="76" width="130" height="28" rx="8" class="node node-danger"></rect><text x="684" y="95" class="svg-badge-text">source changed</text>'
          : ""
      }
      ${
        step >= 3
          ? '<line x1="804" y1="90" x2="898" y2="90" class="edge edge-active"></line><rect x="900" y="72" width="44" height="34" rx="8" class="node node-highlight"></rect><text x="912" y="95" class="svg-badge-text">R</text><text x="810" y="132" class="svg-note">Only changed + upper layers rebuild</text>'
          : ""
      }
    </g>
  `;
}

function renderNetworkingScene(step) {
  return `
    ${baseSvgDefs()}
    <g class="scene-enter">
      <text x="34" y="42" class="svg-title">Container Networking Communication</text>
      <rect x="220" y="82" width="640" height="318" rx="16" class="node"></rect>
      <text x="248" y="114" class="svg-note">bridge network</text>

      <rect x="315" y="168" width="150" height="86" rx="12" class="node ${step >= 1 ? "node-highlight pulse" : ""}"></rect>
      <text x="370" y="216" class="svg-label">web</text>
      <rect x="550" y="110" width="160" height="86" rx="12" class="node"></rect>
      <text x="618" y="158" class="svg-label">db</text>
      <rect x="550" y="258" width="160" height="86" rx="12" class="node"></rect>
      <text x="602" y="306" class="svg-label">redis</text>

      <rect x="40" y="186" width="140" height="78" rx="12" class="node"></rect>
      <text x="84" y="230" class="svg-label">Host</text>

      ${step >= 1 ? '<line x1="180" y1="224" x2="314" y2="211" class="edge edge-active"></line>' : ""}
      ${step >= 1 ? '<circle cx="226" cy="220" r="8" class="packet"></circle>' : ""}
      ${step >= 1 ? '<text x="188" y="200" class="svg-note">localhost:8080</text>' : ""}

      ${step >= 2 ? '<line x1="467" y1="206" x2="548" y2="154" class="edge"></line>' : ""}
      ${step >= 2 ? '<line x1="467" y1="224" x2="548" y2="302" class="edge"></line>' : ""}
      ${
        step >= 2
          ? '<rect x="446" y="144" width="96" height="24" rx="8" class="svg-badge"></rect><text x="462" y="161" class="svg-badge-text">db:5432</text>'
          : ""
      }
      ${
        step >= 2
          ? '<rect x="440" y="284" width="112" height="24" rx="8" class="svg-badge"></rect><text x="454" y="301" class="svg-badge-text">redis:6379</text>'
          : ""
      }

      ${step >= 3 ? '<line x1="315" y1="238" x2="178" y2="242" class="edge edge-success"></line>' : ""}
      ${step >= 3 ? '<text x="196" y="270" class="svg-note">200 OK response</text>' : ""}
      ${step >= 3 ? '<rect x="700" y="360" width="206" height="34" rx="10" class="node node-success"></rect><text x="735" y="382" class="svg-badge-text">Service names replace IP lookup</text>' : ""}
    </g>
  `;
}

function renderVolumesScene(step) {
  return `
    ${baseSvgDefs()}
    <g class="scene-enter">
      <text x="34" y="42" class="svg-title">Volume Persistence Across Containers</text>
      <rect x="134" y="142" width="260" height="190" rx="14" class="node ${step === 1 ? "ghost" : "node-highlight"}"></rect>
      <text x="196" y="194" class="svg-label">${step >= 2 ? "Old Container" : "Container A"}</text>
      <rect x="178" y="218" width="170" height="72" rx="10" class="node"></rect>
      <text x="214" y="258" class="svg-note">/app/data</text>

      ${step >= 1 ? '<line x1="156" y1="160" x2="366" y2="312" class="strike"></line>' : ""}

      <ellipse cx="602" cy="236" rx="122" ry="64" class="node ${step >= 0 ? "node-success pulse" : ""}"></ellipse>
      <text x="549" y="244" class="svg-label">named volume</text>
      <text x="535" y="267" class="svg-note">mydata</text>

      ${step >= 0 ? '<line x1="394" y1="236" x2="478" y2="236" class="edge edge-active"></line>' : ""}
      ${step >= 0 ? '<rect x="410" y="202" width="66" height="24" rx="8" class="svg-badge"></rect><text x="428" y="219" class="svg-badge-text">write</text>' : ""}

      ${
        step >= 2
          ? '<rect x="742" y="142" width="170" height="112" rx="12" class="node node-highlight"></rect><text x="778" y="198" class="svg-label">Container B</text><line x1="742" y1="236" x2="726" y2="236" class="edge edge-success"></line>'
          : ""
      }

      ${
        step >= 3
          ? '<rect x="732" y="282" width="190" height="86" rx="12" class="node node-success"></rect><text x="760" y="330" class="svg-label">data.json still present</text><text x="782" y="354" class="svg-note">Persistence confirmed</text>'
          : ""
      }
    </g>
  `;
}
