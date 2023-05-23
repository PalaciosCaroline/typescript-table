import { DataItem } from './../components/Table';
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
declare const filterData: <T>(data: DataItem<T>[], searchTerm: string, searchTerms: DataItem<string>) => DataItem<T>[];
export default filterData;
