# Waffle Voting

## Home Page

You can only vote once per waffle.  The `-2` shown here is two `-1` votes by two users.  If you vote the other way it will recall your vote and vote again etc.  You can click an arrow to recall your vote.  It's basically reddit style.

<img src="https://github.com/squarism/waffles/raw/images/screenshots/home.png" width="60%" />


## Auth

Uses [remix-auth](https://github.com/sergiodxa/remix-auth) as well as some other code and ideas from others.  Sign up is not implemented.

<img src="https://github.com/squarism/waffles/raw/images/screenshots/login.png" width="40%" />


## Purpose

It's a learning project for Remix.  Features and goals:

- Realistic Authentication
- Simple database model and relations
- Unique constraint on voting, security check on voting
- Integrate a CSS library (Mantine)
- Voting system


## Stack

- Remix
- Mantine
- Postgres + Prisma
- (sadly no storybook, [it doesn't work yet](https://github.com/remix-run/remix/discussions/2481), this statement will likely bitrot)


## Development

Local user is `someone@example.com` with password `password`.  This is in [the seeds file](prisma/seed.ts).

```
# create an .env file with
# you will need to create a database like `createdb -O you waffles_development`
# or however you want to do that

# copy .env.example and change the values

# run migrate once
npx prisma migrate dev

# start the dev server
npm run dev

# some other interesting commands
npx prisma studio  # if you want to see the database
npm run test       # vitest watcher
```
