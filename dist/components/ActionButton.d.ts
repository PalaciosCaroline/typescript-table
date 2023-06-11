import React, { ReactNode } from 'react';
type ActionButtonProps = {
    actionType: 'edit' | 'archive' | 'delete';
    visible: boolean;
    handleAction: (id: any, e?: any) => void;
    itemId: any;
    icons: {
        [key: string]: ReactNode;
    };
};
declare const ActionButton: React.FC<ActionButtonProps>;
export default ActionButton;
