import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeSortOption } from '../store/action';

export type SortOption =
  | 'Popular'
  | 'Price: low to high'
  | 'Price: high to low'
  | 'Top rated first';

function SortingOptions(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const selectedSort = useSelector(
    (state: { sortOption: SortOption }) => state.sortOption || 'Popular'
  );
  const dispatch = useDispatch();

  const sortOptions: SortOption[] = [
    'Popular',
    'Price: low to high',
    'Price: high to low',
    'Top rated first',
  ];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSortClick = (option: SortOption) => {
    dispatch(changeSortOption(option));
    setIsOpen(false);
  };

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      style={{ position: 'relative', zIndex: 1000 }}
    >
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleToggle}
      >
        {selectedSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          isOpen ? 'places__options--opened' : ''
        }`}
      >
        {sortOptions.map((option) => (
          <li
            key={option}
            className={`places__option ${
              selectedSort === option ? 'places__option--active' : ''
            }`}
            tabIndex={0}
            onClick={() => handleSortClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortingOptions;
