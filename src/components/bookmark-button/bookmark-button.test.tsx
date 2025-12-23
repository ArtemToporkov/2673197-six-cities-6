import { render, screen } from '@testing-library/react';

import { BookmarkButton } from './bookmark-button.tsx';

describe('Component: Bookmark button', () => {
  describe('rendering', () => {
    it('should display button', () => {
      render(<BookmarkButton active={false} onClick={() => {}} />);
      const button = screen.getByRole('button');

      expect(button).toBeInTheDocument();
    });
  });
});
