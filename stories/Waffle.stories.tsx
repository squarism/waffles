import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { Waffle } from '../app/components/Waffle';

export default {
  title: 'Waffles/Waffle',
  component: Waffle,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Waffle>;

const Template: ComponentStory<typeof Waffle> = (args) => <Waffle {...args} />;

export const Card = Template.bind({});
Card.args = {
  image: "/chocolate.jpg",
}
