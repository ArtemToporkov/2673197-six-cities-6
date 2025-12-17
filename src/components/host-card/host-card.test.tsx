import { render, screen } from '@testing-library/react';
import { datatype, image, internet } from 'faker';

import type { HostInfo } from '../../types/host-info.ts';
import { HostCard } from './host-card.tsx';

describe('Component: Host card', () => {
  describe('rendering', () => {
    let hostInfo: HostInfo;

    beforeEach(() => {
      hostInfo = {
        avatarUrl: image.avatar(),
        isPro: datatype.boolean(),
        name: internet.userName()
      };

      render(<HostCard hostInfo={hostInfo} />);
    });

    it('should display host avatar', () => {
      const avatar = screen.getByAltText(/host avatar/i);
      expect(avatar).toBeInTheDocument();
    });

    it('should display host name', () => {
      const name = screen.getByText(hostInfo.name);
      expect(name).toBeInTheDocument();
    });

    it('should display pro status when host\'s status is pro', () => {
      hostInfo.isPro = true;

      const proText = screen.getByText(/pro/i);
      expect(proText).toBeInTheDocument();
    });

    it('should not display pro status when host\'s status is not pro', () => {
      hostInfo.isPro = false;

      const proText = screen.queryByText(/pro/i);
      expect(proText).not.toBeInTheDocument();
    });
  });
});
