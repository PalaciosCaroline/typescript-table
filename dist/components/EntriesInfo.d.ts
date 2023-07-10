import React from 'react';
/**
 * EntriesInfoProps: Props for the EntriesInfo component.
 *
 * @param {number} filteredDataLength - The number of filtered entries.
 * @param {number} dataLength - The total number of entries.
 * @param {number} page - The current page number.
 * @param {number} perPage - The number of entries per page.
 */
export type EntriesInfoProps = {
    filteredDataLength: number;
    dataLength: number;
    page: number;
    perPage: number;
};
/**
 * A functional component that shows the number of entries and their range.
 *
 * @param props - The props that define the number of entries and their range.
 */
declare const EntriesInfo: React.FC<EntriesInfoProps>;
export default EntriesInfo;
