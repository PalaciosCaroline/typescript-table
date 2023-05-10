import React from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchAndResetGlobalProps {
  searchTerm: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleResetSearch: () => void;
}

export const SearchAndResetGlobal: React.FC<SearchAndResetGlobalProps> = ({
  searchTerm,
  handleSearch,
  handleResetSearch,
}) => {
  return (
    <div className="box_searchReset">
      <div className="box_searchGlobal">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search..."
          id="searchGlobal"
        />
        <label htmlFor="searchGlobal">
          <FaSearch />
        </label>
      </div>
      <button
        onClick={handleResetSearch}
        style={{ marginRight: '20px' }}
        className="btn_Reset"
      >
        <p className="btnResetAllTexte">Reset all search</p>
      </button>
    </div>
  );
};
