#!/bin/sh

npx --no-install commitlint --edit "$1"

if [ $? -ne 0 ]; then
  echo "⛔️ Commit message does not meet the Conventional Commits standard!"
  echo ""
  echo "Example of a valid commit message:"
  echo ""
  echo "feat: [P2-90] add user login functionality"
  echo "fix: [P2-223] commit message"
  echo "docs: [P2-1241] message"
  echo ""
  echo "That means it needs to have the keyword, the jira ticket and then the commit message:"
  echo "keyword: [P2-XXX] commit message"
  echo ""
  echo "Refer to https://www.conventionalcommits.org/ for more details."
  echo ""
  exit 1
fi
