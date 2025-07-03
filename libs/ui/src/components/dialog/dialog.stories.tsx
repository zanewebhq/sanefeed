import type { Meta, StoryObj } from '@storybook/react-vite';
import Dialog, { DialogProps } from '.';

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  title: 'UI/Dialog',
};
export default meta;

const DialogRenderer = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <Dialog.Header title="Question?" description="Message." />

      {children}

      <Dialog.Buttons
        primary={{
          onClick: () => console.log('Primary'),
          text: 'Confirm',
        }}
        secondary={{
          onClick: () => console.log('Secondary'),
          text: 'Cancel',
        }}
        tertiary={{
          onClick: () => console.log('Tertiary'),
          text: 'Discard',
        }}
      />
    </Dialog>
  );
};

export const Primary: StoryObj<DialogProps> = {
  args: {
    isOpen: true,
    onClose: () => console.log('Close'),
  },
  render: DialogRenderer,
};
