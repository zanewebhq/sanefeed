import type { Meta, StoryObj } from '@storybook/react';
import PasswordField, { PasswordFieldProps } from './password-field';

const meta: Meta<typeof PasswordField> = {
  component: PasswordField,
  title: 'PasswordField',
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
