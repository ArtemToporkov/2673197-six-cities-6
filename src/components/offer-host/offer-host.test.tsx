import { render, screen } from '@testing-library/react';
import { image, internet, lorem, datatype } from 'faker';

import { OfferHost } from './offer-host.tsx';
import type { HostInfo } from '../../types/host-info.ts';

describe('Component: OfferHost', () => {
  it('should render host info and description', () => {
    const description = lorem.paragraph();
    const host: HostInfo = {
      name: internet.userName(),
      avatarUrl: image.avatar(),
      isPro: datatype.boolean()
    };

    render(<OfferHost host={host} description={description} />);

    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(host.name)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByAltText(/Host avatar/i)).toHaveAttribute('src', host.avatarUrl);
  });
});
