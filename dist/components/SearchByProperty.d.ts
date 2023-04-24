/// <reference types="react" />
import { InputValues } from './Table';
interface Props<T> {
    inputValues: InputValues<T>;
    property: string;
    handleSearchByProperty: (name: string, value: string) => void;
    handleReset: (property: string) => void;
    handleClose: () => void;
}
declare const SearchByProperty: <T extends string | number | readonly string[] | undefined>({ inputValues, property, handleSearchByProperty, handleReset, handleClose }: Props<T>) => JSX.Element;
export default SearchByProperty;
