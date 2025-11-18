import classNames from 'classnames';
import type { ReactNode } from 'react';

import { useAppDispatch } from '../../hooks/use-app-dispatch.ts';
import { switchSortingType } from '../../store/action.ts';
import { useAppSelector } from '../../hooks/use-app-selector.ts';
import { useToggle } from '../../hooks/use-toggle.ts';

export function SortingTypeMenu(): ReactNode {
  const [isOpened, toggleIsOpened] = useToggle(false);
  const dispatch = useAppDispatch();
  const currentSortingType = useAppSelector((state) => state.currentSortingType);
  const sortingTypes = useAppSelector((state) => state.sortingTypes);
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={toggleIsOpened}>
        {currentSortingType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={classNames(
          'places__options',
          'places__options--custom',
          { 'places__options--opened': isOpened }
        )}
      >
        {sortingTypes.map((st) => (
          <li
            key={st}
            className={classNames(
              'places__option',
              { 'places__option--active': currentSortingType === st }
            )}
            tabIndex={0}
            onClick={() => {
              dispatch(switchSortingType(st));
              toggleIsOpened();
            }}
          >
            {st}
          </li>
        ))}
      </ul>
    </form>
  );
}
