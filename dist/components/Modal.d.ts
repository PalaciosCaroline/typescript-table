import React from 'react';
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    style: React.CSSProperties;
}
/**
 * Component for displaying a modal.
 *
 * @component
 * @param {ModalProps} props - The props for the Modal component.
 * @returns {JSX.Element} The rendered Modal component.
 */
declare function Modal(props: ModalProps): JSX.Element;
export default Modal;
