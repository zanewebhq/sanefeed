import { render } from '@testing-library/react';

import Toast from '.';

describe('Spinner', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Toast />);
    expect(baseElement).toBeTruthy();
  });
});
