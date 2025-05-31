import type { Meta, StoryObj } from '@storybook/react';
import FormError, { FormErrorProps } from '.';

const meta: Meta<typeof FormError> = {
  component: FormError,
  title: 'UI/FormError',
};
export default meta;

export const Primary: StoryObj<FormErrorProps> = {
  args: {
    children: 'An error occurred on the server. Please try again later.',
  },
};
