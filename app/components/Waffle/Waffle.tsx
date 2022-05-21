import { createStyles } from "@mantine/core";
import { Card, Image, Title, Group } from '@mantine/core';

import { VoteIcon } from "./VoteIcon";

const useStyles = createStyles(theme => ({
  waffle: {
    padding: "10px",
    border: "1px solid #eee",
    width: "100%",
    objectFit: "cover",
  }
}));

interface WaffleProps {
  image: string;
  title: string;
}

export const Waffle = ({image, title}: WaffleProps) => {
  const { classes } = useStyles();

  return (
    <Card shadow="xs" p="sm">
      <Image
        src={image}
        alt="waffle"
        radius="md"
      />
      <Title order={3} align="center">
        {title}
      </Title>

      <Group spacing="xs" noWrap position="center">
        <span style={{ borderRight: "2px solid #ccc", paddingRight: "10px" }}>
          <VoteIcon direction="up" votes={42} />
        </span>
        <span>
          <VoteIcon direction="down" votes={0} />
        </span>
      </Group>
    </Card>
  )
}
