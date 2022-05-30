import { Authenticator, AuthorizationError } from "remix-auth"
import { FormStrategy } from "remix-auth-form"
import { sessionStorage } from "~/services/session.server"

import type { User } from "~/models/user.server"
import { verifyLogin } from "~/models/user.server"

export let authenticator = new Authenticator<User>(sessionStorage)

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form, context }) => {
    // get the data from the form...
    let email = form.get("email") as string
    let password = form.get("password") as string

    // initiialize the user here
    let user = {} as User

    // do some validation, errors are in the sessionErrorKey
    if (!email || email?.length === 0)
      throw new AuthorizationError("Bad Credentials: Email is required")
    if (typeof email !== "string")
      throw new AuthorizationError("Bad Credentials: Email must be a string")

    if (!password || password?.length === 0) {
      console.log("password is required")
      throw new AuthorizationError("Bad Credentials: Password is required")
    }

    if (typeof password !== "string")
      throw new AuthorizationError("Bad Credentials: Password must be a string")

    // TODO: use the invariant library to validate the email?

    /*
    // login the user, this could be whatever process you want
    if (email === "aaron@mail.com" && password === "password") {
      user = {
        name: email,
        token: `${password}-${new Date().getTime()}`,
      }

      // the type of this user must match the type you pass to the Authenticator
      // the strategy will automatically inherit the type if you instantiate
      // directly inside the `use` method
      return await Promise.resolve({ ...user })
    } else {
      // if problem with user throw error AuthorizationError
      throw new AuthorizationError("Bad Credentials")
    }
    */
    let verify = await verifyLogin(email, password)
    if (verify) {
      user = verify
    } else {
      console.log("verify failed")
      throw new AuthorizationError("Bad Credentials")
    }

    return await Promise.resolve({ ...user })
  })
)

export default authenticator
