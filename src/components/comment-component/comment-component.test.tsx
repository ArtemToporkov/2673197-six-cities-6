import { render, screen } from '@testing-library/react';

import { makeComment } from '../../utils.ts';
import { CommentComponent } from './comment-component.tsx';
import type { Comment } from '../../types/comment.ts';

describe('Component: Comment', () => {
  describe('rendering', () => {
    let comment: Comment;

    beforeEach(() => {
      comment = makeComment();

      render(<CommentComponent comment={comment} />);
    });

    it('should display user name', () => {
      const userName = screen.getByText(comment.user.name);
      expect(userName).toBeInTheDocument();
    });

    it('should display rating', () => {
      const rating = screen.getByText(/rating/i);
      expect(rating).toBeInTheDocument();
    });

    it('should display comment text', () => {
      const commentText = screen.getByText(comment.comment);
      expect(commentText).toBeInTheDocument();
    });

    it('should display user avatar', () => {
      const avatar = screen.getByAltText(/reviews avatar/i);
      expect(avatar).toBeInTheDocument();
    });

    it('should display month and year', () => {
      const dateObject = new Date(comment.date);
      const dateString = dateObject.toLocaleString('en-US', { month: 'long', year: 'numeric' });
      const dateElement = screen.getByText(dateString);
      expect(dateElement).toBeInTheDocument();
    });
  });
});
