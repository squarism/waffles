import type { LoaderFunction } from "@remix-run/node"

import authenticator from "~/services/auth.server"

// as long as we have sameSite: "lax" in session.server
// we can logout in a loader and not an action
export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: "/" })
}
