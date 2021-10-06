#!/bin/sh
echo "PORT=$PORT"
git fetch origin && git reset --hard origin/master && git clean -f -d
(cd ../2104-wns-paris-agowork-front ; GATEWAY_PORT=$PORT docker-compose -f docker-compose-prod.yml up --build -d)