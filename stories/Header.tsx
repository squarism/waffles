import React from 'react';

import { createStyles, Anchor, Button, Grid, Header as MantineHeader, Title } from '@mantine/core'
import WaffleLogo from '../app/components/WaffleLogo'

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
    color: theme.colors.gray[7],
    ":hover": {
      color: theme.colors.orange[7],
    }
  },
  actionSpacer: {
    paddingLeft: "9px",
    paddingRight: "9px",
    color: theme.colors.gray[4],
  }
}));

type User = {
  name: string;
};

interface HeaderProps {
  user?: User;
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
}

const ActionSpacer = () => {
  const { classes } = useStyles();
  return (
    <span className={classes.actionSpacer}>|</span>
  )
}

export const Header = ({ user, onLogin, onLogout, onCreateAccount }: HeaderProps) => {
  const { classes } = useStyles();

  return(
    <MantineHeader height={64}>
      <Grid columns={2} className={classes.grid} justify="space-between">
        <Grid.Col span={1} style={{ textAlign: "left" }}>
          <WaffleLogo width={32} height={32} />
          <Title order={1} className={classes.h1}>Best Waffles</Title>
        </Grid.Col>
        <Grid.Col span={1} style={{ textAlign: "right" }}>
          {user ? (
            <>
              <span className={classes.welcome}>
                Welcome, <b>{user.name}</b>!
              </span>
              <ActionSpacer />
              <Anchor size="sm" className={classes.link} onClick={onLogout}>Log out</Anchor>
            </>
            ) : (
            <>
              <Anchor size="sm" className={classes.link} onClick={onLogin}>
                Log in
              </Anchor>
              <ActionSpacer />
              <Anchor size="sm" className={classes.link} onClick={onCreateAccount}>
                Sign up
              </Anchor>
            </>
            )
          }
        </Grid.Col>
      </Grid>
    </MantineHeader>
  )
}
