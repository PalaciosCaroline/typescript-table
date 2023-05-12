/// <reference types="react" />
interface Column {
    label: string;
    property: string;
    isVisible: boolean;
}
interface ManageColumnsProps {
    columns: Column[];
    handleColumnVisibility: (property: string) => void;
    handleVisibleAllColumns: () => void;
    handleVisibleSelectRowsColumn: () => void;
    selectRowColumnVisible: boolean;
}
declare function ManageColumns(props: ManageColumnsProps): JSX.Element;
export default ManageColumns;
