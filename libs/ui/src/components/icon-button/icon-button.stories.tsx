import type { Meta, StoryObj } from '@storybook/react';
import IconButton, { IconButtonProps } from '.';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: 'UI/IconButton',
};
export default meta;

export const Primary: StoryObj<IconButtonProps> = {
  args: {
    variant: 'primary',
    icon: 'plus',
  },
};
