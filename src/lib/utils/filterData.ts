import {DataItem} from './../components/Table';

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