import { createStyles, Grid } from "@mantine/core"

import { Header } from "~/components/Header"
import { Waffle } from "~/components/Waffle"

import authenticator from "~/services/auth.server";
import { useLoaderData } from "@remix-run/react";

import type { LoaderFunction } from "@remix-run/node"

const useStyles = createStyles((theme) => ({
  main: {
    marginLeft: "5em",
    marginRight: "5em",
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
}));

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request)
}

export default function Index() {
  const { classes } = useStyles()
  const user = useLoaderData()

  return (
    <main className={classes.main}>
      <Header user={user} />

      <Grid columns={3} className={classes.waffles} gutter="md">
        <Grid.Col md={1} sm={1} xs={3}>
          <Waffle image="/chocolate.jpg" title="Chocolate" />
        </Grid.Col>
        <Grid.Col md={1} sm={1} xs={3}>
          <Waffle image="/monte_cristo.jpg" title="Monte Cristo" />
        </Grid.Col>
        <Grid.Col md={1} sm={1} xs={3}>
          <Waffle image="/strawberry.jpg" title="Strawberry" />
        </Grid.Col>
      </Grid>

    </main>
  )
}
