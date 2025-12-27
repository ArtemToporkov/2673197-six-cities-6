import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { BookmarkButton } from './bookmark-button.tsx';

describe('Component: Bookmark button', () => {
  describe('rendering', () => {
    it('should display button', () => {
      render(<BookmarkButton active={false} onClick={() => {}} />);
      const button = screen.getByRole('button');

      expect(button).toBeInTheDocument();
    });

    it('should call onClick when button clicked', async () => {
      const onClick = vi.fn();
      render(
        <BookmarkButton
          active={false}
          onClick={onClick}
        />
      );

      await userEvent.click(screen.getByRole('button'));

      expect(onClick).toBeCalledTimes(1);
    });

  });
});
