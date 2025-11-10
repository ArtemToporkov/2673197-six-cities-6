import { CityName } from '../../enums/city-name.ts';
import { ReactNode } from 'react';
import { useAppSelector } from '../../hooks/use-app-selector.ts';

type CitiesListProps = {
  cities: CityName[];
  onCityClick: (city: CityName) => Promise<void>;
}

export function CitiesList({cities, onCityClick}: CitiesListProps): ReactNode {
  const selectedCity = useAppSelector((state) => state.city);
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li className="locations__item" key={city}>
            <a
              className={`locations__item-link tabs__item ${city === selectedCity && 'tabs__item--active'}`}
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
