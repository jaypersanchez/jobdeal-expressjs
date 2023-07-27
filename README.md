<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://dev.jobdeal.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-green.43235cea.png&w=96&q=75" alt="Jobdeal Logo" /></a>
</p>

## Description

Jobdeal Backend

## Installation

```bash
$ yarn install
```

## Setup ENV

Create .env file from .env.sample and set the DATABASE_URL and JWT_SECRET_KEY values.

## Generate Prisma schema

```bash
$ npx prisma generate
```

## Migrate the database

```bash
$ npx prisma migrate dev
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

