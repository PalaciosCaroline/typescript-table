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
