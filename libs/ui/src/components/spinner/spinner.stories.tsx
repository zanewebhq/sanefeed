import type { Meta, StoryObj } from '@storybook/react';
import Spinner from '.';

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  title: 'Spinner',
};

export default meta;

export const Primary: StoryObj = {
  args: {},
};
