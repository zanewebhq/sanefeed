import { render } from '@testing-library/react';

import FormError from '.';

describe('Text', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormError />);
    expect(baseElement).toBeTruthy();
  });
});
