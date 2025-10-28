import { HostInfo } from '../../types/host-info.ts';
import { ReactNode } from 'react';

type HostCardProps = {
  hostInfo: HostInfo;
}

export function HostCard({hostInfo: {avatarUrl, status, name}}: HostCardProps): ReactNode {
  return (
    <div className="offer__host-user user">
      <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
        <img
          className="offer__avatar user__avatar"
          src={avatarUrl}
          width={74}
          height={74}
          alt="Host avatar"
        />
      </div>
      <span className="offer__user-name">{name}</span>
      <span className="offer__user-status">{status}</span>
    </div>
  );
}
