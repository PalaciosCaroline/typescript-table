import React from 'react';
import { Table } from './lib/components/Table';
import { datasExample, columnsExample } from './dataForExample';
import {ExportDataComponent} from 'typescript-exportdata';

function App() {
  document.title = 'typescript-table';

  return (
    <div className="App">
      <Table
        data={datasExample}
        columns={columnsExample}
        renderExportDataComponent={(filteredData, columnsManaged) => (
          <ExportDataComponent
            filteredData={filteredData}
            columnsManaged={columnsManaged}
            headerProperty='label'
            csvExport={true}
            excelExport={true}
            pdfExport={true}
          />
        )}
      />
    </div>
  );
}

export default App;
