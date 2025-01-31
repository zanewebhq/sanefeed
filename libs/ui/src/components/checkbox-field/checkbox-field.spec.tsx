import { render } from '@testing-library/react';

import CheckboxField from './checkbox-field';

describe('Text', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CheckboxField />);
    expect(baseElement).toBeTruthy();
  });
});
