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
const EntriesInfo: React.FC<EntriesInfoProps> = ({
  filteredDataLength,
  dataLength,
  page,
  perPage,
}) => {
  let content;

  if (filteredDataLength <= 0) {
    content = `0 result of ${dataLength} entries`;
  } else if (filteredDataLength === 1) {
    content = `1 entry`;
  } else {
    content = `${(page - 1) * perPage + 1} - ${Math.min(
      page * perPage,
      filteredDataLength,
    )} of ${filteredDataLength} entries`;
  }

  return <div className="showingEntries">{content}</div>;
};

export default EntriesInfo;
