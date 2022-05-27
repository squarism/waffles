import type { Waffle as WaffleType } from "~/models/waffle.server"

type Waffles = (WaffleType & {
  votes: {
    userId: string
    value: number
  }[]
})[]

export const voteTotals = (waffles: Waffles) => {
  const totals = waffles.map((waffle) => {
    return {
      id: waffle.id,
      votes: waffle.votes.reduce((acc, vote) => acc + vote.value, 0),
    }
  })
  return totals
}

export const userVotes = (userId: string, waffles: Waffles) => {
  return waffles
    .filter((waffle) => {
      return waffle.votes.find((vote) => vote.userId === userId)
    })
    .map((waffle) => {
      return {
        id: waffle.id,
        vote: waffle.votes.find((vote) => vote.userId === userId)!.value,
      }
    })
}
