/// <reference types="react" />
import { ColumnManaged } from './Table';
interface ManageColumnsProps {
    columns: ColumnManaged[];
    handleColumnVisibility: (property: string) => void;
    handleVisibleAllColumns: () => void;
    handleVisibleSelectRowsColumn: () => void;
    selectRowColumnVisible: boolean;
}
/**
 * Component for managing columns.
 *
 * @component
 * @param {ManageColumnsProps} props - The props for the ManageColumns component.
 * @returns {JSX.Element} The rendered ManageColumns component.
 */
declare function ManageColumns(props: ManageColumnsProps): JSX.Element;
export default ManageColumns;
