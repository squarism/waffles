import { redirect } from '@remix-run/node'
import type { ActionFunction } from '@remix-run/node'

import { castVote, recallVote } from "~/models/waffle.server"
import authenticator from '~/services/auth.server'

export const action: ActionFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request)
  if (!user) {
    return redirect('/login')
  } else {
    const body = await request.formData()
    const vote = parseInt(body._fields.vote[0])
    const waffle = body._fields.waffleId[0]
    const voted = JSON.parse(body._fields.voted[0])
    const otherWayVoted = JSON.parse(body._fields.otherWayVoted[0])

    if (!voted && otherWayVoted) {
      await recallVote(user, waffle)
      await castVote(user, waffle, vote)
    } else if (voted) {
      await recallVote(user, waffle)
    } else {
      await castVote(user, waffle, vote)
    }

    return redirect('/')
  }
}
