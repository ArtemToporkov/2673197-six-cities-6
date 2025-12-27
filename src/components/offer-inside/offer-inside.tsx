import type { ReactNode } from 'react';

import { Good } from '../../enums/good.ts';

type OfferInsideProps = {
  goods: Good[];
}

export function OfferInside({ goods }: OfferInsideProps): ReactNode {
  return (
    <div className="offer__inside">
      <h2 className="offer__inside-title">What&apos;s inside</h2>
      <ul className="offer__inside-list">
        {goods.map((item) => (
          <li key={item} className="offer__inside-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
