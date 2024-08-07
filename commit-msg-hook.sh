#!/bin/sh

npx --no-install commitlint --edit "$1"

if [ $? -ne 0 ]; then
  echo "⛔️ Commit message does not meet the Conventional Commits standard!"
  echo ""
  echo "Example of a valid commit message:"
  echo ""
  echo "feat: add user login functionality"
  echo "fix: commit message"
  echo "docs: message"
  echo ""
  echo "That means it needs to have the keyword, the jira ticket and then the commit message:"
  echo "keyword: commit message"
  echo ""
  echo "Refer to https://www.conventionalcommits.org/ for more details."
  echo ""
  exit 1
fi
