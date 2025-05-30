import { render } from '@testing-library/react';

import Text from '.';

describe('Text', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Text>Hello, world!</Text>);
    expect(baseElement).toBeTruthy();
  });
});
