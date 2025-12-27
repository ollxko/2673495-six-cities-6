type CityListProps = {
  cities: string[];
  activeCity: string;
  onCityChange: (city: string) => void;
};

function CityList({ cities, activeCity, onCityChange }: CityListProps): JSX.Element {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li key={city} className="locations__item">
            {city === activeCity ? (
              <a className="locations__item-link tabs__item tabs__item--active">
                <span>{city}</span>
              </a>
            ) : (
              <a
                className="locations__item-link tabs__item"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onCityChange(city);
                }}
              >
                <span>{city}</span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CityList;
