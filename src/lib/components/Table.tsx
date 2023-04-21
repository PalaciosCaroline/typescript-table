import React, { useState, useEffect } from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { FaSearch } from 'react-icons/fa';
import { sortDates } from './../utils/sortDates';
import filterData from '../utils/filterData';
import Pagination from './Pagination';
import './../styles/table.css';
import Dropdown from './Dropdown';
import ManageColumns from './ManageColumns';

interface Column {
  label: string;
  property: string;
}

interface InputValues {
  [key: string]: string;
}

interface SearchTerms {
  [key: string]: string;
}

interface Props {
  data: any[];
  columns: Column[];
}

export default function Table({ data, columns }: Props) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState< string >('noSort');
  const [page, setPage] = useState<number>(1);
  const defaultValueSelectedOption = 10;
  const [perPage, setPerPage] = useState<number>(defaultValueSelectedOption);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortedData, setSortedData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchTerms, setSearchTerms] = useState<SearchTerms>({});
  const initialInputValues: InputValues = {};
  columns.forEach(({ property }) => {
    initialInputValues[property] = '';
  });
  const [inputValues, setInputValues] = useState<InputValues>(initialInputValues);

  useEffect(() => {
    let sortedData = data;
    if (sortKey === null) {
      setSortedData(data);
    } else if (sortOrder === 'noSort') {
      setSortedData(data);
    } else {
      sortedData = data.slice().sort((a: any, b: any) => {
        if (
          typeof sortedData[0][sortKey] === 'string' &&
          sortedData[0][sortKey].match(/^\d{2}([./-])\d{2}\1\d{4}$/)
        ) {
          return sortDates(a, b, sortKey, sortOrder);
        } else {
          const valueA = a[sortKey] && a[sortKey].toLowerCase();
          const valueB = b[sortKey] && b[sortKey].toLowerCase();
          return (
            valueA.localeCompare(valueB, undefined, { sensitivity: 'base' }) *
            (sortOrder === 'asc' ? 1 : -1)
          );
        }
      });
      setSortedData(sortedData);
    }
  }, [data,sortedData, sortKey, sortOrder]);

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
        
        <table className='tableComponent'>
          <ManageColumns columns={columnsManaged} handleColumnVisibility={handleColumnVisibility} handleVisibleAllColumns={handleVisibleAllColumns}/>
          <TableHeader
            columnData={columnsManaged}
            inputValues={inputValues}
            handleSearchByProperty={handleSearchByProperty}
            handleSort={handleSort}
            sortOrder={sortOrder}
            handleReset={handleReset}
            sortKey={sortKey ?? ''}
          />
      
          <TableBody
            page={page}
            perPage={perPage}
            filteredData={filteredData}
            columns={columnsManaged}
          />
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
    