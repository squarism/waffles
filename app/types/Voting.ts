import type { User } from "@prisma/client"
export type VotingFunction = (
  user: User | null,
  waffleId: string,
  vote: number
) => void

export type VoteCounts = {
  id: string
  votes: number
}[]

export type UserVotes = {
  id: string
  vote: number
}[]
