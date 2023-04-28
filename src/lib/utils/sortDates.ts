
type SortableObject = { [key: string]: any };

// function isString(value: any): value is string {
//   return typeof value === 'string';
// }

export function parseDate(dateStr: string) {
  const dateRegex1 = /^\d{2}([./-])\d{2}\1\d{4}$/;
  const dateRegex2 = /^\d{4}([./-])\d{2}\1\d{2}$/;
  const delimiter = dateStr.includes('/') ? '/' : dateStr.includes('.') ? '.' : '-';
  
  if (dateStr.match(dateRegex1)) {
    const [day, month, year] = dateStr.split(delimiter).map((x: string) => parseInt(x, 10));
    return new Date(year, month - 1, day);
  } else if (dateStr.match(dateRegex2)) {
    const [year, month, day] = dateStr.split(delimiter).map((x :string) => parseInt(x, 10));
    return new Date(year, month - 1, day);
  } else {
    return null;
  }
}

export function sortDates<T extends SortableObject> (
  a: T,
  b: T,
  sortKey: keyof T,
  sortOrder: 'asc' | 'desc'
) : number {
  const dateA = parseDate(a[sortKey]);
  const dateB = parseDate(b[sortKey]);

  if (dateA && dateB) {
    if (dateA < dateB) return sortOrder === 'asc' ? -1 : 1;
    if (dateA > dateB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  } else {
    if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  }
}


export function compareArrays(arrayA : any, arrayB: any, sortOrder : "asc" | "desc" | "noSort") {
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

export function customSort<T extends SortableObject>(
  data: T[],
  sortKey: keyof T | null,
  sortOrder: "asc" | "desc" | "noSort"
): T[] {

  if (sortKey === null || sortOrder === 'noSort') {
    return data;
  }

  return data.slice().sort((a: any, b: any) => {
    const valueA = a[sortKey];
    const valueB = b[sortKey];
    const typeA = typeof valueA;
    const typeB = typeof valueB;

    if (valueA instanceof Date && valueB instanceof Date) {
      return sortOrder === 'asc' ? valueA.getTime() - valueB.getTime() : valueB.getTime() - valueA.getTime();
    } else if (typeA === 'string' && typeB === 'string') {
      if ((valueA as string).match(/^\d{2}([./-])\d{2}\1\d{4}$/)) {
        return sortDates(a, b, sortKey, sortOrder);
      } else {
        return (
          valueA
            .toString()
            .toLowerCase()
            .localeCompare(valueB.toString().toLowerCase(), undefined, {
              sensitivity: 'base',
            }) * (sortOrder === 'asc' ? 1 : -1)
        );
      }
    } else if (typeA === 'number' && typeB === 'number') {
      const numValueA = typeof valueA === 'number' ? valueA : 0;
      const numValueB = typeof valueB === 'number' ? valueB : 0;
      return sortOrder === 'asc' ? numValueA - numValueB : numValueB - numValueA;
    } else if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
      return sortOrder === 'asc'
        ? (valueA === valueB ? 0 : valueA ? 1 : -1)
        : (valueA === valueB ? 0 : valueA ? -1 : 1);
    } else if (typeA === 'object' && typeB === 'object') {
      const objectValueA = JSON.stringify(valueA);
      const objectValueB = JSON.stringify(valueB);
      return (
        objectValueA
          .toLowerCase()
          .localeCompare(objectValueB.toLowerCase(), undefined, {
            sensitivity: 'base',
          }) * (sortOrder === 'asc' ? 1 : -1)
      );
    } else if (Array.isArray(valueA) && Array.isArray(valueB)) {
      return compareArrays(valueA, valueB, sortOrder);
    } else {
      return 0;
    }
  });
}