import React, { useState, useEffect } from 'react';
import SearchDropdown from './SearchDropdown';
import { FaSearch } from 'react-icons/fa';
import { customSort } from './../utils/sortDates';
import filterData from '../utils/filterData';
import Pagination from './Pagination';
import './../styles/table.css';
import Dropdown from './Dropdown';
import ManageColumns from './ManageColumns';
import SortButton from './SortButton';

interface Column {
  label: string;
  property: string;
}

export interface InputValues<T> {
  [key: string]: T | undefined;
}

interface SearchByProp {
  [key: string]: string | undefined;
}
interface SearchTerms {
  [key: string]: string;
}

interface DataItem<T> {
  [key: string]: T | undefined;
}
interface Props<T> {
  data: DataItem<T | undefined>[];
  columns: Column[];
}

export default function Table<T>({ data, columns }: Props<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'noSort'>('noSort');
  const [page, setPage] = useState<number>(1);
  const defaultValueSelectedOption = 10;
  const [perPage, setPerPage] = useState<number>(defaultValueSelectedOption);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortedData, setSortedData] = useState<object[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchTerms, setSearchTerms] = useState<SearchTerms>({});
  const initialInputValues: SearchByProp = {};
  columns.forEach(({ property }) => {
    initialInputValues[property] = '';
  });
  const [inputValues, setInputValues] = useState(initialInputValues);

  useEffect(() => {
    setSortedData(customSort(data, sortKey, sortOrder));
  }, [data, sortKey, sortOrder]);

  const handleSort = (property: string) => {
    if (sortKey === property) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : sortOrder === 'desc' ? 'noSort' : 'asc');
    } else {
      setSortKey(property);
      setSortOrder('asc');
    }
  };

  const filteredData = filterData(sortedData, searchTerm, searchTerms);

  useEffect(() => {
    const newTotalPages = filteredData.length > perPage ? Math.ceil(filteredData.length / perPage) : 1;
    setTotalPages(newTotalPages);
    setPage((prevPage) => {
      if (prevPage >= newTotalPages) {
        return newTotalPages;
      }
      return prevPage;
    });
  }, [filteredData, perPage]);

  const handlePerPageChange = (optionValue: string) => {
    if (optionValue === 'All') {
      setPerPage(filteredData.length);
    } else {
      setPerPage(parseInt(optionValue));
    }
  };

  const handlePageChange = (newPage: number): void => {
    setPage(newPage);
  };
  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  const handleSearchByProperty = (property: string, value: string) => {
    setInputValues({
      ...inputValues,
      [property]: value
    });
    setSearchTerms({
      ...searchTerms,
      [property]: value
    });
  };
  
  const handleReset = (property: string): void => {
    setSearchTerms((prevSearchTerms) => ({
      ...prevSearchTerms,
      [property]: '',
    }));
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [property]: '',
    }));
  };
  
  const handleResetSearch = (): void => {
    setSearchTerm('');
    setSearchTerms({});
    setInputValues(initialInputValues);
  };
  
  const handleColumnVisibility = (property: string): void => {
    setColumnsManaged((prevColumns) => {
      const columnToToggle = prevColumns.find((column) => column.property === property);
      if (columnToToggle) {
        return prevColumns.map((column) => {
          if (column.property === property) {
            return { ...column, isVisible: !column.isVisible };
          }
          return column;
        });
      }
      return prevColumns;
    });
  };
  
  const handleVisibleAllColumns = (): void => {
    const updatedColumns = columnsManaged.map(column => {
      return {
        ...column,
        isVisible: true
      };
    });
  
    setColumnsManaged(updatedColumns);
  };
  
  const [columnsManaged, setColumnsManaged] = useState(() => {
    return columns.map(({ label, property }) => ({
      label,
      property,
      isVisible: true,
    }));
  });

  const start = (page - 1) * perPage;
  const end = start + perPage;
  const currentData : DataItem<T>[] = filteredData.slice(start, end) as DataItem<T>[];

  function formatDate(value: any): string | React.ReactNode {
    if (value instanceof Date) {
      return value.toLocaleDateString();
    }
    return value;
  }

    return (
    <div className='box_table'>

      <div className='box_searchReset'>
          <div className='box_searchGlobal'>
              <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search..." id='searchGlobal'/>
              <label htmlFor="searchGlobal"><FaSearch/></label>  
          </div>
          <button onClick={handleResetSearch} style={{marginRight:'20px'}} className='btn_Reset'>Reset all search</button>
      </div>
      
      <div className='box_ChoiceEntries' >
        <span>Rows per page:</span>
        <Dropdown
          options={['All', '5','10','25','50', '100']}
          onOptionClick={(option) => handlePerPageChange(option)}
          defaultValueSelectedOption={defaultValueSelectedOption.toString()}
        />
      </div>
    
      <div className='box_tableManaged scrollerTable'>
        <ManageColumns columns={columnsManaged} handleColumnVisibility={handleColumnVisibility} handleVisibleAllColumns={handleVisibleAllColumns}/>

      <table className='tableComponent'>
          <thead>
            <tr>
              {columnsManaged.map(({ label, property, isVisible }) => {
                if (isVisible) {
                  const isSortKey = sortKey === property;
                  return (
                    <th key={property} style={{ position: 'relative' }} className={`th_${property} thColor`}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p className='label' data-testid={`columnManaged-${property}`}>{label}</p>
                        <SortButton isSortKey={isSortKey} sortOrder={sortOrder} property={property} handleSort={handleSort} />
                        <SearchDropdown
                          inputValues={inputValues}
                          property={property}
                          handleSearchByProperty={handleSearchByProperty}
                          handleReset={handleReset}
                        />
                      </div>
                    </th>
                  );
                }
              })}
            </tr>
          </thead>

          <tbody>
            {currentData.map((item: DataItem<T>, index) => (
              <tr key={index}>
              {columnsManaged.map(({ property, isVisible }) => {
                if (isVisible) {
                  return (
                    <td key={`cell-${index}-${property}`}>
                      {formatDate(item[property])}
                    </td>
                  );
                }
                return null;
              })}
              </tr>
            ))}
          </tbody>

        </table> 
      </div>
     
      <div className='showingEntries' >
        {filteredData.length > 0 ? `${page === 1 ? 'Showing 1' : `Showing ${(page - 1) * perPage + 1}`} to ${Math.min(page * perPage, filteredData.length)} of ${filteredData.length} entries` : ''}
        {(filteredData.length <= 0) ? `0 result of ${data.length} entries filtered` : ''}
      </div>
    
      <Pagination 
        page={page} 
        totalPages={totalPages} 
        handlePageChange={handlePageChange} 
        />
    </div>
  );
}
    