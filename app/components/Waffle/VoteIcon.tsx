import { useState } from 'react'
import { createStyles } from "@mantine/core"
import { Group, Text } from '@mantine/core'
import { ArrowBigTop, ArrowBigDown } from 'tabler-icons-react'

const useStyles = createStyles(theme => ({
  voteIcon: {
    // backgroundColor: theme.colors.gray[2],
  },
  clicked: {
    color: "gray",
    transform: "translateY(10%)",
  }
}));

interface VoteIconProps {
  direction: "up" | "down";
  votes: number;
}

export const VoteIcon = ({ direction, votes }: VoteIconProps) => {
  const [clicked, setClick] = useState(false)
  const { classes } = useStyles();

  return (
    <div style={{ minWidth: "20px", width: "50px" }}>
      {direction === "up" ?
        <ArrowBigTop
          onMouseDown={(e) => { e.preventDefault(); setClick(true) }}
          onMouseUp={() => { setClick(false) }}
          onMouseLeave={() => { setClick(false) }}
          className={clicked ? classes.clicked : ""}
        />
        :
        <ArrowBigDown
          onMouseDown={(e) => { e.preventDefault(); setClick(true) }}
          onMouseUp={() => { setClick(false) }}
          onMouseLeave={() => { setClick(false) }}
          className={clicked ? classes.clicked : ""}
        />
      }
      <Text align="left" sx={{ display: "inline", position: "relative", top: "-6px", left: "4px" }}>
        {votes}
      </Text>
    </div>
  )
}
