import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MainPage } from './main-page.tsx';
import { withStore } from '../../utils/component-mocks.tsx';
import { makeStore, makeCity, makeOfferPreviewInfo } from '../../utils/mocks.ts';

vi.mock('../../components/map/map.tsx', () => ({
  Map: () => <div data-testid="map">Map Component</div>
}));

describe('Component: MainPage', () => {
  it('should render correct number of places available', () => {
    const city = makeCity({ name: 'Paris' });
    const offers = [makeOfferPreviewInfo({ city }), makeOfferPreviewInfo({ city })];
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
      makeStore({
        cities: { city: city, cities: [city] },
        offers: { ...makeStore().offers, offersInCity: offers }
      })
    );

    render(withStoreComponent);

    expect(screen.getByText(`${offers.length} places to stay in ${city.name}`)).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

  it('should render empty state when no offers in city', () => {
    const city = makeCity({ name: 'Paris' });
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
      makeStore({
        cities: { city: city, cities: [city] },
        offers: { ...makeStore().offers, offersInCity: [] }
      })
    );

    render(withStoreComponent);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.queryByTestId('map')).not.toBeInTheDocument();
  });
});
