import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import Table from './lib/components/Table';
import { Table as ExportedTable } from './lib/index';
import {datasExample, columnsExample} from './dataForExample';
import { compareArrays, customSort,SortableObject } from '../src/lib/utils/sortDatas';
import ManageColumns from './lib/components/ManageColumns';
import Modal from './lib/components/Modal';
import Pagination from './lib/components/Pagination';
import userEvent from '@testing-library/user-event';

describe('Library index', () => {
  it('should correctly import and export Table component', () => {
    expect(ExportedTable).toBe(Table);
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

    fireEvent.click(screen.getByTestId('manageTable'));
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
    fireEvent.click(screen.getByTestId('manageTable'));
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

  

  // test('sorts the table by descendant the firstName column', () => {
  //   render(<Table data={datasExample} columns={columnsExample} />);
  //   console.log(document.body.innerHTML);
  //   const firstNameAscHeader = screen.getByTestId('btnSortByAsc-firstName');
  //   fireEvent.click(firstNameAscHeader);
  //   const firstNameDescHeader = screen.getByTestId('btnSortByDesc-firstName'); // Change 'btnSortbyDesc' to 'btnSortByDesc'
  //   fireEvent.click(firstNameDescHeader);
  
  //   const sortedData = datasExample.slice().sort((a, b) => b.firstName?.localeCompare(a.firstName) ?? 0);
  //   const table = screen.getByRole('table');
  //   const rows = table.querySelectorAll('tbody > tr');
  //   rows.forEach((row, rowIndex) => {
  //     const cells = row.querySelectorAll('td');
    
  //     expect(cells[0]).toHaveTextContent(sortedData[rowIndex].firstName.toString());
  //   });
  // });

  // test('sorts the table by the dateOfBirth column', () => {
  //   render(<Table data={datasExample} columns={columnsExample} />);
    
  //   const dateOfBirthHeader = screen.getByTestId('btnSort-dateOfBirth');
  //   fireEvent.click(dateOfBirthHeader);
  
  //   const sortedData = datasExample.slice().sort((a, b) => {
  //     const datePartsA = a.dateOfBirth?.split('/').map(Number);
  //     const datePartsB = b.dateOfBirth?.split('/').map(Number);
  //     const dateA = new Date(datePartsA[2], datePartsA[1] - 1, datePartsA[0]);
  //     const dateB = new Date(datePartsB[2], datePartsB[1] - 1, datePartsB[0]);
  //     return dateA.valueOf() - dateB.valueOf();
  //   });
  
  //   const table = screen.getByRole('table');
  //   const rows = table.querySelectorAll('tbody > tr');
  //   rows.forEach((row, rowIndex) => {
  //     const cells = row.querySelectorAll('td');
  //     expect(cells[4]).toHaveTextContent(sortedData[rowIndex].dateOfBirth.toString());
  //   });
  // });

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

describe('customSort', () => {
  test('sorts numbers in ascending order', () => {
    const numberData = [
      { id: 1, value: 50 },
      { id: 2, value: 30 },
      { id: 3, value: 10 },
    ];

    const sortedData = customSort(numberData, 'value', 'asc', 'none');
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
    const descSortedData = customSort(booleanData, 'value', 'desc', false);
    expect(descSortedData).toEqual([
      { id: 1, value: true },
      { id: 3, value: true },
      { id: 2, value: false },
    ]);

    const ascSortedData = customSort(descSortedData, 'value', 'asc', false);
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

    const sortedData = customSort(objectData, 'value', 'asc', false);
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

    const sortedData = customSort(arrayData, 'value', 'asc',false);
    expect(sortedData).toEqual([
      { id: 2, value: ['A'] },
      { id: 3, value: ['B'] },
      { id: 1, value: ['C'] },
    ]);
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
    const dateFormatForSort = 'none';
    const sortedData = customSort(data, sortKey, sortOrder, dateFormatForSort);
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
    const dateFormatForSort = 'none';
    const sortedData = customSort(data, sortKey, sortOrder, dateFormatForSort);
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
    const dateFormatForSort = 'none';
    const sortedData = customSort(data, sortKey, sortOrder,dateFormatForSort);
    expect(sortedData).toEqual(data);
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

describe('Modal', () => {
  test('renders modal when isOpen is true', () => {
    render(<Modal isOpen={true} onClose={() => {}}><div>Modal content</div></Modal>);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('does not render modal when isOpen is false', () => {
    render(<Modal isOpen={false} onClose={() => {}}><div>Modal content</div></Modal>);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('closes the modal when the close button is clicked', () => {
    const handleClose = jest.fn();
    render(<Modal isOpen={true} onClose={handleClose}><div>Modal content</div></Modal>);
    const closeButton = screen.getByRole('button', { name: 'Fermer la fenêtre' });
    userEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('closes the modal when the escape key is pressed', () => {
    const handleClose = jest.fn();
    render(<Modal isOpen={true} onClose={handleClose}><div>Modal content</div></Modal>);


    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('traps focus within the modal', () => {
    const handleClose = jest.fn();
    render(<Modal isOpen={true} onClose={handleClose}><div>Modal content</div></Modal>);
    
    const btnCloseModal = screen.getByTestId('btnCloseModal');


    btnCloseModal.focus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    fireEvent.keyDown(btnCloseModal, { key: 'Tab' });

  
  });
});


describe('customSort', () => {
  const sampleData: SortableObject[] = [
    { id: 1, name: 'Alice', dateOfBirth: '1990/01/01' },
    { id: 2, name: 'Bob', dateOfBirth: '2000/06/15' },
    { id: 3, name: 'Charlie', dateOfBirth: '1985/11/23' },
  ];

  test('should not sort when sortKey is undefined', () => {
    const result = customSort(sampleData, undefined, 'asc', 'none');
    expect(result).toEqual(sampleData);
  });

  test('should not sort when sortOrder is noSort', () => {
    const result = customSort(sampleData, 'id', 'noSort', 'none');
    expect(result).toEqual(sampleData);
  });

  test('should sort strings in ascending order', () => {
    const result = customSort(sampleData, 'name', 'asc', 'none');
    expect(result).toEqual([sampleData[0], sampleData[1], sampleData[2]]);
  });

  test('should sort strings in descending order', () => {
    const result = customSort(sampleData, 'name', 'desc', 'none');
    expect(result).toEqual([sampleData[2], sampleData[1], sampleData[0]]);
  });

  test('should sort dates in ascending order', () => {
    const result = customSort(sampleData, 'dateOfBirth', 'asc', 'YYYY/MM/DD');
    expect(result).toEqual([sampleData[2], sampleData[0], sampleData[1]]);
  });

  test('should sort dates in descending order', () => {
    const result = customSort(sampleData, 'dateOfBirth', 'desc', 'YYYY/MM/DD');
    expect(result).toEqual([sampleData[1], sampleData[0], sampleData[2]]);
  });

  test('should sort numbers in ascending order', () => {
    const result = customSort(sampleData, 'id', 'asc', 'none');
    expect(result).toEqual([sampleData[0], sampleData[1], sampleData[2]]);
  });

  test('should sort numbers in descending order', () => {
    const result = customSort(sampleData, 'id', 'desc', 'none');
    expect(result).toEqual([sampleData[2], sampleData[1], sampleData[0]]);
  });

});

describe('customSort date formats', () => {
  const sampleData: SortableObject[] = [
    { id: 1, name: 'Alice', dateOfBirth: '01/01/1990' },
    { id: 2, name: 'Bob', dateOfBirth: '15/06/1985' },
    { id: 3, name: 'Charlie', dateOfBirth: '23/11/1985' },
  ];

  const sampleDataReverse: SortableObject[] = [
    { id: 1, name: 'Alice', dateOfBirth: '01/01/1990' },
    { id: 2, name: 'Bob', dateOfBirth: '06/25/1985' },
    { id: 3, name: 'Charlie', dateOfBirth: '11/02/1985' },  
  ];

  test('should sort dates in ascending order with format DD/MM/YYYY', () => {

    const result = customSort(sampleData, 'dateOfBirth', 'asc', 'DD/MM/YYYY');
    expect(result).toEqual([sampleData[1], sampleData[2], sampleData[0]]);
  });

  test('should sort dates in descending order with format DD/MM/YYYY', () => {

    const result = customSort(sampleData, 'dateOfBirth', 'desc', 'DD/MM/YYYY');
    expect(result).toEqual([sampleData[0], sampleData[2], sampleData[1]]);
  });

  test('should sort dates in ascending order with format MM/DD/YYYY', () => {
    const result = customSort(sampleDataReverse, 'dateOfBirth', 'asc', 'MM/DD/YYYY');
    expect(result).toEqual([sampleDataReverse[1], sampleDataReverse[2], sampleDataReverse[0]]);
  });

  test('should sort dates in descending order with format MM/DD/YYYY', () => {
    const result = customSort(sampleDataReverse, 'dateOfBirth', 'desc', 'MM/DD/YYYY');
    expect(result).toEqual([sampleDataReverse[0], sampleDataReverse[2], sampleDataReverse[1]]);
  });
});


const mockColumns = [
  { label: 'Name', property: 'name', isVisible: true },
  { label: 'Age', property: 'age', isVisible: true },
  { label: 'City', property: 'city', isVisible: false },
];

const handleColumnVisibility = jest.fn();
const handleVisibleAllColumns = jest.fn();

const defaultProps = {
  columns: mockColumns,
  handleColumnVisibility,
  handleVisibleAllColumns,
};

describe('ManageColumns', () => {
  test('renders ManageColumns component', () => {
    render(<ManageColumns {...defaultProps} />);
    const manageColumnsBtn = screen.getByLabelText('managed columns');
    expect(manageColumnsBtn).toBeInTheDocument();
  });

  test('opens the modal on button click', () => {
    render(<ManageColumns {...defaultProps} />);
    const manageColumnsBtn = screen.getByLabelText('managed columns');
    fireEvent.click(manageColumnsBtn);
    const showModal = screen.getByText('Show All Columns');
    expect(showModal).toBeInTheDocument();
  });

  test('calls handleVisibleAllColumns on "Show All Columns" button click', () => {
    render(<ManageColumns {...defaultProps} />);
    const manageColumnsBtn = screen.getByLabelText('managed columns');
    fireEvent.click(manageColumnsBtn);
    const showAllColumnsBtn = screen.getByTestId('btnVisibleColumn');
    fireEvent.click(showAllColumnsBtn);
    expect(handleVisibleAllColumns).toHaveBeenCalledTimes(1);
  });

  test('toggles column visibility on checkbox change', () => {
    render(<ManageColumns {...defaultProps} />);
    const manageColumnsBtn = screen.getByLabelText('managed columns');
    fireEvent.click(manageColumnsBtn);
    const nameInput = screen.getByTestId('inputManaged-name');
    fireEvent.click(nameInput);
    expect(handleColumnVisibility).toHaveBeenCalledWith('name');
    expect(handleColumnVisibility).toHaveBeenCalledTimes(1);
  });

  test('toggles column visibility on checkbox key down (Enter)', () => {
    render(<ManageColumns {...defaultProps} />);
    const manageColumnsBtn = screen.getByLabelText('managed columns');
    fireEvent.click(manageColumnsBtn);
    const nameInput = screen.getByTestId('inputManaged-name');
    userEvent.type(nameInput, '{enter}');
    expect(handleColumnVisibility).toHaveBeenCalledWith('name');
    expect(handleColumnVisibility).toHaveBeenCalledTimes(2);
  });
});

const handlePageChange = jest.fn();

const defaultPropsPagination = {
  page: 1,
  totalPages: 5,
  handlePageChange,
};

describe("Pagination component", () => {
  test("renders pagination component and checks button clicks", () => {
    const { getByLabelText, rerender } = render(<Pagination {...defaultPropsPagination} />);

    // Check if "go to the next page" button is rendered
    const nextPageBtn = getByLabelText("go to the next page");
    fireEvent.click(nextPageBtn);
    expect(handlePageChange).toHaveBeenCalledWith(defaultPropsPagination.page + 1);

    // Check if "go to the last page" button is rendered
    const lastPageBtn = getByLabelText("go to the last page");
    fireEvent.click(lastPageBtn);
    expect(handlePageChange).toHaveBeenCalledWith(defaultPropsPagination.totalPages);

    // Update props
    const updatedProps = {
      ...defaultPropsPagination,
      page: 5,
    };

    // Re-render the component with updated props
    rerender(<Pagination {...updatedProps} />);

    // Check if "return to first page" button is rendered
    const firstPageBtn = getByLabelText("return to first page");
    fireEvent.click(firstPageBtn);
    expect(handlePageChange).toHaveBeenCalledWith(1);

    // Check if "go to the previous page" button is rendered
    const prevPageBtn = getByLabelText("go to the previous page");
    fireEvent.click(prevPageBtn);
    expect(handlePageChange).toHaveBeenCalledWith(updatedProps.page - 1);
  });
});

