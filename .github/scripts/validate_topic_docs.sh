#!/usr/bin/env bash
set -euo pipefail

core_topic_docs=(
  "learning/Mega_Prompt_Templates_Python_Learning.md"
  "learning/Python_Learning_Mastery_Techniques.md"
  "learning/aws.md"
  "learning/complexity.md"
  "learning/docker.md"
  "learning/gen_ai_developer_interview_questions.md"
  "learning/interview_questions_visualized.md"
  "learning/leetcode_easy.md"
  "learning/technical_fastapi.md"
)

required_metadata=(
  "Audience"
  "Prerequisites"
  "Estimated time"
  "Last reviewed"
  "Tags"
)

failures=0

if [[ ! -f "README.md" ]]; then
  echo "::error file=README.md::README.md is missing."
  exit 1
fi

for doc in "${core_topic_docs[@]}"; do
  if [[ ! -f "${doc}" ]]; then
    echo "::error file=${doc}::Core topic file is missing."
    failures=1
    continue
  fi

  for field in "${required_metadata[@]}"; do
    if ! grep -Eq "^> \\*\\*${field}:\\*\\*" "${doc}"; then
      echo "::error file=${doc}::Missing metadata field '${field}'."
      failures=1
    fi
  done

  if ! grep -Eq '^\*\*Next doc:\*\* ' "${doc}"; then
    echo "::error file=${doc}::Missing 'Next doc:' navigation pointer."
    failures=1
  fi

  if ! grep -Fq "(${doc})" README.md; then
    echo "::error file=README.md::Missing core topic link for '${doc}'."
    failures=1
  fi
done

if [[ "${failures}" -ne 0 ]]; then
  echo "Topic documentation structure validation failed."
  exit 1
fi

echo "Topic documentation structure validation passed."
