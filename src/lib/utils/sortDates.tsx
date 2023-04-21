// export const sortDates = (a, b, sortKey, sortOrder) => {
//     const dateRegex = /^\d{2}([./-])\d{2}\1\d{4}$/;
//     const isDate = dateRegex.test(a[sortKey]) && dateRegex.test(b[sortKey]);
//     if (isDate) {
//       const delimiter = dateRegex.exec(a[sortKey])[1];
//       const [dayA, monthA, yearA] = a[sortKey].split(delimiter).map((x) => parseInt(x, 10));
//       const [dayB, monthB, yearB] = b[sortKey].split(delimiter).map((x) => parseInt(x, 10));
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
//   };


export const sortDates = (a: {[key: string]: any}, b: {[key: string]: any}, sortKey: string, sortOrder: string) => {
  const dateRegex = /^\d{2}([./-])\d{2}\1\d{4}$/;
  const isDate = dateRegex.test(a[sortKey]) && dateRegex.test(b[sortKey]);
  if (isDate) {
    // const delimiter = dateRegex.exec(a[sortKey])[1];
    const match = dateRegex.exec(a[sortKey]);
    const delimiter = match ? match[1] : '/';
    const [dayA, monthA, yearA] = a[sortKey].split(delimiter).map((x : any) => parseInt(x, 10));
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
};