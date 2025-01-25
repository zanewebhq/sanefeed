import type { Meta, StoryObj } from '@storybook/react';
import FieldHelper, { FieldHelperProps } from './field-helper';

const meta: Meta<typeof FieldHelper> = {
  component: FieldHelper,
  title: 'FieldHelper',
};
export default meta;

export const Helper: StoryObj<FieldHelperProps> = {
  args: {
    id: 'helper',
    type: 'helper',
    message: 'This is a helper message.',
  },
};

export const Error: StoryObj<FieldHelperProps> = {
  args: {
    id: 'error',
    type: 'error',
    message: 'This is an error message.',
  },
};
