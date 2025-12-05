import type { Meta, StoryObj } from '@storybook/react-vite';
import Toast from '.';

const meta: Meta<typeof Toast> = {
  component: Toast,
  title: 'UI/Toast',
};

export default meta;

export const Success: StoryObj = {
  args: {
    id: '1',
    type: 'success',
    title: 'Your password has been updated!',
  },
};


export const Error: StoryObj = {
  args: {
    id: '2',
    type: 'error',
    title: 'Something went wrong.',
  },
};

export const Loading: StoryObj = {
  args: {
    id: '3',
    type: 'loading',
    title: 'Submitting...',
  },
};
