import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import Table from './lib/components/Table';
import {datasExample, columnsExample} from './dataForExample';
import { compareArrays, parseDate, sortDates, customSort } from '../src/lib/utils/sortDates';

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

  test('sorts the table by the ascendant firstName column', () => {
    render(<Table data={datasExample} columns={columnsExample} />);
    
    const firstNameHeader = screen.getByTestId('btnSortByAsc-firstName');
    fireEvent.click(firstNameHeader);
  
    const sortedData = datasExample.slice().sort((a, b) => a.firstName.localeCompare(b.firstName));
    const table = screen.getByRole('table');
    const rows = table.querySelectorAll('tbody > tr');
    rows.forEach((row, rowIndex) => {
      const cells = row.querySelectorAll('td');
      expect(cells[0]).toHaveTextContent(sortedData[rowIndex].firstName.toString());
    });
  });

  test('sorts the table by descendant the firstName column', () => {
    render(<Table data={datasExample} columns={columnsExample} />);

    const firstNameAscHeader = screen.getByTestId('btnSortByAsc-firstName');
    fireEvent.click(firstNameAscHeader);
    const firstNameDescHeader = screen.getByTestId('btnSortbyDesc-firstName');
    fireEvent.click(firstNameDescHeader);
  
    const sortedData = datasExample.slice().sort((a, b) => b.firstName.localeCompare(a.firstName));
    const table = screen.getByRole('table');
    const rows = table.querySelectorAll('tbody > tr');
    rows.forEach((row, rowIndex) => {
      const cells = row.querySelectorAll('td');
    
      expect(cells[0]).toHaveTextContent(sortedData[rowIndex].firstName.toString());
    });
  });

  test('sorts the table by the dateOfBirth column', () => {
    render(<Table data={datasExample} columns={columnsExample} />);
    
    const dateOfBirthHeader = screen.getByTestId('btnSortByAsc-dateOfBirth');
    fireEvent.click(dateOfBirthHeader);
  
    const sortedData = datasExample.slice().sort((a, b) => {
      const datePartsA = a.dateOfBirth.split('/').map(Number);
      const datePartsB = b.dateOfBirth.split('/').map(Number);
      const dateA = new Date(datePartsA[2], datePartsA[1] - 1, datePartsA[0]);
      const dateB = new Date(datePartsB[2], datePartsB[1] - 1, datePartsB[0]);
      return dateA.valueOf() - dateB.valueOf();
    });
  
    const table = screen.getByRole('table');
    const rows = table.querySelectorAll('tbody > tr');
    rows.forEach((row, rowIndex) => {
      const cells = row.querySelectorAll('td');
      expect(cells[4]).toHaveTextContent(sortedData[rowIndex].dateOfBirth.toString());
    });
  });

  test('sorts the table by the dateOfBirth with YYYY/MM/DD column', () => {
   
    // Provide example data and columns for testing
    const datasForJest = [
      { name: 'Alice', dateOfBirth : '1977/05/31' },
      { name: 'Bob', dateOfBirth: '1980/01/30' },
      { name: 'Charlie', dateOfBirth: '2000/09/12' },
    ];
    const columnsForJest = [
      { label: 'Name', property: 'name' },
      { label: 'Date Of Birth', property: 'dateOfBirth' },
    ];
    render(<Table data={datasForJest} columns={columnsForJest} />);
    
    const dateOfBirthHeader = screen.getByTestId('btnSortByAsc-dateOfBirth');
    fireEvent.click(dateOfBirthHeader);
  
    const sortedData = datasForJest.slice().sort((a, b) => {
      const dateA = new Date(a.dateOfBirth).toLocaleDateString('en-CA');
      const dateB = new Date(b.dateOfBirth).toLocaleDateString('en-CA');
      return dateA.localeCompare(dateB);
    });
  
    const table = screen.getByRole('table');
    const rows = table.querySelectorAll('tbody > tr');
    rows.forEach((row, rowIndex) => {
      const cells = row.querySelectorAll('td');
      expect(cells[1]).toHaveTextContent(sortedData[rowIndex].dateOfBirth.toString());
    });
  });

  test('Search by property functionality works correctly', () => {
    // Provide example data and columns for testing
    const datasExample = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
      { name: 'Charlie', age: 35 },
    ];
    const columnsExample = [
      { label: 'Name', property: 'name' },
      { label: 'Age', property: 'age' },
    ];

    // Render the Table component with example data and columns
    render(<Table data={datasExample} columns={columnsExample} />);

    // Trigger the onChange event on the general search input with a search term
    const searchByAge = screen.getByTestId('btnOpenSearch-age');
    fireEvent.click(searchByAge);
    fireEvent.change(screen.getByTestId('btnSearch-age'), { target: { value: '25' } });

    // Check that expected elements are present and unexpected elements are absent
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    expect(screen.queryByText('30')).not.toBeInTheDocument();
    expect(screen.queryByText('Charlie')).not.toBeInTheDocument();
    expect(screen.queryByText('35')).not.toBeInTheDocument();

    const resetButton = screen.getByTestId('btnResetClose-age');
    fireEvent.click(resetButton);

    expect(screen.queryByText('Charlie')).toBeInTheDocument();
  });

  test('general search functionality works correctly', () => {
    // Provide example data and columns for testing
    const datasExample = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
      { name: 'Charlie', age: 35 },
    ];
    const columnsExample = [
      { label: 'Name', property: 'name' },
      { label: 'Age', property: 'age' },
    ];

    // Render the Table component with example data and columns
    render(<Table data={datasExample} columns={columnsExample} />);

    // Trigger the onChange event on the general search input with a search term
    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'Alice' } });

    // Check that expected elements are present and unexpected elements are absent
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.queryByText('Bob')).not.toBeInTheDocument();
    expect(screen.queryByText('25')).not.toBeInTheDocument();
    expect(screen.queryByText('Charlie')).not.toBeInTheDocument();
    expect(screen.queryByText('35')).not.toBeInTheDocument();
  });
});

describe('sortDates', () => {
  const data = [
    { id: 1, date: '25/04/2023' },
    { id: 2, date: '30/04/2023' },
    { id: 3, date: '15/04/2023' },
  ];

  test('sorts the data array by date in ascending order', () => {
    const sortedData = data.sort((a, b) => sortDates(a, b, 'date', 'asc'));
    expect(sortedData).toEqual([
      { id: 3, date: '15/04/2023' },
      { id: 1, date: '25/04/2023' },
      { id: 2, date: '30/04/2023' },
    ]);
  });

  test('sorts the data array by date in descending order', () => {
    const sortedData = data.sort((a, b) => sortDates(a, b, 'date', 'desc'));
    expect(sortedData).toEqual([
      { id: 2, date: '30/04/2023' },
      { id: 1, date: '25/04/2023' },
      { id: 3, date: '15/04/2023' },
    ]);
  });

  test('returns 0 when dates are equal', () => {
    const equalData = [
      { id: 1, date: '25/04/2023' },
      { id: 2, date: '25/04/2023' },
    ];

    const sortedData = equalData.sort((a, b) => sortDates(a, b, 'date', 'asc'));
    expect(sortedData).toEqual([
      { id: 1, date: '25/04/2023' },
      { id: 2, date: '25/04/2023' },
    ]);
  });

  test('sorts non-date strings in ascending order', () => {
    const nonDateData = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ];

    const sortedData = nonDateData.sort((a, b) => sortDates(a, b, 'name', 'asc'));
    expect(sortedData).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ]);
  });

  test('sorts non-date strings in descending order', () => {
    const nonDateData = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ];

    const sortedData = nonDateData.sort((a, b) => sortDates(a, b, 'name', 'desc'));
    expect(sortedData).toEqual([
      { id: 3, name: 'Charlie' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'Alice' },
    ]);
  });
});

describe('customSort', () => {
  test('sorts numbers in ascending order', () => {
    const numberData = [
      { id: 1, value: 50 },
      { id: 2, value: 30 },
      { id: 3, value: 10 },
    ];

    const sortedData = customSort(numberData, 'value', 'asc');
    expect(sortedData).toEqual([
      { id: 3, value: 10 },
      { id: 2, value: 30 },
      { id: 1, value: 50 },
    ]);
  });

  test('sorts booleans in ascending order', () => {
    const booleanData = [
      { id: 1, value: true },
      { id: 2, value: false },
      { id: 3, value: true },
    ];
  
    // Tri en ordre décroissant pour s'assurer que les données sont mélangées
    const descSortedData = customSort(booleanData, 'value', 'desc');
    expect(descSortedData).toEqual([
      { id: 1, value: true },
      { id: 3, value: true },
      { id: 2, value: false },
    ]);

    const ascSortedData = customSort(descSortedData, 'value', 'asc');
    expect(ascSortedData).toEqual([
      { id: 2, value: false },
      { id: 1, value: true },
      { id: 3, value: true },
    ]);
  });

  test('sorts objects in ascending order', () => {
    const objectData = [
      { id: 1, value: { key: 'C' } },
      { id: 2, value: { key: 'A' } },
      { id: 3, value: { key: 'B' } },
    ];

    const sortedData = customSort(objectData, 'value', 'asc');
    expect(sortedData).toEqual([
      { id: 2, value: { key: 'A' } },
      { id: 3, value: { key: 'B' } },
      { id: 1, value: { key: 'C' } },
    ]);
  });

  test('sorts arrays in ascending order', () => {
    const arrayData = [
      { id: 1, value: ['C'] },
      { id: 2, value: ['A'] },
      { id: 3, value: ['B'] },
    ];

    const sortedData = customSort(arrayData, 'value', 'asc');
    expect(sortedData).toEqual([
      { id: 2, value: ['A'] },
      { id: 3, value: ['B'] },
      { id: 1, value: ['C'] },
    ]);
  });
});



describe('test function parseDate', () => {
  test('should correctly parse date in format dd/mm/yyyy', () => {
    const dateStr = '25/04/2023';
    const expectedResult = new Date(2023, 3, 25);
    expect(parseDate(dateStr)).toEqual(expectedResult);
  });

  test('should correctly parse date in format yyyy-mm-dd', () => {
    const dateStr = '2023-04-25';
    const expectedResult = new Date(2023, 3, 25);
    expect(parseDate(dateStr)).toEqual(expectedResult);
  });

  test('should return null for invalid date string', () => {
    const dateStr = 'invalid_date';
    expect(parseDate(dateStr)).toBeNull();
  });
});

describe('test function sortDates', () => {
  test('should correctly sort dates in ascending order', () => {
    const a = { date: '25/04/2023' };
    const b = { date: '26/04/2023' };
    const sortKey = 'date';
    const sortOrder = 'asc';
    expect(sortDates(a, b, sortKey, sortOrder)).toBe(-1);
  });

  test('should correctly sort dates in descending order', () => {
    const a = { date: '25/04/2023' };
    const b = { date: '26/04/2023' };
    const sortKey = 'date';
    const sortOrder = 'desc';
    expect(sortDates(a, b, sortKey, sortOrder)).toBe(1);
  });
});

describe('test function customSort', () => {
  const data = [
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 25 },
    { id: 3, name: 'Charlie', age: 35 },
  ];

  test('should correctly sort by name in ascending order', () => {
    const sortKey = 'name';
    const sortOrder = 'asc';
    const sortedData = customSort(data, sortKey, sortOrder);
    const expectedResult = [
      { id: 1, name: 'Alice', age: 30 },
      { id: 2, name: 'Bob', age: 25 },
      { id: 3, name: 'Charlie', age: 35 },
    ];
    expect(sortedData).toEqual(expectedResult);
  });

  test('should correctly sort by age in descending order', () => {
    const sortKey = 'age';
    const sortOrder = 'desc';
    const sortedData = customSort(data, sortKey, sortOrder);
    const expectedResult = [
      { id: 3, name: 'Charlie', age: 35 },
      { id: 1, name: 'Alice', age: 30 },
      { id: 2, name: 'Bob', age: 25 },
    ];
    expect(sortedData).toEqual(expectedResult);
  });

  test('should return original data when sortOrder is noSort', () => {
    const sortKey = 'name';
    const sortOrder = 'noSort';
    const sortedData = customSort(data, sortKey, sortOrder);
    expect(sortedData).toEqual(data);
  });
});

describe('sortDates', () => {
  test('should correctly sort non-date values in ascending order', () => {
    const a = { value: 'apple' };
    const b = { value: 'banana' };
    const sortKey = 'value';
    const sortOrder = 'asc';
    expect(sortDates(a, b, sortKey, sortOrder)).toBe(-1);
  });

  test('should correctly sort non-date values in descending order', () => {
    const a = { value: 'apple' };
    const b = { value: 'banana' };
    const sortKey = 'value';
    const sortOrder = 'desc';
    expect(sortDates(a, b, sortKey, sortOrder)).toBe(1);
  });

  test('should return 0 when non-date values are equal', () => {
    const a = { value: 'apple' };
    const b = { value: 'apple' };
    const sortKey = 'value';
    const sortOrder = 'asc';
    expect(sortDates(a, b, sortKey, sortOrder)).toBe(0);
  });
});

describe('compareArrays', () => {
  test('should return 0 when both arrays are empty', () => {
    const arrayA = [];
    const arrayB = [];
    const sortOrder = 'asc';
    expect(compareArrays(arrayA, arrayB, sortOrder)).toBe(0);
  });

  test('should return -1 when arrayA is empty and sortOrder is asc', () => {
    const arrayA = [];
    const arrayB = ['banana'];
    const sortOrder = 'asc';
    expect(compareArrays(arrayA, arrayB, sortOrder)).toBe(-1);
  });

  test('should return 1 when arrayB is empty and sortOrder is asc', () => {
    const arrayA = ['apple'];
    const arrayB = [];
    const sortOrder = 'asc';
    expect(compareArrays(arrayA, arrayB, sortOrder)).toBe(1);
  });

  test('should correctly compare non-empty arrays in ascending order', () => {
    const arrayA = ['apple'];
    const arrayB = ['banana'];
    const sortOrder = 'asc';
    expect(compareArrays(arrayA, arrayB, sortOrder)).toBe(-1);
  });

  test('should correctly compare non-empty arrays in descending order', () => {
    const arrayA = ['apple'];
    const arrayB = ['banana'];
    const sortOrder = 'desc';
    expect(compareArrays(arrayA, arrayB, sortOrder)).toBe(1);
  });
});

