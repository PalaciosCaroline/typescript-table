import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import Table from './lib/components/Table';
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

const columns = [
  { label: 'Name', property: 'name' },
  { label: 'Age', property: 'age' },
];

describe('Table', () => {
  test('hides column when isVisible is set to false', async () => {
    render(<Table  data={datasExample} columns={columns} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Manage Columns'));

    const listItem = screen.getByTestId('inputManaged-age');

    fireEvent.click(listItem);
    fireEvent.click(screen.getByText('Manage Columns'));
    
    const columnVisible = screen.getByTestId('columnManaged-name');
    expect(columnVisible).toBeInTheDocument();
    expect(screen.queryByText('Age')).not.toBeInTheDocument();
  });
});


describe('Table', () => {
  test("change perPage value and check if the number of displayed rows changes", () => {
    render(<Table data={datasExample} columns={columnsExample} />);
    let displayedRows = screen.getAllByRole('row');
    expect(displayedRows.length).toBe(11); 
    // Ouvrir le menu déroulant
    const btnPerPage = screen.getByTestId('btnPerPage');
    fireEvent.click(btnPerPage);

    const optionElement = screen.getByTestId(`optionPerPage-5`);
    fireEvent.click(optionElement);

    // Vérifier si le nombre de lignes affichées a changé en conséquence
    displayedRows = screen.getAllByRole('row');
    expect(displayedRows.length).toBe(6); // Ajouter 1 pour inclure la ligne d'en-tête
  });
});
