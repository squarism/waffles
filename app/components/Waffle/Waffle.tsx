import { createStyles } from "@mantine/core"
import { Card, Image, Text, Title, Group } from '@mantine/core'

import type { UserVotes } from "~/types/Voting"

import { VoteIcon } from "./VoteIcon"

const useStyles = createStyles(theme => ({
  votes: {
    minWidth: "1rem",
  }
}))

interface WaffleProps {
  id: string
  image: string
  title: string
  votes: number
  userVotes: UserVotes
}

export const Waffle = ({id, image, title, votes, userVotes}: WaffleProps) => {
  const { classes } = useStyles()
  const voted = userVotes.find(e => e.id === id)

  return (
    <Card shadow="xs" p="sm">
      <Image src={image} alt="waffle" radius="md" />
      <Title order={3} align="center">{title}</Title>
      <Group spacing="md" noWrap position="center">
        <VoteIcon
          waffleId={id}
          direction="up"
          voted={voted?.vote == 1 || false}
          otherWayVoted={voted?.vote == -1 || false}
        />
        <Text className={classes.votes} align="center">{votes}</Text>
        <VoteIcon
          waffleId={id}
          direction="down"
          voted={voted?.vote == -1 || false}
          otherWayVoted={voted?.vote == 1 || false}
        />
      </Group>
    </Card>
  )
}
