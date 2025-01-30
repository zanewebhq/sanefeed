import type { Meta, StoryObj } from '@storybook/react';
import FieldIcons, { FieldIconsProps } from './field-icons';

const meta: Meta<typeof FieldIcons> = {
  component: FieldIcons,
  title: 'FieldIcons',
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: '20rem' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

export const WithLeftIcon: StoryObj<FieldIconsProps> = {
  args: {
    iconLeft: 'mail',
    error: false,
  },
};

export const WithRightIcon: StoryObj<FieldIconsProps> = {
  args: {
    iconRight: 'show',
    error: false,
  },
};

export const WithBothIcons: StoryObj<FieldIconsProps> = {
  args: {
    iconLeft: 'mail',
    iconRight: 'show',
    error: false,
  },
};

export const WithError: StoryObj<FieldIconsProps> = {
  args: {
    iconLeft: 'mail',
    iconRight: 'show',
    error: true,
  },
};
