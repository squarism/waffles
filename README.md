# Waffle Voting

![home](linktbd)
![sign in](linktbd)


## Purpose

It's a learning project for Remix.  Features and goals:

- Realistic Authentication
- Simple database model and relations
- Integrate a CSS library (Mantine)
- Voting system


## Stack

- Remix
- Mantine
- Postgres + Prisma
- (not storybook, [it doesn't work yet](https://github.com/remix-run/remix/discussions/2481), this statement will likely bitrot)


## Development


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
