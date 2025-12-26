import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { OffersType } from '../../mocks/offers';
import PlaceCardList from '../../components/place-card-list';
import Map2 from '../../components/map';
import CityList from '../../components/city-list';
import SortingOptions, { SortOption } from '../../components/sorting-options';
import { useSelector, useDispatch } from 'react-redux';
import { changeCity } from '../../store/action';

type MainPageProps = {
  offers: OffersType[];
};

const CITY_COORDINATES: Record<
  string,
  { latitude: number; longitude: number }
> = {
  Paris: { latitude: 48.85661, longitude: 2.351499 },
  Cologne: { latitude: 50.93753, longitude: 6.96028 },
  Brussels: { latitude: 50.85045, longitude: 4.34878 },
  Amsterdam: { latitude: 52.37454, longitude: 4.897976 },
  Hamburg: { latitude: 53.55108, longitude: 9.99368 },
  Dusseldorf: { latitude: 51.22774, longitude: 6.77346 },
};

function MainPage({ offers }: MainPageProps): JSX.Element {
  const dispatch = useDispatch();
  const selectedCity = useSelector((state: { city: string }) => state.city);
  const selectedSort = useSelector(
    (state: { sortOption: SortOption }) => state.sortOption || 'Popular'
  );
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  const filteredOffers = useMemo(
    () => offers.filter((offer) => offer.city.name === selectedCity),
    [offers, selectedCity]
  );

  const sortedOffers = useMemo(() => {
    const sorted = [...filteredOffers];

    switch (selectedSort) {
      case 'Price: low to high':
        sorted.sort((a, b) => a.priceValue - b.priceValue);
        break;
      case 'Price: high to low':
        sorted.sort((a, b) => b.priceValue - a.priceValue);
        break;
      case 'Top rated first':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'Popular':
      default:
        break;
    }

    return sorted;
  }, [filteredOffers, selectedSort]);

  const cityOffersCount = filteredOffers.length;

  const cityLocation =
    filteredOffers.length > 0
      ? filteredOffers[0].city.location
      : CITY_COORDINATES[selectedCity] || CITY_COORDINATES.Paris;

  const handleCityChange = (city: string) => {
    dispatch(changeCity(city));
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link
                className="header__logo-link header__logo-link--active"
                to="/"
              >
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to="/favorites"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CityList
            cities={[
              'Paris',
              'Cologne',
              'Brussels',
              'Amsterdam',
              'Hamburg',
              'Dusseldorf',
            ]}
            activeCity={selectedCity}
            onCityChange={handleCityChange}
          />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {cityOffersCount} places to stay in {selectedCity}
              </b>
              <SortingOptions />
              <div className="cities__places-list places__list tabs__content">
                <PlaceCardList
                  offers={sortedOffers}
                  onCardHover={setHoveredCardId}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map2
                  city={{
                    lat: cityLocation.latitude,
                    lng: cityLocation.longitude,
                    zoom: 10,
                  }}
                  points={sortedOffers
                    .filter((offer) => offer.location)
                    .map((offer) => ({
                      id: offer.id,
                      lat: offer.location.latitude,
                      lng: offer.location.longitude,
                      title: offer.name,
                    }))}
                  selectedPoint={undefined}
                  hoveredPointId={hoveredCardId}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
