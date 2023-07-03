import React from 'react';
import { Table } from './lib/components/Table';
import { datasExample, columnsExample } from './dataForExample';
// import {ExportDataComponent} from 'typescript-exportdata';

function App() {
  document.title = 'typescript-table';

  const handleEditRow = (id:number | string, e?:Event) => {
    console.log(id);
    if (e) {
      console.log("Click event:", e);
    }
  };
  
  const handleArchiveRow = (id: number | string, e?:Event) => {
    console.log('archive: ' + id);
    if (e) {
      console.log("Click event:", e);
    }
  };

  const handleDeleteRow = (id:number | string, e?:Event) => {
    console.log('delete: ' + id);
    if (e) {
      console.log("Click event:", e);
    }
  };

  return (
    <div className="App">
      <Table
        data={datasExample}
        columns={columnsExample}
        editRowColumnVisible
        handleEditRow={handleEditRow}
        archiveRowColumnVisible
        handleArchiveRow={handleArchiveRow}
        deleteRowColumnVisible
        handleDeleteRow={handleDeleteRow}
        // renderExportDataComponent={(filteredData, columnsManaged) => (
        //   <ExportDataComponent
        //     filteredData={filteredData}
        //     columnsManaged={columnsManaged}
        //     headerProperty='label'
        //     csvExport={true}
        //     excelExport={true}
        //     pdfExport={true}
        //   />
        // )}
      />
    </div>
  );
}

export default App;
