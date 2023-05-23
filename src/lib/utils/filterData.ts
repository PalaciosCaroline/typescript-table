import {DataItem} from './../components/Table';

/**
 * Filters an array of data items based on a global search term and individual property search terms.
 *
 * @template T - The type of the items in the data array.
 * 
 * @param {Array<DataItem<T>>} data - The array of data items to filter.
 * @param {string} searchTerm - The global search term to filter by.
 * @param {DataItem<string>} searchTerms - An object containing search terms for individual properties.
 *
 * @returns {DataItem<T>[]} The array of data items that pass the searchs terms filters.
 */
const filterData = <T>(data: Array<DataItem<T>>, searchTerm: string, searchTerms: DataItem<string>): DataItem<T>[] => {
  let filteredData = data;
  if (searchTerm) {
    filteredData = filteredData.filter((item) =>
      Object.values(item).some((value) =>
        value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }
  filteredData = filteredData.filter((item) =>
  Object.keys(searchTerms).every((property: string) =>
      item[property] && item[property]?.toString()
        .toLowerCase()
        .includes(searchTerms[property]?.toLowerCase() ?? '')
    )
  );
  return filteredData;
};

export default filterData;