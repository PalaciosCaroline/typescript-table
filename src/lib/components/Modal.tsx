import React, { useRef, useEffect, KeyboardEvent } from 'react';
import { FaTimes } from 'react-icons/fa';

/**
 * ModalProps: The properties passed to the Modal component.
 *
 * @param {boolean} isOpen - A boolean that indicates if the modal is open.
 * @param {() => void} onClose - A function that is called to close the modal.
 * @param {React.ReactNode} children - The elements to be rendered in the modal.
 * @param {React.CSSProperties} style - The CSS properties to be applied to the modal.
 */
interface ModalProps {
  isModalTableOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  style: React.CSSProperties;
}

/**
 * Modal: A component for rendering a modal.
 *
 * @component
 * @param {ModalProps} props - The properties passed to the Modal component.
 * @returns {JSX.Element} - Returns a JSX element representing the rendered Modal.
 */
function Modal(props: ModalProps): JSX.Element {
  // useRef for storing references to the modal elements
  const modalRef = useRef<HTMLDivElement | null>(null);
  const lastActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Event handler for handling keydown events
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      // eslint-disable-next-line no-empty
      if (event.key === 'Enter') {
      } else if (event.key === 'Escape') {
        props.onClose();
      } else if (event.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const firstFocusableElement = focusableElements?.[0] as HTMLElement;
        const lastFocusableElement = focusableElements?.[
          focusableElements.length - 1
        ] as HTMLElement;
        if (
          document.activeElement === lastFocusableElement &&
          !event.shiftKey
        ) {
          event.preventDefault();
          firstFocusableElement.focus();
        } else if (
          document.activeElement === firstFocusableElement &&
          event.shiftKey
        ) {
          event.preventDefault();
          lastFocusableElement.focus();
        }
      }
    };

    if (props.isModalTableOpen) {
      lastActiveElement.current = document.activeElement as HTMLElement;
      document.addEventListener(
        'keydown',
        handleKeyDown as unknown as EventListenerOrEventListenerObject,
      );

      // Move focus to the first focusable element inside the modal
      requestAnimationFrame(() => {
        const firstFocusableElement = modalRef.current?.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ) as HTMLElement | null;
        firstFocusableElement?.focus();
      });
    } else {
      document.removeEventListener(
        'keydown',
        handleKeyDown as unknown as EventListenerOrEventListenerObject,
      );

      // Return focus to the previously focused element when the modal is closed
      if (lastActiveElement.current) {
        lastActiveElement.current.focus();
      }
    }

    return () => {
      document.removeEventListener(
        'keydown',
        handleKeyDown as unknown as EventListenerOrEventListenerObject,
      );
    };
  }, [props.isModalTableOpen]);

  return (
    <>
      {props.isModalTableOpen && (
        <div
          className="modalTable"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          ref={modalRef}
        >
          {/* Close button */}
          <button
            className="btn_closeModalTable customComponent"
            onClick={props.onClose}
            aria-label="Fermer la fenêtre"
            tabIndex={0}
            data-testid="btnCloseModal"
            style={props.style}
          >
            <FaTimes className="btn_closeModalTable_icon" />
          </button>
          {/* Modal content */}
          <div className="modalTable-content">{props.children}</div>
        </div>
      )}
    </>
  );
}

export default Modal;
