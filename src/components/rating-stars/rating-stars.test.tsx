import { render, screen } from '@testing-library/react';

import { RatingStars } from './rating-stars.tsx';

describe('Component: RatingStars', () => {
  it('should render correctly with given rating', () => {
    const rating = 4;
    const expectedWidth = `${rating * 20}%`;

    render(<RatingStars rating={rating} />);

    const ratingValue = screen.getByText(/Rating/i);
    expect(ratingValue).toBeInTheDocument();

    const starsElement = ratingValue.previousSibling as HTMLElement;
    expect(starsElement).toHaveStyle({ width: expectedWidth });
  });

  it('should render children', () => {
    const testId = 'test-child';
    render(
      <RatingStars rating={5}>
        <span data-testid={testId}>Child</span>
      </RatingStars>
    );

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
