import { render, screen } from '@testing-library/react';
import { datatype, image, internet } from 'faker';

import { HostCard } from './host-card.tsx';
import type { HostInfo } from '../../types/host-info.ts';

describe('Component: Host card', () => {
  describe('rendering', () => {
    const makeHostInfo = (initial?: Partial<HostInfo>): HostInfo => ({
      avatarUrl: image.avatar(),
      isPro: datatype.boolean(),
      name: internet.userName(),
      ...initial
    });

    it('should display host avatar', () => {
      render(<HostCard hostInfo={makeHostInfo()} />);

      const avatar = screen.getByAltText(/host avatar/i);
      expect(avatar).toBeInTheDocument();
    });

    it('should display host name', () => {
      const hostInfo = makeHostInfo();
      render(<HostCard hostInfo={hostInfo} />);

      const name = screen.getByText(hostInfo.name);
      expect(name).toBeInTheDocument();
    });

    it('should display pro status when host\'s status is pro', () => {
      render(<HostCard hostInfo={makeHostInfo({ isPro: true })} />);

      const proText = screen.getByText(/pro/i);
      expect(proText).toBeInTheDocument();
    });

    it('should not display pro status when host\'s status is not pro', () => {
      render(<HostCard hostInfo={makeHostInfo({ isPro: false })} />);

      const proText = screen.queryByText(/pro/i);
      expect(proText).not.toBeInTheDocument();
    });
  });
});
