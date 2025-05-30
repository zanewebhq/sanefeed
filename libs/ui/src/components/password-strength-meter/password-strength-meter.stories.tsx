import type { Meta, StoryObj } from '@storybook/react';
import PasswordStrengthMeter, { PasswordStrengthMeterProps } from '.';

const meta: Meta<typeof PasswordStrengthMeter> = {
  component: PasswordStrengthMeter,
  title: 'PasswordStrengthMeter',
  decorators: [
    (Story) => (
      <div style={{ width: '20rem' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

export const Primary: StoryObj<PasswordStrengthMeterProps> = {
  args: {
    value: 'a',
  },
};
