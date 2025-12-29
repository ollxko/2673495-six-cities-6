import PlaceCard from './place-card';
import { Offer } from '../types/offer';

type PlaceCardListProps = {
  offers: Offer[];
  onCardHover?: (id: string | null) => void;
  listClassName?: string;
  cardClassName?: string;
  imageWrapperClassName?: string;
};

function PlaceCardList({
  offers,
  onCardHover,
  listClassName = 'places__list',
  cardClassName,
  imageWrapperClassName,
}: PlaceCardListProps): JSX.Element {
  const handleCardMouseEnter = (id: string) => {
    onCardHover?.(id);
  };

  const handleCardMouseLeave = () => {
    onCardHover?.(null);
  };

  return (
    <ul className={listClassName}>
      {offers.map((offer: Offer) => (
        <li
          key={offer.id}
          onMouseEnter={() => handleCardMouseEnter(offer.id)}
          onMouseLeave={handleCardMouseLeave}
        >
          <PlaceCard
            id={offer.id}
            isPremium={offer.isPremium}
            previewImage={offer.previewImage}
            price={offer.price}
            rating={offer.rating}
            isFavorite={offer.isFavorite}
            title={offer.title}
            type={offer.type}
            cardClassName={cardClassName}
            imageWrapperClassName={imageWrapperClassName}
          />
        </li>
      ))}
    </ul>
  );
}

export default PlaceCardList;
