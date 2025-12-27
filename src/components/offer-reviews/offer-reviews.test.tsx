import { render, screen } from '@testing-library/react';
import { OfferReviews } from './offer-reviews.tsx';
import { withStore } from '../../utils/component-mocks.tsx';
import { makeStore, makeComment, makeOfferFullInfo, makeUserInfo } from '../../utils/mocks.ts';
import { AuthStatus } from '../../enums/auth-status.ts';

describe('Component: OfferReviews', () => {
  it('should render comments list', () => {
    const comments = [makeComment(), makeComment()];
    const { withStoreComponent } = withStore(
      <OfferReviews comments={comments} />,
      makeStore()
    );

    render(withStoreComponent);

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(comments.length.toString())).toBeInTheDocument();
    expect(screen.getAllByTestId('comment-item')).toHaveLength(comments.length);
  });

  it('should render comment form if user is authorized', () => {
    const { withStoreComponent } = withStore(
      <OfferReviews comments={[]} />,
      makeStore({
        user: { authStatus: AuthStatus.Authorized, info: makeUserInfo() },
        offers: { ...makeStore().offers, offer: makeOfferFullInfo() }
      })
    );

    render(withStoreComponent);

    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
  });

  it('should not render comment form if user is unauthorized', () => {
    const { withStoreComponent } = withStore(
      <OfferReviews comments={[]} />,
      makeStore({ user: { authStatus: AuthStatus.Unauthorized, info: null } })
    );

    render(withStoreComponent);

    expect(screen.queryByText(/Your review/i)).not.toBeInTheDocument();
  });
});
