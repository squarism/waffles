import { useSubmit } from "@remix-run/react";
import { useState } from 'react'
import { createStyles } from "@mantine/core"
import clsx from 'clsx'
import { Text } from '@mantine/core'
import { ArrowBigTop, ArrowBigDown } from 'tabler-icons-react'

import type { SubmitFunction } from "@remix-run/react"
import type { User } from "@prisma/client"
import type { VotingFunction } from "~/types/Voting"

const useStyles = createStyles(theme => ({
  clicked: {
    color: "gray",
    transform: "translateY(10%)",
  },
  voted: {
    color: "#F2A31B",
  }
}));

interface VoteIconProps {
  waffleId: string
  direction: "up" | "down"
  votes: number
  castVote: VotingFunction
  user: User | null
  voted: boolean
  otherWayVoted: boolean
}

const sendVote = (submit: SubmitFunction, waffleId: string, vote: number, voted: boolean, otherWayVoted: boolean) => {
  var formData = new FormData()
  formData.append("waffleId", waffleId)
  formData.append("vote", vote.toString())
  formData.append("voted", voted.toString())
  formData.append("otherWayVoted", otherWayVoted.toString())

  submit(formData, {method: "post", action: "/vote"})
}

// TODO: cleanup user castVote and unused stuff
export const VoteIcon = ({ waffleId, direction, votes, castVote, user, voted, otherWayVoted }: VoteIconProps) => {
  const [clicked, setClick] = useState(false)
  const { classes } = useStyles()
  const submit = useSubmit()

  return (
    <div style={{ minWidth: "20px", width: "50px" }}>
      {direction === "up" ?
        <ArrowBigTop
          onMouseDown={(e) => {
            e.preventDefault()
            sendVote(submit, waffleId, 1, voted, otherWayVoted)
            setClick(true)
          }}
          onMouseUp={() => { setClick(false) }}
          onMouseLeave={() => { setClick(false) }}
          className={clsx(clicked && classes.clicked, voted && classes.voted)}
        />
        :
        <ArrowBigDown
          onMouseDown={(e) => {
            e.preventDefault()
            sendVote(submit, waffleId, -1, voted, otherWayVoted)
            setClick(true)
          }}
          onMouseUp={() => { setClick(false) }}
          onMouseLeave={() => { setClick(false) }}
          className={clsx(clicked && classes.clicked, voted && classes.voted)}
        />
      }
      <Text align="left" sx={{ display: "inline", position: "relative", top: "-6px", left: "4px" }}>
        {votes}
      </Text>
    </div>
  )
}
