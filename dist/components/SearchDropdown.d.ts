/// <reference types="react" />
interface Props {
    inputValues: Record<string, string>;
    property: string;
    handleSearchByProperty: (name: string, value: string) => void;
    handleReset: (property: string) => void;
}
declare const SearchDropdown: ({ inputValues, property, handleSearchByProperty, handleReset }: Props) => JSX.Element;
export default SearchDropdown;
