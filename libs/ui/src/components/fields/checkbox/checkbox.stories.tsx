import type { Meta, StoryObj } from '@storybook/react-vite';
import CheckboxField, { CheckboxFieldProps } from '.';

const meta: Meta<typeof CheckboxField> = {
  component: CheckboxField,
  title: 'Fields/Checkbox',
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
    checked: false,
  },
};

export const Checked: StoryObj<CheckboxFieldProps> = {
  args: {
    name: 'remember-me',
    label: 'Remember me',
    checked: true,
  },
};
