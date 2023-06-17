import React from 'react';

type EntriesInfoProps = {
  filteredDataLength: number;
  dataLength: number;
  page: number;
  perPage: number;
};

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
