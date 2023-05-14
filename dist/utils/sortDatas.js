// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function compareArrays(arrayA, arrayB, sortOrder) {
    if (arrayA.length === 0 && arrayB.length === 0) {
        return 0;
    }
    else if (arrayA.length === 0) {
        return sortOrder === 'asc' ? -1 : 1;
    }
    else if (arrayB.length === 0) {
        return sortOrder === 'asc' ? 1 : -1;
    }
    var comparisonResult = arrayA[0]
        .toString()
        .toLowerCase()
        .localeCompare(arrayB[0].toString().toLowerCase(), undefined, {
        sensitivity: 'base',
    });
    return sortOrder === 'asc' ? comparisonResult : -comparisonResult;
}
function replaceSeparators(dateStr) {
    return dateStr.replace(/[-.]/g, '/');
}
export function customSort(data, sortKey, sortOrder, dateFormatForSort) {
    function parseDate(dateString, format) {
        var dateParts, year, month, day;
        if (format === 'YYYY/MM/DD') {
            dateString = replaceSeparators(dateString);
            dateParts = dateString.split('/');
            year = parseInt(dateParts[0], 10);
            month = parseInt(dateParts[1], 10) - 1;
            day = parseInt(dateParts[2], 10);
        }
        else if (format === 'DD/MM/YYYY') {
            dateString = replaceSeparators(dateString);
            dateParts = dateString.split('/');
            year = parseInt(dateParts[2], 10);
            month = parseInt(dateParts[1], 10) - 1;
            day = parseInt(dateParts[0], 10);
        }
        else if (format === 'MM/DD/YYYY') {
            dateString = replaceSeparators(dateString);
            dateParts = dateString.split('/');
            year = parseInt(dateParts[2], 10);
            month = parseInt(dateParts[0], 10) - 1;
            day = parseInt(dateParts[1], 10);
        }
        else {
            return null;
        }
        return new Date(Date.UTC(year, month, day));
    }
    if (sortKey === undefined || sortOrder === 'noSort') {
        return data;
    }
    return data.slice().sort(function (a, b) {
        var valueA = a[sortKey];
        var valueB = b[sortKey];
        var typeA = typeof valueA;
        var typeB = typeof valueB;
        if (typeA === 'string' && typeB === 'string' && dateFormatForSort !== 'none') {
            var dateA = parseDate(valueA, dateFormatForSort);
            var dateB = parseDate(valueB, dateFormatForSort);
            if (dateA && dateB) {
                return sortOrder === 'asc'
                    ? dateA.getTime() - dateB.getTime()
                    : dateB.getTime() - dateA.getTime();
            }
        }
        if (typeA === 'string' && typeB === 'string') {
            return valueA.toLowerCase().localeCompare(valueB.toLowerCase(), undefined, {
                sensitivity: 'base',
            }) * (sortOrder === 'asc' ? 1 : -1);
        }
        if (typeA === 'number' && typeB === 'number') {
            return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
        }
        if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
            return sortOrder === 'asc'
                ? (valueA === valueB ? 0 : valueA ? 1 : -1)
                : (valueA === valueB ? 0 : valueA ? -1 : 1);
        }
        if (typeA === 'object' && typeB === 'object') {
            var objectValueA = JSON.stringify(valueA);
            var objectValueB = JSON.stringify(valueB);
            return objectValueA.toLowerCase().localeCompare(objectValueB.toLowerCase(), undefined, {
                sensitivity: 'base',
            }) * (sortOrder === 'asc' ? 1 : -1);
        }
        if (Array.isArray(valueA) && Array.isArray(valueB)) {
            return valueA.length - valueB.length;
        }
        return 0;
    });
}
