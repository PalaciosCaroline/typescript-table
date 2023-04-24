import React from 'react';
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
declare function Modal(props: ModalProps): JSX.Element;
export default Modal;
