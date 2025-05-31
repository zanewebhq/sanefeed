import { render } from '@testing-library/react';

import PasswordField from '.';

describe('Text', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PasswordField />);
    expect(baseElement).toBeTruthy();
  });
});
