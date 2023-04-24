/// <reference types="react" />
import { InputValues } from './Table';
interface Props<T> {
    inputValues: InputValues<T>;
    property: string;
    handleSearchByProperty: (name: string, value: string) => void;
    handleReset: (property: string) => void;
}
declare const SearchDropdown: <T extends readonly string[]>({ inputValues, property, handleSearchByProperty, handleReset }: Props<T>) => JSX.Element;
export default SearchDropdown;
