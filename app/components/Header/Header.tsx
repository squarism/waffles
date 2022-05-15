import { createStyles, Grid, Header as MantineHeader, Title } from '@mantine/core'
import { Link } from "@remix-run/react"
import WaffleLogo from '../WaffleLogo'
import type { User } from "~/services/session.server"

const useStyles = createStyles((theme) => ({
  grid: {
    padding: "15px 20px",
  },
  h1: {
    fontWeight: 900,
    fontSize: "20px",
    lineHeight: 1,
    margin: "3px 0 6px 10px",
    display: "inline-block",
    verticalAlign: "top",
  },
  welcome: {
    color: "#333",
    fontSize: "14px",
  },
  link: {
    fontSize: "15px",
    color: theme.colors.gray[7],
    ":hover": {
      color: theme.colors.orange[7],
      textDecoration: "underline",
    },
    textDecoration: "none",
  },
  actionSpacer: {
    paddingLeft: "9px",
    paddingRight: "9px",
    color: theme.colors.gray[4],
  }
}))

interface HeaderProps {
  user: User | null
}

const ActionSpacer = () => {
  const { classes } = useStyles()
  return (
    <span className={classes.actionSpacer}>|</span>
  )
}

export const Header = ({ user }: HeaderProps) => {
  const { classes } = useStyles()

  return(
    <MantineHeader height={64}>
      <Grid columns={3} className={classes.grid} justify="space-between">
        <Grid.Col span={1} style={{ textAlign: "left" }}>
          <WaffleLogo width={32} height={32} />
          <Title order={1} className={classes.h1}>Best Waffles</Title>
        </Grid.Col>
        <Grid.Col span={2} style={{ textAlign: "right" }}>
          {user ? (
            <>
              <span className={classes.welcome}>
                Welcome, <b>{user.email}</b>!
              </span>
              <ActionSpacer />
              <Link to="/logout" className={classes.link}>Log out</Link>
            </>
            ) : (
              <>
                <Link to="/login" className={classes.link}>
                  Log in
                </Link>
              </>
            )
          }
        </Grid.Col>
      </Grid>
    </MantineHeader>
  )
}
