import { createStyles } from "@mantine/core";
import { Card, Image, Text, Title, Group } from '@mantine/core';

import { VoteIcon } from "./VoteIcon";

import type { User } from "@prisma/client"
import type { VotingFunction, UserVotes } from "~/types/Voting"

const useStyles = createStyles(theme => ({
  waffle: {
    padding: "10px",
    border: "1px solid #eee",
    width: "100%",
    objectFit: "cover",
  }
}));

interface WaffleProps {
  id: string
  image: string
  title: string
  votes: number
  castVote: VotingFunction
  user: User | null
  userVotes: UserVotes
}

export const Waffle = ({id, image, title, castVote, user, votes, userVotes}: WaffleProps) => {
  const { classes } = useStyles();
  const voted = userVotes.find(e => e.id === id)

  return (
    <Card shadow="xs" p="sm">
      <Image src={image} alt="waffle" radius="md" />
      <Title order={3} align="center">{title}</Title>
      <Group spacing="md" noWrap position="center">
        <VoteIcon
          waffleId={id}
          direction="up"
          castVote={castVote}
          user={user}
          voted={voted?.vote == 1 || false}
          otherWayVoted={voted?.vote == -1 || false}
        />
        <Text sx={{minWidth: "1rem" }} align="center">{votes}</Text>
        <VoteIcon
          waffleId={id}
          direction="down"
          castVote={castVote}
          user={user}
          voted={voted?.vote == -1 || false}
          otherWayVoted={voted?.vote == 1 || false}
        />
      </Group>
    </Card>
  )
}
