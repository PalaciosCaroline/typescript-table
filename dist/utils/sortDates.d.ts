type SortableObject = {
    [key: string]: any;
};
export declare function customSort<T extends SortableObject>(data: T[], sortKey: keyof T | null, sortOrder: "asc" | "desc" | "noSort"): T[];
export {};
