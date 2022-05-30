import { createStyles, Container, Grid } from "@mantine/core"
import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { Header } from "~/components/Header"
import { Waffle } from "~/components/Waffle"

import authenticator from "~/services/auth.server"
import { getWaffles } from "~/models/waffle.server"
import type { Waffle as WaffleType } from "~/models/waffle.server"
import { voteTotals, userVotes } from "~/components/Waffle/helpers"
import type { UserVotes } from "~/types/Voting"

// TODO: make a type so that
// votes={waffle._count.votes} is not mad

const useStyles = createStyles((theme) => ({
  main: {
    marginLeft: "10%",
    marginRight: "10%",
    paddingTop: 0,
    marginTop: 0,
  },
  header: {
    padding: "0.5em",
    backgroundColor: theme.colors.gray[2],
  },
  title: {
    color: theme.colors.gray[7],
  },
  delete: {
    color: theme.colors.red[7],
  },
  waffles: {
    marginTop: "5em",
  }
}))

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request)
  const waffles = await getWaffles()

  const voteCounts = voteTotals(waffles)
  let userVoted: UserVotes = []
  if (user) userVoted = userVotes(user.id, waffles)
  return { user, waffles, voteCounts, userVoted }
}

export default function Index() {
  const { classes } = useStyles()
  const { user, waffles, voteCounts, userVoted } = useLoaderData()

  return (
    <Container className={classes.main}>
      <Header user={user} />

      <Grid columns={3} className={classes.waffles}>
        {waffles.map((waffle: WaffleType) => (
          <Grid.Col key={waffle.id} sm={1} xs={3}>
            <Waffle
              id={waffle.id}
              image={`/${waffle.image}`}
              title={waffle.name}
              castVote={() => console.log("nothing")}
              user={user}
              votes={voteCounts.filter(e => e.id === waffle.id)[0].votes}
              userVotes={userVoted}
            />
          </Grid.Col>
        ))}
      </Grid>

    </Container>
  )
}
