import classNames from 'classnames';
import type { ReactNode } from 'react';

import { useAppSelector } from '../../hooks/use-app-selector.ts';
import { CityName } from '../../enums/city-name.ts';

type CitiesListProps = {
  cities: CityName[];
  onCityClick: (city: CityName) => void;
}

export function CitiesList({cities, onCityClick}: CitiesListProps): ReactNode {
  const currentCity = useAppSelector((state) => state.city);
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li className="locations__item" key={city}>
            <a
              className={classNames(
                'locations__item-link',
                'tabs__item',
                { 'tabs__item--active': city === currentCity }
              )}
              onClick={() => void onCityClick(city)}
            >
              <span>{city}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
