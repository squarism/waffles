import { useSubmit } from "@remix-run/react"
import { useState } from 'react'

import { createStyles } from "@mantine/core"
import clsx from 'clsx'
import { ArrowBigTop, ArrowBigDown } from 'tabler-icons-react'

import type { SubmitFunction } from "@remix-run/react"

const useStyles = createStyles(theme => ({
  clicked: {
    color: "gray",
    transform: "translateY(10%)",
  },
  voted: {
    color: "#F2A31B",
  }
}))

interface VoteIconProps {
  waffleId: string
  direction: "up" | "down"
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

export const VoteIcon = ({ waffleId, direction, voted, otherWayVoted }: VoteIconProps) => {
  const [clicked, setClick] = useState(false)
  const { classes } = useStyles()
  const submit = useSubmit()

  return (
    <>
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
    </>
  )
}
