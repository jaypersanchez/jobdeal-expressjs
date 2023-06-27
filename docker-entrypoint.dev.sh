#!/bin/sh
set -e

npx prisma migrate dev

yarn start:dev
