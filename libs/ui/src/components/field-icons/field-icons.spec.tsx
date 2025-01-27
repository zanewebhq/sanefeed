import { render } from '@testing-library/react';

import FieldIcons from './field-icons';

describe('Text', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FieldIcons />);
    expect(baseElement).toBeTruthy();
  });
});
