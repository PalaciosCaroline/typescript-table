import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { InputValues } from './Table';

interface Props<U extends string | number | readonly string[] | undefined = string> {
  inputValues: InputValues<U>;
  property: string;
  handleSearchByProperty: (name: string, value: string) => void;
  handleReset: (property: string) => void;
}

const SearchByProperty = <U extends string | number | readonly string[] | undefined = string>({
  inputValues,
  property,
  handleSearchByProperty,
  handleReset,
 
}: Props<U>) => {
  const handleResetClose = () => {
    handleReset(property);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const property = event.target.name;
    const value = event.target.value;
    handleSearchByProperty(property, value);
  };

  return (
    <div className="box-searchBProps">
        <input
            type="text"
            value={inputValues[property]}
            onChange={handleInputChange}
            placeholder="Search..."
            name={property}
            className='inputSearchByProperty'
            data-testid={`btnSearch-${property}`}
        />
        <button
            type="button"
            className='btnSearchByPropertyReset'
            onClick={handleResetClose}
            data-testid={`btnResetClose-${property}`}
            aria-label={`Clear and close the search by ${property}`}
            >
            <FaTimes/>
        </button>
     </div>
  );
};

export default SearchByProperty;