import type { Meta, StoryObj } from '@storybook/react';
import Text, { TextProps } from '.';
import styles from './text.module.css';

const meta: Meta<typeof Text> = {
  component: Text,
  title: 'UI/Text',
};
export default meta;

export const Playground: StoryObj<TextProps> = {
  args: {
    children: 'Hello, world!',
    type: 'label',
    as: 'span',
    size: 'md',
  },
};

const HeadingRenderer = (props: TextProps) => (
  <div className={styles.storyWrapper}>
    <Text {...props} as="h1" size="5xl" />
    <Text {...props} as="h2" size="4xl" />
    <Text {...props} as="h3" size="2xl" />
    <Text {...props} as="h4" size="lg" />
    <Text {...props} as="h5" size="sm" />
  </div>
);

export const Headings: StoryObj<TextProps> = {
  args: {
    children: 'Hello, world!',
    type: 'heading',
  },
  render: HeadingRenderer,
};

const ParagraphRenderer = (props: TextProps) => (
  <div className={styles.storyWrapper}>
    <Text {...props} size="xl" />
    <Text {...props} size="lg" />
    <Text {...props} size="md" />
    <Text {...props} size="sm" />
    <Text {...props} size="xs" />
  </div>
);

export const Paragraphs: StoryObj<TextProps> = {
  args: {
    children: 'This is a paragraph.',
    type: 'body',
    as: 'p',
  },
  render: ParagraphRenderer,
};

const LabelRenderer = (props: TextProps) => (
  <div className={styles.storyWrapper}>
    <Text {...props} size="4xl" />
    <Text {...props} size="3xl" />
    <Text {...props} size="2xl" />
    <Text {...props} size="xl" />
    <Text {...props} size="lg" />
    <Text {...props} size="md" />
    <Text {...props} size="sm" />
    <Text {...props} size="xs" />
  </div>
);

export const Labels: StoryObj<TextProps> = {
  args: {
    children: 'This is a label.',
    type: 'label',
    as: 'span',
    size: '4xl',
  },
  render: LabelRenderer,
};
