#!/usr/bin/env bash
echo "Running rate limit test against /api/projects"
for i in {1..20}; do
  printf "Request %02d: " $i
  curl -s -o /dev/null -w "%{http_code}\n" https://www.drishya.site/api/projects
  sleep 0.3
done
