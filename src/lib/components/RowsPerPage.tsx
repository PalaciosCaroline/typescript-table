import React, { ReactElement } from 'react';
import Dropdown from './Dropdown';

interface RowsPerPageProps {
  handlePerPageChange: (option: string) => void;
}

const RowsPerPage: React.FC<RowsPerPageProps> = ({
  handlePerPageChange,
}): ReactElement => {
  return (
    <div className="box_ChoiceEntries" id="box_ChoiceEntries">
      <span className="box_ChoiceEntriesText">Rows per page:</span>
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
