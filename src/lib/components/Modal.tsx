import React, { useRef, useEffect, KeyboardEvent } from 'react';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal(props: ModalProps): JSX.Element {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const lastActiveElement = useRef<HTMLElement | null>(null);

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
          firstFocusableElement.focus();
        } else if (document.activeElement === firstFocusableElement && event.shiftKey) {
          event.preventDefault();
          lastFocusableElement.focus();
        }
      }
    };

    if (props.isOpen) {
      lastActiveElement.current = document.activeElement as HTMLElement;
      document.addEventListener('keydown', handleKeyDown as unknown as EventListenerOrEventListenerObject);

      // Move focus to the first focusable element inside the modal
      requestAnimationFrame(() => {
        const firstFocusableElement = modalRef.current?.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement | null;
        firstFocusableElement?.focus();
      });
    } else {
      document.removeEventListener('keydown', handleKeyDown as unknown as EventListenerOrEventListenerObject);

      // Return focus to the previously focused element when the modal is closed
      if (lastActiveElement.current) {
        lastActiveElement.current.focus();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown as unknown as EventListenerOrEventListenerObject);
    };
  }, [props.isOpen]);

  return (
    <>
      {props.isOpen && (
        <div className="modalTable" role="dialog" aria-modal="true" aria-labelledby="modal-title" ref={modalRef}>
          <button className="btn_closeModalTable" onClick={props.onClose} aria-label="Fermer la fenêtre" tabIndex={0} data-testId='btnCloseModal'>
            <FaTimes className="btn_closeModalTable_icon" />
          </button>
          <div className="modalTable-content">{props.children}</div>
        </div>
      )}
    </>
  );
}

export default Modal;