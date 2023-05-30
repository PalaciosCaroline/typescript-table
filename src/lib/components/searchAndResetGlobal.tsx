import React from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchAndResetGlobalProps {
  searchTerm: string;
  style: React.CSSProperties;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleResetSearch: () => void;
}

/**
 * Component for global search and reset all search (global and by property).
 *
 * @component
 * @param {SearchAndResetGlobalProps} props - The props for the SearchAndResetGlobal component.
 * @returns {React.ReactElement} The rendered SearchAndResetGlobal component.
 */
export const SearchAndResetGlobal: React.FC<SearchAndResetGlobalProps> = ({
  searchTerm,
  style,
  handleSearch,
  handleResetSearch,
  
}) => {
  return (
    <div className="box_searchReset">
      <div className="box_searchGlobal">
         {/* Input field for entering search term */}
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
       {/* Button for resetting all searchs terms */}
      <button
        onClick={handleResetSearch}
        // style={{ marginRight: '20px' }}
        className="btn_Reset customComponent"
        style={style}
      >
        <p className="btnResetAllTexte">Reset all search</p>
      </button>
    </div>
  );
};
