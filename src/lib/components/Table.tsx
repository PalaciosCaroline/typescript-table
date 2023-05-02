import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { customSort } from '../utils/sortDatas';
import filterData from '../utils/filterData';
import Pagination from './Pagination';
import './../styles/table.css';
import Dropdown from './Dropdown';
import ManageColumns from './ManageColumns';
import {TableHeader} from './TableHeader';

interface Column {
  label: string;
  property: string;
  dateFormat?: string;
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

export interface DataItem<T> {
  [key: string]: T | undefined;
}
interface Props<T> {
  data: DataItem<T | undefined>[];
  columns: Column[];
}

export default function Table<T>({ data, columns }: Props<T>) {
  const [sortKey, setSortKey] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'noSort'>('noSort');
  const [page, setPage] = useState<number>(1);
  const defaultValueSelectedOption = 10;
  const [perPage, setPerPage] = useState<number>(defaultValueSelectedOption);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortedData, setSortedData] = useState<DataItem<T | undefined>[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchTerms, setSearchTerms] = useState<SearchTerms>({});
  // const [sortUsaDate, setSortUsaDate] = useState<boolean>(false);
  const [dateFormatForSort, setDateFormatForSort]= useState<string>('none');
  const initialInputValues: SearchByProp = {};
  columns.forEach(({ property }) => {
    initialInputValues[property] = '';
  });
  const [inputValues, setInputValues] = useState(initialInputValues);

  //à vérifier (dateFormat possiblement undefined)
  useEffect(() => {
    setSortedData(customSort(data, sortKey, sortOrder, dateFormatForSort));
  }, [data, sortKey, sortOrder, dateFormatForSort]);

  const handleSort = (property: string, dateFormat:string) => {
    if (sortKey === property) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : sortOrder === 'desc' ? 'noSort' : 'asc');
    } else {
      setSortKey(property);
      setSortOrder('asc');
      setDateFormatForSort(dateFormat);
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
    return columns.map(({ label, property, dateFormat }) => ({
      label,
      property,
      isVisible: true,
      dateFormat: dateFormat !== undefined ? dateFormat : 'none',
    }));
  });

  const start = (page - 1) * perPage;
  const end = start + perPage;
  const currentData : DataItem<T>[] = filteredData.slice(start, end) as DataItem<T>[];

  function formatNestedDate<T>(value: T, depth = 0): string | React.ReactNode {
    if (depth >= 4) {
      return <span>...</span>;
    }
    if (value instanceof Date) {
      return value.toLocaleDateString();
    } else if (Array.isArray(value)) {
      return (
        <ul className='ul_TableComponent'>
          {value.map((item, index) => (
            <li key={index} className={`liOjectData liOjectData_${depth}`}>{formatNestedDate(item, depth + 1)}</li>
          ))}
        </ul>
      );
    } else if (typeof value === 'object' && value !== null) {
      return (
        <ul className='ul_TableComponent'>
          {Object.entries(value).map(([key, item], index) => (
            <li key={index} className={`liOjectData liOjectData_${depth}`}>
              {key}: {formatNestedDate(item, depth + 1)}
            </li>
          ))}
        </ul>
      );
    }
    return value as React.ReactNode;
  }

  function formatDate(value: T | undefined): string | React.ReactNode {
    return formatNestedDate(value);
  }
    
  return (
    <div className='box_table'>
      <div className='box_tableAndFeatures'>
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

        <table className='tableComponent' >
          <colgroup>
              {columnsManaged.map(({ property, isVisible}) => {
                if (isVisible) {
                return(  <col key={`{col_${property}`} id={`col_${property}`}></col>);}})}
          </colgroup>
          <thead>
            <tr role="row">
              {columnsManaged.map(({ label, property, isVisible, dateFormat }) => {
                const isSortKey = sortKey === property;

                return (
                  <TableHeader
                    key={property}
                    label={label}
                    property={property}
                    isVisible={isVisible}
                    dateFormat={dateFormat}
                    isSortKey={isSortKey}
                    sortOrder={sortOrder}
                    handleSort={handleSort}
                    inputValues={inputValues}
                    handleSearchByProperty={handleSearchByProperty}
                    handleReset={handleReset}
                  />
                );
              })}
            </tr>
          </thead>

          <tbody>
            {currentData.map((item: DataItem<T>, index) => (
              <tr key={index}  role="row">
              {columnsManaged.map(({ property, isVisible }) => {
                if (isVisible) {
                  return (
                    <td key={`cell-${index}-${property}`} role="cell" className='table-cell'>
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
      <div className='box_entriesAndPage'>
        <div className='showingEntries' >
          { filteredData.length > 0
            ? `${
                page === 1 ? "1" : `${(page - 1) * perPage + 1}`
              }${
                page * perPage < filteredData.length || (page - 1) * perPage + 1 === filteredData.length
                  ? filteredData.length === (page - 1) * perPage + 1
                    ? ""
                    : ` - ${Math.min(page * perPage, filteredData.length)}`
                  : ""
              } of ${filteredData.length} ${
                filteredData.length === 1 ? "entry" : "entries"
              }`
            : ""
          }
          {
          filteredData.length <= 0
            ? `0 result of ${data.length} entries`
            : ""
          }

        </div>
        
          <Pagination 
            page={page} 
            totalPages={totalPages} 
            handlePageChange={handlePageChange} 
          />
        </div>
      </div>
    </div>
  );
}
      