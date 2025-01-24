import type { Meta, StoryObj } from '@storybook/react';
import Link, { LinkProps } from './link';

const meta: Meta<typeof Link> = {
  component: Link,
  title: 'Link',
};
export default meta;

export const Primary: StoryObj<LinkProps> = {
  args: {
    children: 'Click me',
    href: '#',
  },
};

export const External: StoryObj<LinkProps> = {
  args: {
    children: 'Terms of Service',
    href: '#',
    iconRight: 'external',
  },
};
