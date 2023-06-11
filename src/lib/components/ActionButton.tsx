import React, { ReactNode } from 'react';

type ActionButtonProps = {
    actionType: 'edit' | 'archive' | 'delete';
    visible: boolean;
    handleAction: (id: any, e?: any) => void;
    itemId: any;
    icons: { [key: string]: ReactNode };
  };
  
const ActionButton: React.FC<ActionButtonProps> = ({
    actionType,
    visible,
    handleAction,
    itemId,
    icons,
  }) => {
    if (!visible) return null;
    
    return (
      <button
        className={`btn${actionType.charAt(0).toUpperCase() + actionType.slice(1)}`}
        onClick={(e) => {
          e.stopPropagation(); // to prevent triggering row selection
          handleAction(itemId,e);
        }}
        aria-label={`${actionType} this row`}
      >
        {icons[actionType]}
      </button>
    );
  };

  export default ActionButton;