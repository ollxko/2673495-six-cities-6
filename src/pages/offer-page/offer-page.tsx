import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import {
  fetchOfferByIdAction,
  fetchNearbyOffersAction,
  fetchCommentsAction,
  postCommentAction,
} from '../../store/api-actions';
import { Offer } from '../../types/offer';
import { Review } from '../../types/review';
import CommentForm from '../../components/comment-form';
import LoadingScreen from '../loading-screen/loading-screen';
import ReviewList from '../../components/review-list';
import MapComponent, { Point } from '../../components/map';
import PlaceCardList from '../../components/place-card-list';

export default function OfferPage(): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const currentOffer = useSelector(
    (state: RootState): RootState['currentOffer'] => state.currentOffer
  );
  const isOfferLoading = useSelector(
    (state: RootState): RootState['isOfferLoading'] => state.isOfferLoading
  );
  const nearbyOffers = useSelector<RootState, Offer[]>(
    (state) => state.nearbyOffers
  );
  const comments = useSelector<RootState, Review[]>(
    (state) => state.comments
  );
  const authorizationStatus = useSelector(
    (state: RootState) => state.authorizationStatus
  );

  const handleCommentSubmit = async (comment: string, rating: number) => {
    if (!id) {
      return;
    }

    await dispatch(
      postCommentAction({
        offerId: id,
        commentData: { comment, rating },
      })
    ).unwrap();

    void dispatch(fetchCommentsAction(id));
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferByIdAction(id))
        .unwrap()
        .catch(() => {
          navigate('/404');
        });

      void dispatch(fetchNearbyOffersAction(id));
      void dispatch(fetchCommentsAction(id));
    }
  }, [dispatch, id, navigate]);

  const mapPoints = useMemo<Point[]>(
    () =>
      nearbyOffers.map((offer) => ({
        id: offer.id,
        lat: offer.location.latitude,
        lng: offer.location.longitude,
        title: offer.title,
      })),
    [nearbyOffers]
  );

  const selectedPoint = useMemo<Point | undefined>(() => {
    if (!currentOffer) {
      return undefined;
    }
    return {
      id: currentOffer.id,
      lat: currentOffer.location.latitude,
      lng: currentOffer.location.longitude,
      title: currentOffer.title,
    };
  }, [currentOffer]);

  const cityLocation = useMemo(() => {
    if (!currentOffer) {
      return { lat: 0, lng: 0 };
    }
    return {
      lat: currentOffer.location.latitude,
      lng: currentOffer.location.longitude,
      zoom: currentOffer.location.zoom,
    };
  }, [currentOffer]);

  if (isOfferLoading || !currentOffer) {
    return <LoadingScreen />;
  }

  const {
    images,
    isPremium,
    title,
    isFavorite,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
    description,
  } = currentOffer;

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
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
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.slice(0, 6).map((image, index) => (
                <div key={image} className="offer__image-wrapper">
                  <img
                    className="offer__image"
                    src={image}
                    alt={`Photo studio ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{title}</h1>
                <button
                  className={`offer__bookmark-button button ${
                    isFavorite ? 'offer__bookmark-button--active' : ''
                  }`}
                  type="button"
                >
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">
                    {isFavorite ? 'In' : 'To'} bookmarks
                  </span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${(rating / 5) * 100}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} Bedroom{bedrooms !== 1 ? 's' : ''}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} adult{maxAdults !== 1 ? 's' : ''}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={`offer__avatar-wrapper user__avatar-wrapper ${
                      host.isPro ? 'offer__avatar-wrapper--pro' : ''
                    }`}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{host.name}</span>
                  {host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  {description
                    .split('\n')
                    .filter((p) => p.trim())
                    .map((paragraph) => (
                      <p key={paragraph} className="offer__text">
                        {paragraph}
                      </p>
                    ))}
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewList reviews={comments} />
                {authorizationStatus === 'AUTH' && (
                  <CommentForm onSubmit={handleCommentSubmit} />
                )}
              </section>
            </div>
          </div>
          <MapComponent
            city={cityLocation}
            points={mapPoints}
            selectedPoint={selectedPoint}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <PlaceCardList
              offers={nearbyOffers}
              listClassName="near-places__list places__list"
              cardClassName="near-places__card place-card"
              imageWrapperClassName="near-places__image-wrapper place-card__image-wrapper"
            />
          </section>
        </div>
      </main>
    </div>
  );
}
