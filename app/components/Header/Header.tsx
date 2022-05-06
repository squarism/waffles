import { createStyles, Header as MantineHeader } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  header: {
    padding: "0.5em",
    backgroundColor: theme.colors.gray[2],
  }
}));

export function Header() {
  const { classes } = useStyles();

  return (
    <MantineHeader className={classes.header} height={"2.5em"}>
      nav
    </MantineHeader>
  )
}

