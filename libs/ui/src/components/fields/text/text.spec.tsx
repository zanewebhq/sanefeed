import { render } from '@testing-library/react';

import TextField from '.';

describe('Text', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TextField />);
    expect(baseElement).toBeTruthy();
  });
});
