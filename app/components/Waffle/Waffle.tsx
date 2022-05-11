import { createStyles } from "@mantine/core";
import { Image, Text, Title, ActionIcon, Grid, Group } from '@mantine/core';

import { VoteIcon } from "./VoteIcon";

const useStyles = createStyles(theme => ({
  waffle: {
    padding: "10px",
    border: "1px solid #ccc",
    width: "256px",
    height: "320px",
  }
}));

interface WaffleProps {
  image: string;
}

export const Waffle = ({image}: WaffleProps) => {
  const { classes } = useStyles();

  return (
    <div className={classes.waffle}>
      <Image
        src={image}
        alt="waffle"
        radius="md"
        width={256}
        height={256}
      />
      <Title order={3} align="center">
        Title
      </Title>

      <Group spacing="xs" noWrap position="center">
        <span style={{ borderRight: "2px solid #eee", paddingRight: "10px" }}>
          <VoteIcon direction="up" votes={42} />
        </span>
        <span>
          <VoteIcon direction="down" votes={0} />
        </span>
      </Group>
    </div>
  )
}
