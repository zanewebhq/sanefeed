import { render } from '@testing-library/react';

import DialogButtons from '.';

describe('DialogButtons', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DialogButtons />);
    expect(baseElement).toBeTruthy();
  });
});
