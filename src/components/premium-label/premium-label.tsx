import type { ReactNode } from 'react';

export function PremiumLabel({ blockClassName = 'place-card' }: { blockClassName?: string }): ReactNode {
  return (
    <div className={`${blockClassName}__mark`}>
      <span>Premium</span>
    </div>
  );
}
