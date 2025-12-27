import { Link } from 'react-router-dom';

export type placeCardProps = {
  id: number;
  mark: boolean;
  imageSrc: string;
  priceValue: number;
  rating: number;
  isInBookmarks: boolean;
  name: string;
  type: string;
};


function PlaceCard({
  id,
  mark,
  imageSrc,
  priceValue,
  rating,
  isInBookmarks,
  name,
  type,
}: placeCardProps): JSX.Element {
  return (
    <article className="cities__card place-card">
      {mark && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={imageSrc}
            width="260"
            height="200"
            alt="Place image"
          >
          </img>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{priceValue}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${
              isInBookmarks ? 'place-card__bookmark-button--active' : ''
            } button`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {isInBookmarks ? 'In' : 'To'} bookmarks
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${(rating / 5) * 100}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{name}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
