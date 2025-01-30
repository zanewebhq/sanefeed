import type { Meta, StoryObj } from '@storybook/react';
import Field, { FieldProps } from './field';

const meta: Meta<typeof Field> = {
  component: Field,
  title: 'Field',
  decorators: [
    (Story) => (
      <div style={{ width: '20rem' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

export const Primary: StoryObj<FieldProps> = {
  args: {},
};
