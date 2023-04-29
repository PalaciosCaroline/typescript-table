type SortableObject = {
    [key: string]: any;
};
export declare function parseDate(dateStr: string): Date | null;
export declare function sortDates<T extends SortableObject>(a: T, b: T, sortKey: keyof T, sortOrder: 'asc' | 'desc'): number;
export declare function compareArrays(arrayA: any, arrayB: any, sortOrder: "asc" | "desc" | "noSort"): any;
export declare function customSort<T extends SortableObject>(data: T[], sortKey: keyof T | null, sortOrder: "asc" | "desc" | "noSort", sortUsaDate: boolean): T[];
export declare function hasPropertyDatePattern(data: any, property: string): {
    hasPattern: boolean;
    isAmericanFormat: boolean;
};
export {};
