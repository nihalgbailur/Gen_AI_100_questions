# Sources and Updates Policy

This file defines how factual, time-sensitive, and numeric claims are maintained across repository docs.

## Citation Format
Use this format for factual claims that can go stale:

`Claim text ([source](https://example.com/source), last verified YYYY-MM-DD)`

Example:
`30+ Regions, 90+ Availability Zones ([source](https://aws.amazon.com/about-aws/global-infrastructure/), last verified 2026-02-08)`

## Update Cadence
- Monthly: high-change domains (`GenAI`, `Cloud`, `DevOps`).
- Quarterly: medium-change domains (`Web API`, interview patterns).
- Semi-annual: low-change domains (`DSA`, static Python fundamentals).

## Source Registry
| Claim / Topic | File | Source | Last Verified | Next Review |
| --- | --- | --- | --- | --- |
| AWS global infrastructure counts | [`aws.md`](aws.md) | [AWS Global Infrastructure](https://aws.amazon.com/about-aws/global-infrastructure/) | 2026-02-08 | 2026-03-08 |
| Bedrock model examples and provider naming | [`aws.md`](aws.md) | [Amazon Bedrock Docs](https://docs.aws.amazon.com/bedrock/) | 2026-02-08 | 2026-03-08 |
| FastAPI behavior and auto docs assumptions | [`technical_fastapi.md`](technical_fastapi.md) | [FastAPI Official Docs](https://fastapi.tiangolo.com/) | 2026-02-08 | 2026-05-08 |
| Docker command semantics and architecture descriptions | [`docker.md`](docker.md) | [Docker Docs](https://docs.docker.com/) | 2026-02-08 | 2026-05-08 |

## Time-Sensitive Claim Rules
- Avoid year-bound titles unless the year is required.
- Prefer year-neutral wording for evergreen interview docs.
- If a claim includes counts, percentages, version names, or release years, include source + `last verified`.

## Contribution Rule
When editing any numeric or dated statement:
1. Add or update the citation inline in the edited doc.
2. Update this registry row (or add a new one).
3. Record the change in [`CHANGELOG.md`](CHANGELOG.md).
