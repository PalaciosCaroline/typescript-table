export type SortableObject = {
    [key: string]: any;
};
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
export declare function compareArrays(arrayA: any, arrayB: any, sortOrder: "asc" | "desc" | "noSort"): number;
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
export default function customSort<T extends SortableObject>(data: T[], sortKey: keyof T | undefined, sortOrder: "asc" | "desc" | "noSort", dateFormatForSort: string): T[];
