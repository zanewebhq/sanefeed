import { render } from '@testing-library/react';

import TextField from './text-field';

describe('Text', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TextField />);
    expect(baseElement).toBeTruthy();
  });
});
