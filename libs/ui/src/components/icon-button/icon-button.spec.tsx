import { render } from '@testing-library/react';

import IconButton from '.';

describe('IconButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IconButton />);
    expect(baseElement).toBeTruthy();
  });
});
