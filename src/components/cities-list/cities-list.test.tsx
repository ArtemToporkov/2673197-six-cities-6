import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { CitiesList } from './cities-list.tsx';
import { makeCity } from '../../utils/mocks.ts';
import { withStore } from '../../utils/component-mocks.tsx';
import { makeStore } from '../../utils/mocks.ts';

describe('Component: CitiesList', () => {
  it('should call onCityClick when a city is clicked', async () => {
    const onCityClick = vi.fn();
    const city1 = makeCity({ name: 'Paris' });
    const city2 = makeCity({ name: 'Cologne' });
    const cities = [city1, city2];

    const { withStoreComponent } = withStore(
      <CitiesList cities={cities} onCityClick={onCityClick} />,
      makeStore({ cities: { city: city1, cities } })
    );

    render(withStoreComponent);

    await userEvent.click(screen.getByText(city2.name));

    expect(onCityClick).toBeCalledTimes(1);
    expect(onCityClick).toBeCalledWith(city2);
  });
});
