import type { Meta, StoryObj } from '@storybook/react';
import TextField, { TextFieldProps } from '.';

const meta: Meta<typeof TextField> = {
  component: TextField,
  title: 'Fields/Text',
  decorators: [
    (Story) => (
      <div style={{ width: '20rem' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

export const Simple: StoryObj<TextFieldProps> = {
  args: {
    type: 'text',
    name: 'name',
    label: 'Name',
  },
};

export const Email: StoryObj<TextFieldProps> = {
  args: {
    type: 'email',
    name: 'email',
    label: 'Email',
    placeholder: 'email@example.com',
    iconLeft: 'mail',
  },
};

export const Error: StoryObj<TextFieldProps> = {
  args: {
    type: 'email',
    name: 'email',
    label: 'Email',
    placeholder: 'email@example.com',
    iconLeft: 'mail',
    value: 'Invalid input',
    error: 'Please enter a valid email address.',
  },
};

export const Disabled: StoryObj<TextFieldProps> = {
  args: {
    type: 'email',
    name: 'email',
    label: 'Email',
    placeholder: 'email@example.com',
    iconLeft: 'mail',
    disabled: true,
  },
};
