# Contributing Guide

Thanks for contributing. This repository is documentation-first and optimized for public learners.

## How to Propose Updates
1. Open an issue or draft PR with a clear goal.
2. Keep each PR focused on one area (example: only `GenAI` or only `Docker`).
3. Add a short rationale: what improved, and for which learner level.

## Pull Request Checklist
- [ ] Change is learner-focused and improves clarity or accuracy.
- [ ] New/edited facts have source + `last verified` where needed.
- [ ] Metadata block exists in edited topic files:
  - Audience
  - Prerequisites
  - Estimated time
  - Last reviewed
  - Tags
- [ ] `Next doc` pointer exists and points to a valid file.
- [ ] `README.md` is updated if navigation changed.
- [ ] `CHANGELOG.md` entry added.

## File Naming Rules
- Use lowercase with underscores for new topic docs when practical.
- Keep descriptive names (example: `study_plan_30_days.md` style).
- Existing filenames can remain unchanged unless there is a strong reason to rename.

## Content Review Expectations
- Prioritize factual correctness over style.
- Keep interview one-liners concise and defensible.
- Include practical examples where explanation can be ambiguous.
- Follow formatting in [`STYLE_GUIDE.md`](STYLE_GUIDE.md).

## Commit Message Suggestions
- `docs: add 30-day learner study plan`
- `docs: fix broken GenAI visual reference URL`
- `docs: add metadata blocks and next-doc pointers`
