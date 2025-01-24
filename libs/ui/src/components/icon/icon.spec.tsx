import { render } from '@testing-library/react';

import Icon from './icon';

describe('Icon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Icon name="arrow-back" />);
    expect(baseElement).toBeTruthy();
  });
});
