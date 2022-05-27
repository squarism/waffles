import type { User } from "@prisma/client"
export type VotingFunction = (
  user: User | null,
  waffleId: string,
  vote: number
) => void

export type UserVotes = {
  id: string
  vote: number
}[]

// (user: User|null, waffleId: string, vote: number) => void
