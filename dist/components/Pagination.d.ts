interface Props {
    page: number;
    totalPages: number;
    handlePageChange: (page: number) => void;
}
declare function Pagination(props: Props): import("react/jsx-runtime").JSX.Element;
export default Pagination;
