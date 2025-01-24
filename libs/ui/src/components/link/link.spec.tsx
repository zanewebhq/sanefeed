import { render } from '@testing-library/react';

import Link from './link';

describe('Link', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Link href="#">Click me</Link>);
    expect(baseElement).toBeTruthy();
  });
});
