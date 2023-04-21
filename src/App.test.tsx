import React from 'react';
import { render } from '@testing-library/react';
import Table from './lib/components/Table';
import TableHeader from './lib/components/TableHeader';
import TableBody from './lib/components/TableBody';
import {datasExample, columnsExample} from './dataForExample';

describe('App', () => {
  it('renders a table with the correct data and columns', () => {
    const { getByRole } = render(<Table data={datasExample} columns={columnsExample} />);
    const table = getByRole('table');
    expect(table).toBeInTheDocument();

    const headers = table.querySelectorAll('th');
    expect(headers).toHaveLength(columnsExample.length);
    headers.forEach((header, index) => {
      expect(header).toHaveTextContent(columnsExample[index].label);
    });

    const rows = table.querySelectorAll('tbody > tr');
    expect(rows).toHaveLength(10);

    rows.forEach((row, rowIndex) => {
      const cells = row.querySelectorAll('td');
      expect(cells).toHaveLength(columnsExample.length);
      cells.forEach((cell, cellIndex) => {
        expect(cell).toHaveTextContent(datasExample[rowIndex][columnsExample[cellIndex].property]);
      });
    });
  });

  it('renders the firstName property of the first dataExample object', () => {
    const { getByRole } = render(
      <Table data={datasExample} columns={columnsExample} />
    );
    const firstNameCell = getByRole('cell', { name: datasExample[0].firstName });
    expect(firstNameCell).toBeInTheDocument();
  });

  it('displays the correct data', () => {
    const { getByRole } = render(<Table data={datasExample} columns={columnsExample} />);
    const table = getByRole('table');
    const rows = table.querySelectorAll('tbody > tr');
    const cells = rows[0].querySelectorAll('td');
    expect(cells).toHaveLength(columnsExample.length); 
    expect(cells[0]).toHaveTextContent('John');
    expect(cells[1]).toHaveTextContent('Doe'); 
    expect(cells[2]).toHaveTextContent('01/04/2022'); 
  });
});

describe('TableHeader component', () => {
  test('should hide columns with isVisible=false', () => {
    const columnsManaged = [
      { label: 'First Name', property: 'firstName', isVisible: true },
      { label: 'Last Name', property: 'lastName', isVisible: true },
      { label: 'Start Date', property: 'startDate', isVisible: false },
    ];
    
    const handleSort = jest.fn();
    const handleReset = jest.fn();
    const handleSearchByProperty = jest.fn();
    const inputValues = {};
    const sortOrder = 'noSort';
    const sortKey = '';

    const { getByRole, queryByRole } = render(
      <TableHeader
        columnData={columnsManaged}
        inputValues={inputValues}
        handleSearchByProperty={handleSearchByProperty}
        handleSort={handleSort}
        sortOrder={sortOrder}
        handleReset={handleReset}
        sortKey={sortKey}
      />
    );

    expect(getByRole('columnheader', { name: 'First Name' })).toBeInTheDocument();
    expect(getByRole('columnheader', { name: 'Last Name' })).toBeInTheDocument();
    expect(queryByRole('columnheader', { name: 'Start Date' })).not.toBeInTheDocument();
  });
});

describe('TableBody', () => {

  it('should display the correct number of rows per page', () => {
    const columnsExample = [
        { label: 'First Name', property: 'firstName', isVisible: true },
        { label: 'Last Name', property: 'lastName', isVisible: true },
        { label: 'Start Date', property: 'startDate', isVisible: false },
      ];
    const perPage = 3;
    const { getAllByRole } = render(
        <TableBody page={1} perPage={perPage} filteredData={datasExample} columns={columnsExample} />
    );

    const rows = getAllByRole('row');
    expect(rows).toHaveLength(3); 
  });
});
