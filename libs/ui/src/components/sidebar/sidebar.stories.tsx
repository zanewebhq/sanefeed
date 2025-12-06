import type { Meta, StoryObj } from '@storybook/react-vite';
import Sidebar, { SidebarProps } from '.';

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  title: 'UI/Sidebar',
  decorators: [
    (Story: StoryObj) => (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'var(--color-neutral-400)',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
export default meta;

export const Primary: StoryObj<SidebarProps> = {
  args: {},
};
