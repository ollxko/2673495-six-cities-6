import PlaceCard, { placeCardProps } from './place-card';

type PlaceCardListProps = {
  offers: placeCardProps[];
  onCardHover?: (id: number | null) => void;
};

function PlaceCardList({
  offers,
  onCardHover,
}: PlaceCardListProps): JSX.Element {
  const handleCardMouseEnter = (id: number) => {
    onCardHover?.(id);
  };

  const handleCardMouseLeave = () => {
    onCardHover?.(null);
  };

  return (
    <div>
      <ul className="places__list">
        {offers.map((offer) => (
          <li
            key={offer.id}
            onMouseEnter={() => handleCardMouseEnter(offer.id)}
            onMouseLeave={handleCardMouseLeave}
          >
            <PlaceCard
              id={offer.id}
              mark={offer.mark}
              imageSrc={offer.imageSrc}
              priceValue={offer.priceValue}
              rating={offer.rating}
              isInBookmarks={offer.isInBookmarks}
              name={offer.name}
              type={offer.type}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlaceCardList;
