
export type SortableObject = { [key: string]: any };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
/**
 * Compares two arrays in ascending, descending, or no particular order.
 * 
 * The comparison is case-insensitive and is done based on the first item of each array.
 * An empty array is always considered less than a non-empty array.
 *
 * @param {any[]} arrayA - The first array to compare.
 * @param {any[]} arrayB - The second array to compare.
 * @param {"asc" | "desc" | "noSort"} sortOrder - The order in which to compare the arrays. 'asc' for ascending, 'desc' for descending, 'noSort' for no specific order.
 *
 * @returns {number} - Returns 0 if the arrays are equal or both are empty, -1 if arrayA is less than arrayB, or 1 if arrayA is greater than arrayB.
 *                     If sortOrder is 'asc', -1 means arrayA comes first. If sortOrder is 'desc', -1 means arrayB comes first.
 */
export function compareArrays(arrayA : any, arrayB: any, sortOrder : "asc" | "desc" | "noSort"): number {
  if (arrayA.length === 0 && arrayB.length === 0) {
    return 0;
  } else if (arrayA.length === 0) {
    return sortOrder === 'asc' ? -1 : 1;
  } else if (arrayB.length === 0) {
    return sortOrder === 'asc' ? 1 : -1;
  }

  const comparisonResult = arrayA[0]
    .toString()
    .toLowerCase()
    .localeCompare(arrayB[0].toString().toLowerCase(), undefined, {
      sensitivity: 'base',
    });
  return sortOrder === 'asc' ? comparisonResult : -comparisonResult;
}

function replaceSeparators(dateStr: string) {
  return dateStr.replace(/[-.]/g, '/');
}

/**
 * Sorts an array of objects based on a specified key and sort order.
 * Handles date strings, strings, numbers, booleans, objects, and arrays.
 * The sort order can be 'asc', 'desc', or 'noSort'. 
 * For dates, the dateFormatForSort can be 'YYYY/MM/DD', 'DD/MM/YYYY', 'MM/DD/YYYY', or 'none'.
 *
 * @template T - The type of the objects in the array to be sorted. It should be a subtype of SortableObject, i.e., an object with string keys and values of any type.
 *
 * @param {T[]} data - The array of objects to be sorted.
 * @param {keyof T | undefined} sortKey - The key to sort the objects by.
 * @param {"asc" | "desc" | "noSort"} sortOrder - The order to sort the array in.
 * @param {string} dateFormatForSort - The format of the date string for sorting purposes.
 *
 * @returns {T[]} - The sorted array of objects.
 */
export default function customSort<T extends SortableObject>(
  data: T[],
  sortKey: keyof T | undefined,
  sortOrder: "asc" | "desc" | "noSort",
  dateFormatForSort: string
): T[] {

  function parseDate(dateString: string, format: string) {
    let dateParts: string[], year: number, month: number, day: number;

    if (format === 'YYYY/MM/DD') {
      dateString = replaceSeparators(dateString);
      dateParts = dateString.split('/');
      year = parseInt(dateParts[0], 10);
      month = parseInt(dateParts[1], 10) - 1;
      day = parseInt(dateParts[2], 10);
    } else if (format === 'DD/MM/YYYY') {
      dateString = replaceSeparators(dateString);
      dateParts = dateString.split('/');
      year = parseInt(dateParts[2], 10);
      month = parseInt(dateParts[1], 10) - 1;
      day = parseInt(dateParts[0], 10);
    } else if (format === 'MM/DD/YYYY') {
      dateString = replaceSeparators(dateString);
      dateParts = dateString.split('/');
      year = parseInt(dateParts[2], 10);
      month = parseInt(dateParts[0], 10) - 1;
      day = parseInt(dateParts[1], 10);
    } else {
      return null;
    }

    return new Date(Date.UTC(year, month, day));
  }

  if (sortKey === undefined || sortOrder === 'noSort') {
    return data;
  }

  return data.slice().sort((a: T, b: T) => {
    const valueA = a[sortKey];
    const valueB = b[sortKey];
    const typeA = typeof valueA;
    const typeB = typeof valueB;

    if (typeA === 'string' && typeB === 'string' && dateFormatForSort !== 'none') {
      const dateA = parseDate(valueA as string, dateFormatForSort);
      const dateB = parseDate(valueB as string, dateFormatForSort);

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
      const objectValueA = JSON.stringify(valueA);
      const objectValueB = JSON.stringify(valueB);
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