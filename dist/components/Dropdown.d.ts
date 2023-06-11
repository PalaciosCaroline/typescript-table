import React from 'react';
interface DropdownProps {
    defaultValueSelectedOption?: string | undefined;
    options: string[];
    onOptionClick: (option: string) => void;
    className: string;
    classNameProps: string;
    style: React.CSSProperties;
    dataTestId: string;
}
declare function Dropdown(props: DropdownProps): JSX.Element;
export default Dropdown;
