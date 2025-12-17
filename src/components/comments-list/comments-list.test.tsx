import { render, screen } from '@testing-library/react';
import { datatype } from 'faker';

import { makeComment } from '../../utils/mocks.ts';
import { CommentsList } from './comments-list.tsx';

describe('Component: Comments list', () => {
  describe('rendering', () => {
    it('should display correct comments count', () => {
      const comments = Array.from(
        { length: datatype.number({ min: 5, max: 10 }) },
        () => makeComment()
      );
      const testId = 'comment-item';

      render(<CommentsList comments={comments} />);

      const commentsCount = screen.getAllByTestId(testId).length;
      expect(commentsCount).toEqual(comments.length);
    });
  });
});
