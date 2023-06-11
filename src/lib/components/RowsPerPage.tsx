import React, { ReactElement } from 'react';
import Dropdown from './Dropdown';

interface RowsPerPageProps {
  handlePerPageChange: (option: string) => void;
  style: React.CSSProperties;
}

/**
 * Component for selecting the number of rows per page.
 *
 * @component
 * @param {RowsPerPageProps} props - The props for the RowsPerPage component.
 * @returns {React.ReactElement} The rendered RowsPerPage component.
 */
const RowsPerPage: React.FC<RowsPerPageProps> = ({
  handlePerPageChange,
  style,
}): ReactElement => {
  return (
    <div className="box_ChoiceEntries customComponent" id="box_ChoiceEntries" style={style}>
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
        dataTestId='RowPerPage'
      />
    </div>
  );
};

export default RowsPerPage;
