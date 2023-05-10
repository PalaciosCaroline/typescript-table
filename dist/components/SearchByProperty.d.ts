import { InputValues } from './Table';
interface Props<U extends string | number | readonly string[] | undefined = string> {
    inputValues: InputValues<U>;
    property: string;
    handleSearchByProperty: (name: string, value: string) => void;
    handleReset: (property: string) => void;
}
declare const SearchByProperty: <U extends string | number | readonly string[] | undefined = string>({ inputValues, property, handleSearchByProperty, handleReset, }: Props<U>) => import("react/jsx-runtime").JSX.Element;
export default SearchByProperty;
