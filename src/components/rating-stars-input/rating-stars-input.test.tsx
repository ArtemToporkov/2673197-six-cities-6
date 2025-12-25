import { render, screen } from '@testing-library/react';

import { RATINGS } from '../../const.ts';
import { RatingStarsInput } from './rating-stars-input.tsx';

describe('Component: Score stars', () => {
  describe('rendering', () => {
    beforeEach(() => {
      render(<RatingStarsInput onRatingChanged={() => {}} />);
    });

    it('should display correct number of rating radio buttons', () => {
      const radios = screen.getAllByRole('radio');
      expect(radios.length).toBe(RATINGS.length);
    });

    it('should display all ratings descriptions', () => {
      RATINGS.forEach((rating) => {
        expect(screen.getByLabelText(rating.description)).toBeInTheDocument();
      });
    });
  });
});
