import { DataItem } from './../components/Table';
declare const filterData: <T>(data: DataItem<T>[], searchTerm: string, searchTerms: DataItem<string>) => DataItem<T>[];
export default filterData;
