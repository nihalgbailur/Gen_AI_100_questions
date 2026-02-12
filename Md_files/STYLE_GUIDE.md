# Markdown Style Guide

Use this guide for consistent structure across all docs in this repository.

## Heading Hierarchy
- `#` for document title.
- `##` for major sections.
- `###` for subsection detail.
- Avoid skipping levels (do not jump from `#` to `###` directly).

## Required Metadata Block
Place this directly under the title:

```md
> **Audience:** Public learners  
> **Prerequisites:** ...  
> **Estimated time:** ...  
> **Last reviewed:** YYYY-MM-DD  
> **Tags:** `Python`, `GenAI`
```

## Content Pattern
For explanation sections, prefer:
- One-liner: short interview-safe answer.
- Elaboration: practical details and examples.

## Code Block Rules
- Always specify language (`python`, `bash`, `json`, etc.).
- Keep snippets minimal and runnable where practical.
- Add short comments only when they clarify non-obvious logic.

## Mermaid Diagram Rules
- Use Mermaid only when it improves comprehension.
- Keep diagrams readable in plain Markdown viewers.
- Prefer simple flowchart/graph structures over dense node clusters.

## Links and Citations
- Use relative links for repository files.
- Use inline source format for time-sensitive claims:
  - `([source](https://example.com), last verified YYYY-MM-DD)`
- Validate links before merging.

## Tone and Readability
- Write for public learners: clear, practical, concise.
- Prefer concrete examples over abstract definitions.
- Keep paragraphs short for scanability.
