import type { Meta, StoryObj } from '@storybook/react-vite';
import Spinner from '.';

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  title: 'UI/Spinner',
};

export default meta;

export const Primary: StoryObj = {
  args: {},
};
