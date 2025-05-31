import type { Meta, StoryObj } from '@storybook/react';
import Icon, { IconProps } from '.';
import { IconName, icons } from './utils';
import styles from './icon.module.css';

const meta: Meta<typeof Icon> = {
  component: Icon,
  title: 'UI/Icon',
};
export default meta;

export const Playground: StoryObj<IconProps> = {
  args: {
    name: 'arrow-back',
    size: 'md',
  },
};

const IconRenderer = (props: IconProps) => (
  <div className={styles.storyWrapper}>
    {Object.keys(icons).map((icon) => (
      <Icon {...props} name={icon as IconName} />
    ))}
  </div>
);

export const ExtraLarge: StoryObj<IconProps> = {
  args: {
    size: 'xl',
  },
  render: IconRenderer,
};

export const Large: StoryObj<IconProps> = {
  args: {
    size: 'lg',
  },
  render: IconRenderer,
};

export const Medium: StoryObj<IconProps> = {
  args: {
    size: 'md',
  },
  render: IconRenderer,
};

export const Small: StoryObj<IconProps> = {
  args: {
    size: 'sm',
  },
  render: IconRenderer,
};

export const ExtraSmall: StoryObj<IconProps> = {
  args: {
    size: 'xs',
  },
  render: IconRenderer,
};
