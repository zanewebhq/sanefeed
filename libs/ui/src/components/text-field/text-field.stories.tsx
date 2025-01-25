import type { Meta, StoryObj } from '@storybook/react';
import TextField, { TextFieldProps } from './text-field';

const meta: Meta<typeof TextField> = {
  component: TextField,
  title: 'TextField',
  decorators: [
    (Story) => (
      <div style={{ width: '20rem' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

export const Primary: StoryObj<TextFieldProps> = {
  args: {
    type: 'email',
    label: 'Email',
    name: 'email',
    placeholder: 'Placeholder',
    helper: 'Helper text',
    iconLeft: 'mail',
    iconRight: 'caps-lock',
  },
};
