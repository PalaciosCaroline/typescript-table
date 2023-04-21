// import React from 'react';
// import { FaTimes } from 'react-icons/fa';

// interface Props {
//   inputValues: Record<string, string>;
//   property: string;
//   handleSearchByProperty: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   handleReset: (property: string) => void;
//   handleClose: () => void;
// }

// const SearchByProperty = ({
//   inputValues,
//   property,
//   handleSearchByProperty,
//   handleReset,
//   handleClose
// }: Props) => {
//   const handleResetClose = () => {
//     handleReset(property);
//     handleClose();
//   };

//   return (
//     <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
//       <input
//         type="text"
//         value={inputValues[property]}
//         onChange={handleSearchByProperty}
//         placeholder="Search..."
//         name={property}
//         className="inputSearchByProperty"
//       />
//       <button
//         type="button"
//         className="btnSearchByPropertyReset"
//         onClick={handleResetClose}
//         style={{
//           position: 'absolute',
//           top: 0,
//           right: 0,
//           width: '20px',
//           height: '100%',
//           backgroundColor: 'transparent',
//           margin: '0',
//           paddingRight: '25px'
//         }}
//       >
//         <FaTimes />
//       </button>
//     </div>
//   );
// };

// export default SearchByProperty;


import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface Props {
  inputValues: Record<string, string>;
  property: string;
  handleSearchByProperty: (name: string, value: string) => void;
  handleReset: (property: string) => void;
  handleClose: () => void;
}

const SearchByProperty = ({
  inputValues,
  property,
  handleSearchByProperty,
  handleReset,
  handleClose
}: Props) => {
  const handleResetClose = () => {
    handleReset(property);
    handleClose();
  };


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const property = event.target.name;
    const value = event.target.value;
    handleSearchByProperty(property, value);
  };

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <input
        type="text"
        value={inputValues[property]?? ''}
        onChange={handleInputChange}
        placeholder="Search..."
        name={property}
        className="inputSearchByProperty"
      />
      <button
        type="button"
        className="btnSearchByPropertyReset"
        onClick={handleResetClose}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '20px',
          height: '100%',
          backgroundColor: 'transparent',
          margin: '0',
          paddingRight: '25px'
        }}
      >
        <FaTimes />
      </button>
    </div>
  );
};

export default SearchByProperty;