import type { Meta, StoryObj } from '@storybook/react';
import Button, { ButtonProps } from './button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
  decorators: [
    (Story) => (
      <div style={{ width: '20rem' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

export const Primary: StoryObj<ButtonProps> = {
  args: {
    onClick: () => alert('Button clicked'),
    children: 'Click me',
    variant: 'primary',
    disabled: false,
  },
};

export const Secondary: StoryObj<ButtonProps> = {
  args: {
    onClick: () => alert('Button clicked'),
    children: 'Click me',
    variant: 'secondary',
    disabled: false,
  },
};

export const WithIcon: StoryObj<ButtonProps> = {
  args: {
    onClick: () => alert('Button clicked'),
    children: 'New Feed',
    variant: 'primary',
    disabled: false,
    iconLeft: 'plus',
  },
};

export const Loading: StoryObj<ButtonProps> = {
  args: {
    onClick: () => alert('Button clicked'),
    children: 'New Feed',
    variant: 'primary',
    loading: true,
    disabled: false,
  },
};

export const AsLink: StoryObj<ButtonProps> = {
  args: {
    href: '#',
    openNewTab: true,
    children: 'Open App',
    variant: 'primary',
    disabled: false,
    iconRight: 'external',
  },
};
