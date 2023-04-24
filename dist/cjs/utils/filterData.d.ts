declare const filterData: (data: Array<object>, searchTerm: string, searchTerms: {
    [key: string]: string;
}) => object[];
export default filterData;
