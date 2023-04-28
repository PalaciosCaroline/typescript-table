/// <reference types="react" />
interface DropdownProps {
    defaultValueSelectedOption: string;
    options: string[];
    onOptionClick: (option: string) => void;
}
declare function Dropdown(props: DropdownProps): JSX.Element;
export default Dropdown;
