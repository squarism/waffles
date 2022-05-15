// the auth config taken from aaronksaunders, his video and repo
// https://github.com/aaronksaunders/remix-auth-form-strategy

import { createCookieSessionStorage } from "@remix-run/node"

// export the whole sessionStorage object
export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session", // use any name you want here
    sameSite: "lax", // this helps with CSRF
    path: "/", // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: [process.env.SESSION_SECRET || "s3cur1ty1sh4rd"], // Production: use a secret key
    secure: process.env.NODE_ENV === "production", // enable this in prod only
  },
})

// you can also export the methods individually for your own usage
export let { getSession, commitSession, destroySession } = sessionStorage

// define the user model
export type User = {
  email: string
  token: string
}
