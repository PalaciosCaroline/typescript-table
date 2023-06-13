import React from 'react';
/**
 * ModalProps: The properties passed to the Modal component.
 *
 * @param {boolean} isOpen - A boolean that indicates if the modal is open.
 * @param {() => void} onClose - A function that is called to close the modal.
 * @param {React.ReactNode} children - The elements to be rendered in the modal.
 * @param {React.CSSProperties} style - The CSS properties to be applied to the modal.
 */
interface ModalProps {
    isOpen: boolean;
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
declare function Modal(props: ModalProps): JSX.Element;
export default Modal;
