/// <reference types="react" />
import { ColumnManaged } from './Table';
interface ManageColumnsProps {
    columns: ColumnManaged[];
    handleColumnVisibility: (property: string) => void;
    handleVisibleAllColumns: () => void;
    handleVisibleSelectRowsColumn: () => void;
    selectRowColumnVisible: boolean;
}
declare function ManageColumns(props: ManageColumnsProps): JSX.Element;
export default ManageColumns;
