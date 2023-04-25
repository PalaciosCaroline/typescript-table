// interface SortableObject {
//   [key: string]: string | number | boolean | object | any[];
// }
function isString(value) {
    return typeof value === 'string';
}
// export const sortDates = (a: {[key: string]: any}, b: {[key: string]: any}, sortKey: string, sortOrder: string) => {
// function sortDates<T extends SortableObject>(
//   a: T,
//   b: T,
//   sortKey: keyof T,
//   sortOrder: "asc" | "desc"
// ): number {
//   const dateRegex = /^\d{2}([./-])\d{2}\1\d{4}$/;
//   const isDate = dateRegex.test(a[sortKey]) && dateRegex.test(b[sortKey]);
//   if (isDate) {
//     const match = dateRegex.exec(a[sortKey]);
//     const delimiter = match ? match[1] : '/';
//     const [dayA, monthA, yearA] = a[sortKey].split(delimiter).map((x : any) => parseInt(x, 10));
//     const [dayB, monthB, yearB] = b[sortKey].split(delimiter).map((x: any) => parseInt(x, 10));
//     const dateA = new Date(yearA, monthA - 1, dayA);
//     const dateB = new Date(yearB, monthB - 1, dayB);
//     if (dateA < dateB) return sortOrder === 'asc' ? -1 : 1;
//     if (dateA > dateB) return sortOrder === 'asc' ? 1 : -1;
//     return 0;
//   } else {
//     if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
//     if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
//     return 0;
//   }
// }
// function sortDates<T extends SortableObject>(
//   a: T,
//   b: T,
//   sortKey: keyof T,
//   sortOrder: 'asc' | 'desc'
// ): number {
//   const dateRegex = /^\d{2}([./-])\d{2}\1\d{4}$/;
//   if (isString(a[sortKey]) && isString(b[sortKey])) {
//     const isDate = dateRegex.test(a[sortKey]) && dateRegex.test(b[sortKey]);
//     if (isDate) {
//       const match = dateRegex.exec(a[sortKey]);
//       const delimiter = match ? match[1] : '/';
//       const [dayA, monthA, yearA] = a[sortKey].split(delimiter).map((x: any) => parseInt(x, 10));
//       const [dayB, monthB, yearB] = b[sortKey].split(delimiter).map((x: any) => parseInt(x, 10));
//       const dateA = new Date(yearA, monthA - 1, dayA);
//       const dateB = new Date(yearB, monthB - 1, dayB);
//       if (dateA < dateB) return sortOrder === 'asc' ? -1 : 1;
//       if (dateA > dateB) return sortOrder === 'asc' ? 1 : -1;
//       return 0;
//     } else {
//       if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
//       if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
//       return 0;
//     }
//   } else {
//     // handle the case when a[sortKey] and/or b[sortKey] are not strings
//     return 0;
//   }
// }
export function parseDate(dateStr) {
    var dateRegex1 = /^\d{2}([./-])\d{2}\1\d{4}$/;
    var dateRegex2 = /^\d{4}([./-])\d{2}\1\d{2}$/;
    var delimiter = dateStr.includes('/') ? '/' : dateStr.includes('.') ? '.' : '-';
    if (dateStr.match(dateRegex1)) {
        var _a = dateStr.split(delimiter).map(function (x) { return parseInt(x, 10); }), day = _a[0], month = _a[1], year = _a[2];
        return new Date(year, month - 1, day);
    }
    else if (dateStr.match(dateRegex2)) {
        var _b = dateStr.split(delimiter).map(function (x) { return parseInt(x, 10); }), year = _b[0], month = _b[1], day = _b[2];
        return new Date(year, month - 1, day);
    }
    else {
        return null;
    }
}
export function sortDates(a, b, sortKey, sortOrder) {
    var dateA = parseDate(a[sortKey]);
    var dateB = parseDate(b[sortKey]);
    if (dateA && dateB) {
        if (dateA < dateB)
            return sortOrder === 'asc' ? -1 : 1;
        if (dateA > dateB)
            return sortOrder === 'asc' ? 1 : -1;
        return 0;
    }
    else {
        if (a[sortKey] < b[sortKey])
            return sortOrder === 'asc' ? -1 : 1;
        if (a[sortKey] > b[sortKey])
            return sortOrder === 'asc' ? 1 : -1;
        return 0;
    }
}
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
export function customSort(data, sortKey, sortOrder) {
    if (sortKey === null || sortOrder === 'noSort') {
        return data;
    }
    return data.slice().sort(function (a, b) {
        var valueA = a[sortKey];
        var valueB = b[sortKey];
        var typeA = typeof valueA;
        var typeB = typeof valueB;
        if (valueA instanceof Date && valueB instanceof Date) {
            return sortOrder === 'asc' ? valueA.getTime() - valueB.getTime() : valueB.getTime() - valueA.getTime();
        }
        else if (typeA === 'string' && typeB === 'string') {
            if (valueA.match(/^\d{2}([./-])\d{2}\1\d{4}$/)) {
                return sortDates(a, b, sortKey, sortOrder);
            }
            else {
                return (valueA
                    .toString()
                    .toLowerCase()
                    .localeCompare(valueB.toString().toLowerCase(), undefined, {
                    sensitivity: 'base',
                }) * (sortOrder === 'asc' ? 1 : -1));
            }
        }
        else if (typeA === 'number' && typeB === 'number') {
            var numValueA = typeof valueA === 'number' ? valueA : 0;
            var numValueB = typeof valueB === 'number' ? valueB : 0;
            return sortOrder === 'asc' ? numValueA - numValueB : numValueB - numValueA;
        }
        else if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
            return sortOrder === 'asc'
                ? (valueA === valueB ? 0 : valueA ? 1 : -1)
                : (valueA === valueB ? 0 : valueA ? -1 : 1);
        }
        else if (typeA === 'object' && typeB === 'object') {
            var objectValueA = JSON.stringify(valueA);
            var objectValueB = JSON.stringify(valueB);
            return (objectValueA
                .toLowerCase()
                .localeCompare(objectValueB.toLowerCase(), undefined, {
                sensitivity: 'base',
            }) * (sortOrder === 'asc' ? 1 : -1));
        }
        else if (Array.isArray(valueA) && Array.isArray(valueB)) {
            return compareArrays(valueA, valueB, sortOrder);
        }
        else {
            return 0;
        }
    });
}
