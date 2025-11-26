import classNames from 'classnames';
import type { ReactNode } from 'react';

import { useAppSelector } from '../../hooks/use-app-selector.ts';
import type { City } from '../../types/city.ts';

type CitiesListProps = {
  cities: City[];
  onCityClick: (city: City) => void;
}

export function CitiesList({cities, onCityClick}: CitiesListProps): ReactNode {
  const currentCity = useAppSelector((state) => state.city);
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li className="locations__item" key={city.name}>
            <a
              className={classNames(
                'locations__item-link',
                'tabs__item',
                { 'tabs__item--active': city === currentCity }
              )}
              onClick={() => void onCityClick(city)}
            >
              <span>{city.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
