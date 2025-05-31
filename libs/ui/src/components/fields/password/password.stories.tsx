import type { Meta, StoryObj } from '@storybook/react';
import PasswordField, { PasswordFieldProps } from '.';

const meta: Meta<typeof PasswordField> = {
  component: PasswordField,
  title: 'Fields/Password',
  decorators: [
    (Story) => (
      <div style={{ width: '20rem' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

export const Primary: StoryObj<PasswordFieldProps> = {
  args: {
    name: 'password',
    label: 'Password',
    value: 'password',
  },
};

export const StrengthMeter: StoryObj<PasswordFieldProps> = {
  args: {
    name: 'password',
    label: 'Password',
    value: 'password',
    withStrengthMeter: true,
    helper: 'Min. 8 characters, 1 uppercase, 1 lowercase, 1 digit',
    // error: 'Password is required.',
  },
};
