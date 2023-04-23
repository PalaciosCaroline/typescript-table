// // import React, { useRef, useEffect } from 'react';
// // import { FaTimes } from 'react-icons/fa';

// // interface ModalProps {
// // isOpen: boolean;
// // onClose: () => void;
// // children: React.ReactNode;
// // }

// // function Modal(props: ModalProps): JSX.Element {
// //   const modalRef = useRef<HTMLDivElement | null>(null);

// // useEffect(() => {
// // if (props.isOpen) {
// // document.addEventListener('keydown', handleKeyDown);
// // } else {
// // document.removeEventListener('keydown', handleKeyDown);
// // }

// // return () => {
// //   document.removeEventListener('keydown', handleKeyDown);
// // };

// // }, [props.isOpen]);

// // const handleKeyDown = (event: KeyboardEvent): void => {
// // if (event.key === 'Escape') {
// // props.onClose();
// // } else if (event.key === 'Tab') {
// // const focusableElements = modalRef.current?.querySelectorAll(
// // 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
// // );
// // const firstFocusableElement = focusableElements?.[0] as HTMLElement;
// // const lastFocusableElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;
// // if (document.activeElement === lastFocusableElement && !event.shiftKey) {
// // event.preventDefault();
// // // modalRef.current?.querySelector('.btn_closeModalTable')?.focus();
// //  const closeButton = modalRef.current?.querySelector('.btn_closeModalTable') as HTMLButtonElement | null;
// //   closeButton?.focus();
// // } else if (document.activeElement === firstFocusableElement && event.shiftKey) {
// // event.preventDefault();
// // lastFocusableElement.focus();
// // }
// // }
// // };

// // return (
// // <>
// // {props.isOpen && (
// // <div className="modalTable" role="dialog" aria-modal="true" aria-labelledby="modal-title" onKeyDown={handleKeyDown} ref={modalRef}>
// // <button className="btn_closeModalTable" onClick={props.onClose} aria-label="Fermer la fenêtre" tabIndex={0}>
// // <FaTimes className="btn_closeModalTable_icon" />
// // </button>
// // <h2 id="modal-title">Managed columns</h2>
// // <div className="modalTable-content">{props.children}</div>
// // </div>
// // )}
// // </>
// // );
// // }

// // export default Modal;


// import React, { useRef, useEffect, KeyboardEvent } from 'react';
// import { FaTimes } from 'react-icons/fa';

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
// }

// function Modal(props: ModalProps): JSX.Element {
//   const modalRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (props.isOpen) {
//       document.addEventListener('keydown', handleKeyDown);
//     } else {
//       document.removeEventListener('keydown', handleKeyDown);
//     }

//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [props.isOpen]);

//   const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
//     if (event.key === 'Escape') {
//       props.onClose();
//     } else if (event.key === 'Tab') {
//       const focusableElements = modalRef.current?.querySelectorAll(
//         'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
//       );
//       const firstFocusableElement = focusableElements?.[0] as HTMLElement;
//       const lastFocusableElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;
//       if (document.activeElement === lastFocusableElement && !event.shiftKey) {
//         event.preventDefault();
//         const closeButton = modalRef.current?.querySelector('.btn_closeModalTable') as HTMLButtonElement | null;
//         closeButton?.focus();
//       } else if (document.activeElement === firstFocusableElement && event.shiftKey) {
//         event.preventDefault();
//         lastFocusableElement.focus();
//       }
//     }
//   };

//   return (
//     <>
//       {props.isOpen && (
//         <div className="modalTable" role="dialog" aria-modal="true" aria-labelledby="modal-title" onKeyDown={handleKeyDown} ref={modalRef}>
//           <button className="btn_closeModalTable" onClick={props.onClose} aria-label="Fermer la fenêtre" tabIndex={0}>
//             <FaTimes className="btn_closeModalTable_icon" />
//           </button>
//           <h2 id="modal-title">Managed columns</h2>
//           <div className="modalTable-content">{props.children}</div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Modal;



import React, { useRef, useEffect, KeyboardEvent } from 'react';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal(props: ModalProps): JSX.Element {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Escape') {
        props.onClose();
      } else if (event.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusableElement = focusableElements?.[0] as HTMLElement;
        const lastFocusableElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;
        if (document.activeElement === lastFocusableElement && !event.shiftKey) {
          event.preventDefault();
          const closeButton = modalRef.current?.querySelector('.btn_closeModalTable') as HTMLButtonElement | null;
          closeButton?.focus();
        } else if (document.activeElement === firstFocusableElement && event.shiftKey) {
          event.preventDefault();
          lastFocusableElement.focus();
        }
      }
    };

    if (props.isOpen) {
      document.addEventListener('keydown', handleKeyDown as unknown as EventListenerOrEventListenerObject);
    } else {
      document.removeEventListener('keydown', handleKeyDown as unknown as EventListenerOrEventListenerObject);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown as unknown as EventListenerOrEventListenerObject);
    };
  }, [props.isOpen]);

  return (
    <>
      {props.isOpen && (
        <div className="modalTable" role="dialog" aria-modal="true" aria-labelledby="modal-title" ref={modalRef}>
          <button className="btn_closeModalTable" onClick={props.onClose} aria-label="Fermer la fenêtre" tabIndex={0}>
            <FaTimes className="btn_closeModalTable_icon" />
          </button>
          <div className="modalTable-content">{props.children}</div>
        </div>
      )}
    </>
  );
}

export default Modal;