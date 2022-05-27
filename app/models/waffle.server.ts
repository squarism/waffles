import { prisma } from "~/db.server"

import type { User } from "~/models/user.server"
export type { Waffle } from "@prisma/client"

export function getWaffles() {
  return prisma.waffle.findMany({
    include: {
      votes: {
        select: { userId: true, value: true },
      },
    },
    orderBy: { name: "asc" },
  })
}

export function castVote(user: User, waffleId: string, vote: number) {
  return prisma.vote.create({
    data: {
      user: {
        connect: { id: user.id },
      },
      waffle: {
        connect: { id: waffleId },
      },
      value: vote,
    },
  })
}

export function recallVote(user: User, waffleId: string) {
  return prisma.vote.delete({
    where: {
      userId_waffleId: {
        userId: user.id,
        waffleId: waffleId,
      },
    },
  })
}
