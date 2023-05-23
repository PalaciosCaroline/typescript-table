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
var filterData = function (data, searchTerm, searchTerms) {
    var filteredData = data;
    if (searchTerm) {
        filteredData = filteredData.filter(function (item) {
            return Object.values(item).some(function (value) {
                return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
            });
        });
    }
    filteredData = filteredData.filter(function (item) {
        return Object.keys(searchTerms).every(function (property) {
            var _a, _b, _c;
            return item[property] && ((_a = item[property]) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase().includes((_c = (_b = searchTerms[property]) === null || _b === void 0 ? void 0 : _b.toLowerCase()) !== null && _c !== void 0 ? _c : ''));
        });
    });
    return filteredData;
};
export default filterData;
