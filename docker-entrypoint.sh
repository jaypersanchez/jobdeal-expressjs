#!/bin/sh
set -e

npx prisma migrate dev

yarn build

yarn start:prod
