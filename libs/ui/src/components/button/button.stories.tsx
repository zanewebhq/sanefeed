import type { Meta, StoryObj } from '@storybook/react';
import Button, { ButtonProps } from './button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
  decorators: [
    (Story) => (
      <div style={{ width: '16rem' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

export const Primary: StoryObj<ButtonProps> = {
  args: {
    children: 'Click me',
    variant: 'primary',
    disabled: false,
  },
};

export const Secondary: StoryObj<ButtonProps> = {
  args: {
    children: 'Click me',
    variant: 'secondary',
    disabled: false,
  },
};

export const WithIcon: StoryObj<ButtonProps> = {
  args: {
    children: 'New Feed',
    variant: 'primary',
    disabled: false,
    iconLeft: 'plus',
  },
};
