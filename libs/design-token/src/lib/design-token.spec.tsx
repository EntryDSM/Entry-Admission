import { render } from '@testing-library/react';

import DesignToken from './design-token';

describe('DesignToken', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DesignToken />);
    expect(baseElement).toBeTruthy();
  });
});
