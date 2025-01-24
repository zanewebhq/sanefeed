import type { Meta, StoryObj } from '@storybook/react';
import Icon, { IconProps } from './icon';

const meta: Meta<typeof Icon> = {
  component: Icon,
  title: 'Icon',
};
export default meta;

export const Primary: StoryObj<IconProps> = {
  args: {
    name: 'arrow-back',
  },
};
