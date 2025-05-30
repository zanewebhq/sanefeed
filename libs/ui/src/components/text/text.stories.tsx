import type { Meta, StoryObj } from '@storybook/react';
import Text, { TextProps } from '.';

const meta: Meta<typeof Text> = {
  component: Text,
  title: 'UI/Text',
};
export default meta;

export const Heading1: StoryObj<TextProps> = {
  args: {
    children: 'Hello, world!',
    type: 'heading',
    as: 'h1',
    size: '5xl',
  },
};

export const Heading2: StoryObj<TextProps> = {
  args: {
    children: 'Hello, world!',
    type: 'heading',
    as: 'h2',
    size: '4xl',
  },
};

export const Heading3: StoryObj<TextProps> = {
  args: {
    children: 'Hello, world!',
    type: 'heading',
    as: 'h3',
    size: '2xl',
  },
};

export const Heading4: StoryObj<TextProps> = {
  args: {
    children: 'Hello, world!',
    type: 'heading',
    as: 'h4',
    size: 'lg',
  },
};

export const Heading5: StoryObj<TextProps> = {
  args: {
    children: 'Hello, world!',
    type: 'heading',
    as: 'h5',
    size: 'sm',
  },
};

export const Body1: StoryObj<TextProps> = {
  args: {
    children: 'Hello, world!',
    type: 'body',
    as: 'p',
    size: 'xl',
  },
};

export const Body2: StoryObj<TextProps> = {
  args: {
    children: 'Hello, world!',
    type: 'body',
    as: 'p',
    size: 'lg',
  },
};

export const Body3: StoryObj<TextProps> = {
  args: {
    children: 'Hello, world!',
    type: 'body',
    as: 'p',
    size: 'md',
  },
};

export const Body4: StoryObj<TextProps> = {
  args: {
    children: 'Hello, world!',
    type: 'body',
    as: 'p',
    size: 'sm',
  },
};

export const Body5: StoryObj<TextProps> = {
  args: {
    children: 'Hello, world!',
    type: 'body',
    as: 'p',
    size: 'xs',
  },
};

export const Ui1: StoryObj<TextProps> = {
  args: {
    children: 'Hello, world!',
    type: 'ui',
    as: 'span',
    size: '4xl',
  },
};
export const Ui2: StoryObj<TextProps> = {
  args: {
    children: 'Hello, world!',
    type: 'ui',
    as: 'span',
    size: '3xl',
  },
};
export const Ui3: StoryObj<TextProps> = {
  args: {
    children: 'Hello, world!',
    type: 'ui',
    as: 'span',
    size: '2xl',
  },
};
export const Ui4: StoryObj<TextProps> = {
  args: {
    children: 'Hello, world!',
    type: 'ui',
    as: 'span',
    size: 'xl',
  },
};
export const Ui5: StoryObj<TextProps> = {
  args: {
    children: 'Hello, world!',
    type: 'ui',
    as: 'span',
    size: 'lg',
  },
};
export const Ui6: StoryObj<TextProps> = {
  args: {
    children: 'Hello, world!',
    type: 'ui',
    as: 'span',
    size: 'md',
  },
};
export const Ui7: StoryObj<TextProps> = {
  args: {
    children: 'Hello, world!',
    type: 'ui',
    as: 'span',
    size: 'sm',
  },
};
export const Ui8: StoryObj<TextProps> = {
  args: {
    children: 'Hello, world!',
    type: 'ui',
    as: 'span',
    size: 'xs',
  },
};
