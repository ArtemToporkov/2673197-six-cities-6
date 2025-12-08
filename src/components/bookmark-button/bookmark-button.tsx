import classNames from 'classnames';
import { ReactNode, useState } from 'react';

type BookmarkButtonProps = {
  active: boolean;
  onClick: () => void;
};

export function BookmarkButton({ active, onClick }: BookmarkButtonProps): ReactNode {
  const [isActive, setIsActive] = useState<boolean>(active);
  return (
    <button
      className={classNames(
        'place-card__bookmark-button button',
        { 'place-card__bookmark-button--active': isActive }
      )}
      type="button"
      onClick={() => {
        onClick();
        setIsActive(!isActive);
      }}
    >
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isActive ? 'In' : 'To'} bookmarks</span>
    </button>
  );
}
