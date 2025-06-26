import type { Meta, StoryObj } from '@storybook/react';
import Dialog, { DialogProps } from '.';

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  title: 'UI/Dialog',
};
export default meta;

export const Primary: StoryObj<DialogProps> = {
  args: {
    title: 'Question?',
    description: 'Message.',
    isOpen: true,
    onClose: () => console.log('Close'),
    primary: {
      onClick: () => console.log('Primary'),
      text: 'Confirm',
    },
    secondary: {
      onClick: () => console.log('Secondary'),
      text: 'Cancel',
    },
    tertiary: {
      onClick: () => console.log('Tertiary'),
      text: 'Discard',
    },
  },
};
