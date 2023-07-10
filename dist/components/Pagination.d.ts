/// <reference types="react" />
/**
 * Props: The properties passed to the Pagination component.
 *
 * @param {number} page - The current page number.
 * @param {number} totalPages - The total number of pages.
 * @param {(page: number) => void} handlePageChange - A function that is called when the page number changes.
 */
export interface PropsPagination {
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
declare function Pagination(props: PropsPagination): JSX.Element;
export default Pagination;
