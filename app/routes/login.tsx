import type {
  ActionFunction,
  LoaderFunction,
} from "@remix-run/node"

import { json } from "@remix-run/node"

import { Form, useLoaderData } from "@remix-run/react"

import authenticator from "~/services/auth.server"
import { sessionStorage } from "~/services/session.server"

// Second, we need to export an action function, here we will use the
// `authenticator.authenticate method`
export let action: ActionFunction = async ({ request, context }) => {
  // we call the method with the name of the strategy we want to use and the
  // request object, optionally we pass an object with the URLs we want the user
  // to be redirected to after a success or a failure
  const resp = await authenticator.authenticate("form", request, {
    successRedirect: "/",
    failureRedirect: "/login",
    throwOnError: true,
    context,
  })

  // TODO: remove this
  console.log(resp)
  return resp
}

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  })

  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  )

  const error = session.get("sessionErrorKey")
  return json<any>({ error })
}

export default function LoginPage() {
  const loaderData = useLoaderData()

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Login</h1>
      <p>
        Based on the Form Strategy From{" "}
        <a href="https://github.com/sergiodxa/remix-auth" target={"_window"}>
          Remix-Auth Project
        </a>
      </p>
      <Form method="post">
        <input type="email" name="email" placeholder="email" required />
        <input
          type="password"
          name="password"
          placeholder="password"
          autoComplete="current-password"
        />
        <button>Sign In</button>
      </Form>
      <div>
        {loaderData?.error ? <p>ERROR: {loaderData?.error?.message}</p> : null}
      </div>
    </div>
  )
}
