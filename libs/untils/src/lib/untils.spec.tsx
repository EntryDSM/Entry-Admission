import { render } from '@testing-library/react';

import Untils from './untils';

describe('Untils', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Untils />);
    expect(baseElement).toBeTruthy();
  });
});
