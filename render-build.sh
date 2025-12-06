#!/usr/bin/env bash

set -o errexit

npm install

npm run prisma:generate

npm run build