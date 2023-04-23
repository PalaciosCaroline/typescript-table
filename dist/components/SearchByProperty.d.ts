/// <reference types="react" />
interface Props {
    inputValues: Record<string, string>;
    property: string;
    handleSearchByProperty: (name: string, value: string) => void;
    handleReset: (property: string) => void;
    handleClose: () => void;
}
declare const SearchByProperty: ({ inputValues, property, handleSearchByProperty, handleReset, handleClose }: Props) => JSX.Element;
export default SearchByProperty;
