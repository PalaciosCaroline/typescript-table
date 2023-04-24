"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            return item[property] && item[property]
                .toString()
                .toLowerCase()
                .includes(searchTerms[property].toLowerCase());
        });
    });
    return filteredData;
};
exports.default = filterData;
