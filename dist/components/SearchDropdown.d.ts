/// <reference types="react" />
import { InputValues } from './Table';
interface SearchDropdownProps<U extends string | number | readonly string[] | undefined = string> {
    inputValues: InputValues<U>;
    property: string;
    handleSearchByProperty: (name: string, value: string) => void;
    handleReset: (property: string) => void;
}
declare const SearchDropdown: <U extends string | number | readonly string[] | undefined = string>({ inputValues, property, handleSearchByProperty, handleReset }: SearchDropdownProps<U>) => JSX.Element;
export default SearchDropdown;
