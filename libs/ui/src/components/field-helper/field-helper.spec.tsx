import { render } from '@testing-library/react';

import FieldHelper from './field-helper';

describe('Text', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FieldHelper />);
    expect(baseElement).toBeTruthy();
  });
});
