import React from "react";
import { FiChevronsLeft, FiChevronsRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface Props {
  page: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

function Pagination(props: Props) {
  const { page, totalPages, handlePageChange } = props;

  return (
    <div className="pagination">
      <div className="replacementBtnPage">
        {page > 1 ? (
          <>
            <button
              className="paginationButton"
              style={{ border: 'none', fontSize: '1.2rem' }}
              onClick={() => handlePageChange(1)}
            >
              <FiChevronsLeft />
            </button>
            <button
              className="paginationButton"
              style={{ border: 'none', fontSize: '1.2rem' }}
              onClick={() => handlePageChange(page - 1)}
            >
              <FiChevronLeft />
            </button>
          </>
        ) : ''}
      </div>
      <span className="paginationText">
        Page {page} of {totalPages}
      </span>
      <div className="replacementBtnPage">
        {page < totalPages ? (
          <>
            <button
              className="paginationButton"
              style={{ border: 'none', fontSize: '1.2rem' }}
              onClick={() => handlePageChange(page + 1)}
            >
              <FiChevronRight />
            </button>
            <button
              className="paginationButton"
              style={{ border: 'none', fontSize: '1.2rem' }}
              onClick={() => handlePageChange(totalPages)}
            >
              <FiChevronsRight />
            </button>
          </>
        ) : ''} </div>
    </div>
  );
}

export default Pagination;