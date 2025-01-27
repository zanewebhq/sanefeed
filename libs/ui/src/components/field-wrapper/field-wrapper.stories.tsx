import type { Meta, StoryObj } from '@storybook/react';
import FieldWrapper, { FieldWrapperProps } from './field-wrapper';

const meta: Meta<typeof FieldWrapper> = {
  component: FieldWrapper,
  title: 'FieldWrapper',
  decorators: [
    (Story) => (
      <div style={{ width: '20rem' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

export const Primary: StoryObj<FieldWrapperProps> = {
  args: {
    name: 'name',
    label: 'Name',
    helper: 'Helper message',
  },
};

export const WithError: StoryObj<FieldWrapperProps> = {
  args: {
    name: 'name',
    label: 'Name',
    error: 'Error message',
  },
};
