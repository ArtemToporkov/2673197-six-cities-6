import type { ReactNode } from 'react';

import { HostCard } from '../host-card/host-card.tsx';
import type { HostInfo } from '../../types/host-info.ts';

type OfferHostProps = {
  host: HostInfo;
  description: string;
}

export function OfferHost({ host, description }: OfferHostProps): ReactNode {
  return (
    <div className="offer__host">
      <h2 className="offer__host-title">Meet the host</h2>
      <HostCard hostInfo={host}/>
      <div className="offer__description">
        <p className="offer__text">
          {description}
        </p>
      </div>
    </div>
  );
}
