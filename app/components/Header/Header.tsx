import { createStyles, Grid, Header as MantineHeader, MediaQuery, Title, Tooltip } from '@mantine/core'
import { Link } from "@remix-run/react"
import WaffleLogo from '../WaffleLogo'
import { UserCircle as UserIcon } from 'tabler-icons-react'

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
    fontWeight: "bold",
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
    <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
      <span className={classes.actionSpacer}>|</span>
    </MediaQuery>
  )
}

export const Header = ({ user }: HeaderProps) => {
  const { classes } = useStyles()

  return(
    <MantineHeader height={64}>
      <Grid columns={7} className={classes.grid} justify="space-between">
        <Grid.Col span={3} style={{ textAlign: "left" }}>
          <WaffleLogo width={32} height={32} />
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Title order={1} className={classes.h1}>Best Waffles</Title>
          </MediaQuery>
        </Grid.Col>
        <Grid.Col span={4} style={{ textAlign: "right" }}>
          {user ? (
            <>
              <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                <span className={classes.welcome}>
                  {user.email}
                </span>
              </MediaQuery>
              <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                <UserIcon style={{ position: 'relative', top: '7px', paddingLeft: '4px'}}/>
              </MediaQuery>
              <MediaQuery smallerThan="sm" styles={{ display: "inline !important" }}>
                <div style={{ display: "none", position: 'relative', top: '7px', paddingRight: '8px' }}>
                  <Tooltip position="bottom" placement="end" gutter={10} label={user.email}>
                    <UserIcon />
                  </Tooltip>
                </div>
              </MediaQuery>
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
