// interface SortableObject {
//   [key: string]: string | number | boolean | object | any[];
// }

type SortableObject = { [key: string]: any };

function isString(value: any): value is string {
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


function sortDates<T extends SortableObject>(
  a: T,
  b: T,
  sortKey: keyof T,
  sortOrder: 'asc' | 'desc'
): number {
  const dateRegex = /^\d{2}([./-])\d{2}\1\d{4}$/;

  if (isString(a[sortKey]) && isString(b[sortKey])) {
    const isDate = dateRegex.test(a[sortKey]) && dateRegex.test(b[sortKey]);
    if (isDate) {
      const match = dateRegex.exec(a[sortKey]);
      const delimiter = match ? match[1] : '/';
      const [dayA, monthA, yearA] = a[sortKey].split(delimiter).map((x: any) => parseInt(x, 10));
      const [dayB, monthB, yearB] = b[sortKey].split(delimiter).map((x: any) => parseInt(x, 10));
      const dateA = new Date(yearA, monthA - 1, dayA);
      const dateB = new Date(yearB, monthB - 1, dayB);
      if (dateA < dateB) return sortOrder === 'asc' ? -1 : 1;
      if (dateA > dateB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    } else {
      if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    }
  } else {
    // handle the case when a[sortKey] and/or b[sortKey] are not strings
    return 0;
  }
}


// export function customSort(data: any[], sortKey: string | null, sortOrder: 'asc' | 'desc' | 'noSort'): any[] {

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

    if (typeA === 'string' && typeB === 'string') {
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
    } else if (typeA === 'boolean' && typeB === 'boolean') {
      return sortOrder === 'asc'
        ? (valueA === valueB ? 0 : valueA ? -1 : 1)
        : (valueA === valueB ? 0 : valueA ? 1 : -1);
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
      const arrayValueA = JSON.stringify(valueA);
      const arrayValueB = JSON.stringify(valueB);
      return (
        arrayValueA
          .toLowerCase()
          .localeCompare(arrayValueB.toLowerCase(), undefined, {
            sensitivity: 'base',
          }) * (sortOrder === 'asc' ? 1 : -1)
      );
    } else {
      return 0;
    }
  });
}