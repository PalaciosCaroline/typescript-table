import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { InputValues } from './Table';

interface Props<
  U extends string | number | readonly string[] | undefined = string,
> {
  inputValues: InputValues<U>;
  property: string;
  handleSearchByProperty: (name: string, value: string) => void;
  handleReset: (property: string) => void;
}

/**
 * Component for searching by property.
 *
 * @component
 * @template U - The type of the input values.
 * @param {Props<U>} props - The props for the SearchByProperty component.
 * @returns {React.ReactElement} The rendered SearchByProperty component.
 */
const SearchByProperty = <
  U extends string | number | readonly string[] | undefined = string,
>({
  inputValues,
  property,
  handleSearchByProperty,
  handleReset,
}: Props<U>) => {

  const handleResetSearchByProperty = () => {
    handleReset(property);
  };

   /**
   * Handles the input change event.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const property = event.target.name;
    const value = event.target.value;
    handleSearchByProperty(property, value);
  };

  return (
    <div className="box_searchBProps">
       {/* Input field for entering search term */}
      <input
        type="text"
        value={inputValues[property]}
        onChange={handleInputChange}
        placeholder="Search..."
        name={property}
        className="inputSearchByProperty"
        data-testid={`btnSearch-${property}`}
      />
       {/* Button for resetting the search */}
      <button
        type="button"
        className="btnSearchByPropertyReset"
        onClick={handleResetSearchByProperty}
        data-testid={`btnResetClose-${property}`}
        aria-label={`Clear the search by ${property}`}
      >
        <FaTimes />
      </button>
    </div>
  );
};

export default SearchByProperty;
