import type { Meta, StoryObj } from '@storybook/react';
import FieldLabel, { FieldLabelProps } from './field-label';

const meta: Meta<typeof FieldLabel> = {
  component: FieldLabel,
  title: 'FieldLabel',
};
export default meta;

export const Primary: StoryObj<FieldLabelProps> = {
  args: {
    htmlFor: 'label',
    label: 'Label',
  },
};
