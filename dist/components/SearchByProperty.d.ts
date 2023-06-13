import React from 'react';
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
interface Props<U extends string | number | readonly string[] | undefined = string> {
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
declare const SearchByProperty: <U extends string | number | readonly string[] | undefined = string>({ inputValues, property, handleSearchByProperty, handleReset, }: Props<U>) => React.ReactElement;
export default SearchByProperty;
