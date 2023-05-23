interface Props {
    page: number;
    totalPages: number;
    handlePageChange: (page: number) => void;
}
/**
 * Component for rendering pagination controls.
 *
 * @component
 * @param {Props} props - The props for the Pagination component.
 * @returns {JSX.Element} The rendered Pagination component.
 */
declare function Pagination(props: Props): import("react/jsx-runtime").JSX.Element;
export default Pagination;
