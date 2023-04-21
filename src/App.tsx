import React from 'react';
import Table from './lib/components/Table';
import { datasExample, columnsExample } from './dataForExample';

function App() {
  return (
    <div className="App">
      <Table data={datasExample} columns={columnsExample} />
    </div>
  );
}

export default App;
