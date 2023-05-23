import { InputValues } from './Table';
interface Props<U extends string | number | readonly string[] | undefined = string> {
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
declare const SearchByProperty: <U extends string | number | readonly string[] | undefined = string>({ inputValues, property, handleSearchByProperty, handleReset, }: Props<U>) => import("react/jsx-runtime").JSX.Element;
export default SearchByProperty;
