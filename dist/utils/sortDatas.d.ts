export type SortableObject = {
    [key: string]: any;
};
export declare function compareArrays(arrayA: any, arrayB: any, sortOrder: "asc" | "desc" | "noSort"): any;
export declare function customSort<T extends SortableObject>(data: T[], sortKey: keyof T | undefined, sortOrder: "asc" | "desc" | "noSort", dateFormatForSort: string): T[];
