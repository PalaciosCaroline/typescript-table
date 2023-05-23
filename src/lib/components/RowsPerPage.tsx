import React, { ReactElement } from 'react';
import Dropdown from './Dropdown';

interface RowsPerPageProps {
  handlePerPageChange: (option: string) => void;
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
}): ReactElement => {
  return (
    <div className="box_ChoiceEntries" id="box_ChoiceEntries">
       {/* Text displaying "Rows per page" */}
      <span className="box_ChoiceEntriesText">Rows per page:</span>
       {/* Dropdown component for selecting the number of rows per page */}
      <Dropdown
        options={['All', '5', '10', '25', '50', '100']}
        onOptionClick={(option) => handlePerPageChange(option)}
        className="selectNumberOfEntriesPerPage"
        defaultValueSelectedOption="10"
        classNameProps="RowPerPage"
      />
    </div>
  );
};

export default RowsPerPage;
