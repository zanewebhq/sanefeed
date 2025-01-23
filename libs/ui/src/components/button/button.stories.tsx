import type { Meta, StoryObj } from '@storybook/react';
import Button, { ButtonProps } from './button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
};
export default meta;

export const Primary: StoryObj<ButtonProps> = {
  args: {
    children: 'Click me',
    disabled: false
  },
};
