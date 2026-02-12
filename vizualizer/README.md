# Docker.md Website Visualizer

Static doc explorer for `/Users/nihalgbailur/Desktop/Gen_AI_100_questions/learning/docker.md`.

## What It Includes
- Runtime markdown parsing from source file (`../learning/docker.md`)
- Full markdown rendering (headings, tables, code blocks)
- Mermaid diagram rendering
- Sticky table of contents with scroll spy
- Search and section filtering
- Reading progress bar
- Copy buttons for code blocks
- Deep-link support:
  - `?section=<heading-id>`
  - `?q=<search-term>`

## Run Locally
From `/Users/nihalgbailur/Desktop/Gen_AI_100_questions`:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/vizualizer/index.html
```

Concept Lab subpage:

```text
http://localhost:8000/vizualizer/concept-lab.html
```

## Concept Lab
- Animated subpage for 4 core concepts:
  - Image vs Container lifecycle
  - Layers and cache invalidation
  - Networking and service-name communication
  - Volume persistence across container recreation
- Runtime content sync: parses `../learning/docker.md` for one-liners, detail text, and command snippets.
- Query params:
  - `?concept=image-container|layers|networking|volumes`
  - `?autoplay=1` (disabled automatically when reduced-motion is enabled)

## Important Constraints
- Must be served over HTTP for `fetch()` to load markdown.
- Opening the file directly with `file://` will fail (the app shows an inline instruction).
- External CDN libraries are used for:
  - `marked`
  - `DOMPurify`
  - `Mermaid`
  - `highlight.js`

## Change the Markdown Source Path
If `docker.md` moves, update this constant in:

- `/Users/nihalgbailur/Desktop/Gen_AI_100_questions/vizualizer/app.js`
- `/Users/nihalgbailur/Desktop/Gen_AI_100_questions/vizualizer/concept-lab.js`

```js
const MARKDOWN_PATH = "../learning/docker.md";
```
