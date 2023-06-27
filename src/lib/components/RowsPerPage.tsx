import React, { ReactElement } from 'react';
import Dropdown from './Dropdown';

/**
 * RowsPerPageProps: The properties passed to the RowsPerPage component.
 *
 * @param {(option: string) => void} handlePerPageChange - A function that is called when the selected page size changes.
 * @param {React.CSSProperties} style - The CSS styles to be applied to the component.
 */
interface RowsPerPageProps {
  handlePerPageChange: (option: string) => void;
  style: React.CSSProperties;
}

/**
 * RowsPerPage: A component for selecting the number of rows to display per page.
 *
 * @component
 * @param {RowsPerPageProps} props - The properties passed to the RowsPerPage component.
 * @returns {React.ReactElement} - Returns a JSX element representing the rendered RowsPerPage component.
 */
const RowsPerPage: React.FC<RowsPerPageProps> = ({
  handlePerPageChange,
  style,
}: RowsPerPageProps): ReactElement => {
  return (
    <div
      className="box_ChoiceEntries customComponent noHoverEffect"
      id="box_ChoiceEntries"
      style={style}
    >
      {/* Text displaying "Rows per page" */}
      <span className="box_ChoiceEntriesText">Rows per page:</span>
      {/* Dropdown component for selecting the number of rows per page */}
      <Dropdown
        options={['All', '5', '10', '25', '50', '100']}
        onOptionClick={(option) => handlePerPageChange(option)}
        className="selectNumberOfEntriesPerPage"
        defaultValueSelectedOption="10"
        classNameProps="RowPerPage"
        style={style}
        dataTestId="RowPerPage"
      />
    </div>
  );
};

export default RowsPerPage;
