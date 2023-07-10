import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { InputValues } from './Table';

/**
 * Props: The properties passed to the SearchByProperty component.
 *
 * @template U - The type of the input values. By default, it's set to 'string'.
 * @param {InputValues<U>} inputValues - The values entered in the input fields.
 * @param {string} property - The property name to be searched.
 * @param {(name: string, value: string) => void} handleSearchByProperty - A function that is called when the search term changes for a property.
 * @param {(property: string) => void} handleReset - A function that is called when the reset button is clicked for a property.
 */
export interface PropsSearchBProp<
  U extends string | number | readonly string[] | undefined = string,
> {
  inputValues: InputValues<U>;
  property: string;
  handleSearchByProperty: (name: string, value: string) => void;
  handleReset: (property: string) => void;
}

/**
 * SearchByProperty: A component for searching by property.
 *
 * @component
 * @template U - The type of the input values. By default, it's set to 'string'.
 * @param {Props<U>} props - The properties passed to the SearchByProperty component.
 * @returns {React.ReactElement} - Returns a JSX element representing the rendered SearchByProperty component.
 */
const SearchByProperty = <
  U extends string | number | readonly string[] | undefined = string,
>({
  inputValues,
  property,
  handleSearchByProperty,
  handleReset,
}: PropsSearchBProp<U>): React.ReactElement => {
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
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleResetSearchByProperty();
          }
        }}
        data-testid={`btnResetClose-${property}`}
        aria-label={`Clear the search by ${property}`}
      >
        <FaTimes />
      </button>
    </div>
  );
};

export default SearchByProperty;
