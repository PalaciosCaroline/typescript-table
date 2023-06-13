import React from 'react';
import {
  FiChevronsLeft,
  FiChevronsRight,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';

/**
 * Props: The properties passed to the Pagination component.
 * 
 * @param {number} page - The current page number.
 * @param {number} totalPages - The total number of pages.
 * @param {(page: number) => void} handlePageChange - A function that is called when the page number changes.
 */
interface Props {
  page: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

/**
 * Pagination: A component for rendering pagination controls.
 *
 * @component
 * @param {Props} props - The properties passed to the Pagination component.
 * @returns {JSX.Element} - Returns a JSX element representing the rendered Pagination.
 */
function Pagination(props: Props) {
  const { page, totalPages, handlePageChange } = props;

  return (
    <div className="pagination">
      <div className="replacementBtnPage">
        {page > 1 ? (
          <>
            {/* Button to go to the first page */}
            <button
              className="paginationButton"
              style={{ border: 'none', fontSize: '1.2rem' }}
              onClick={() => handlePageChange(1)}
              aria-label="return to first page"
              data-testid="btnFirstPage"
            >
              <FiChevronsLeft />
            </button>
            {/* Button to go to the previous page */}
            <button
              className="paginationButton"
              style={{ border: 'none', fontSize: '1.2rem' }}
              onClick={() => handlePageChange(page - 1)}
              aria-label="go to the previous page"
              data-testid="btnPreviousPage"
            >
              <FiChevronLeft />
            </button>
          </>
        ) : (
          ''
        )}
      </div>
      {/* Text displaying the current page and total number of pages */}
      <span className="paginationText">
        Page {page} of {totalPages}
      </span>
      <div className="replacementBtnPage">
        {page < totalPages ? (
          <>
            {/* Button to go to the next page */}
            <button
              className="paginationButton"
              style={{ border: 'none', fontSize: '1.2rem' }}
              onClick={() => handlePageChange(page + 1)}
              aria-label="go to the next page"
              data-testid="btnNextPage"
            >
              <FiChevronRight />
            </button>
            {/* Button to go to the last page */}
            <button
              className="paginationButton"
              style={{ border: 'none', fontSize: '1.2rem' }}
              onClick={() => handlePageChange(totalPages)}
              aria-label="go to the last page"
              data-testid="btnLastPage"
            >
              <FiChevronsRight />
            </button>
          </>
        ) : (
          ''
        )}{' '}
      </div>
    </div>
  );
}

export default Pagination;
