import { render } from '@testing-library/react';

import FieldLabel from './field-label';

describe('Text', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FieldLabel />);
    expect(baseElement).toBeTruthy();
  });
});
