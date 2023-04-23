/// <reference types="react" />
interface Props {
    page: number;
    totalPages: number;
    handlePageChange: (page: number) => void;
}
declare function Pagination(props: Props): JSX.Element;
export default Pagination;
