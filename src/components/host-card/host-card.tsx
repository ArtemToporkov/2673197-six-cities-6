import classNames from 'classnames';
import type { ReactNode } from 'react';

import type { HostInfo } from '../../types/host-info.ts';

type HostCardProps = {
  hostInfo: HostInfo;
}

export function HostCard({ hostInfo: { avatarUrl, isPro, name } }: HostCardProps): ReactNode {
  return (
    <div className="offer__host-user user">
      <div
        className={classNames(
          'offer__avatar-wrapper',
          'user__avatar-wrapper',
          { 'offer__avatar-wrapper--pro': isPro }
        )}
      >
        <img
          className="offer__avatar user__avatar"
          src={avatarUrl}
          width={74}
          height={74}
          alt="Host avatar"
        />
      </div>
      <span className="offer__user-name">{name}</span>
      {isPro && <span className="offer__user-status">Pro</span>}
    </div>
  );
}
