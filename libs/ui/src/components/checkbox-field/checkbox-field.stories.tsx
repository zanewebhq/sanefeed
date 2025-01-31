import type { Meta, StoryObj } from '@storybook/react';
import CheckboxField, { CheckboxFieldProps } from './checkbox-field';

const meta: Meta<typeof CheckboxField> = {
  component: CheckboxField,
  title: 'CheckboxField',
  decorators: [
    (Story) => (
      <div style={{ width: '20rem' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

export const Unchecked: StoryObj<CheckboxFieldProps> = {
  args: {
    name: 'remember-me',
    label: 'Remember me',
  },
};

export const Checked: StoryObj<CheckboxFieldProps> = {
  args: {
    name: 'remember-me',
    label: 'Remember me',
  },
};
