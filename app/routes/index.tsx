import { Link } from "@remix-run/react";
import { createStyles } from "@mantine/core";

import { useOptionalUser } from "~/utils";

import { Header } from "~/components/Header";

const useStyles = createStyles((theme) => ({
  main: {
    marginLeft: "5em",
    marginRight: "5em",
    paddingTop: 0,
    marginTop: 0,
    backgroundColor: theme.colors.blue[2],
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
  }
}));

export default function Index() {
  const user = useOptionalUser();
  const {classes} = useStyles();

  return (
    <main className={classes.main}>
      <Header />
    </main>
  );
}
