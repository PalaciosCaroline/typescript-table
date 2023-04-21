const filterData = (data: Array<object>, searchTerm: string, searchTerms: {[key: string]: string}) => {
  let filteredData = data;
  if (searchTerm) {
    filteredData = filteredData.filter((item: {[key: string]: any}) =>
      Object.values(item).some((value: any) =>
        value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }
  filteredData = filteredData.filter((item: {[key: string]: any}) =>
    Object.keys(searchTerms).every((property: string) =>
      item[property] && item[property]
        .toString()
        .toLowerCase()
        .includes(searchTerms[property].toLowerCase())
    )
  );
  return filteredData;
};

export default filterData;