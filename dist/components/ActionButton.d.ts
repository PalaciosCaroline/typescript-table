import React, { ReactNode } from 'react';
/**
 * Props for the action button.
 */
export type ActionButtonProps = {
    /**
     * The type of action the button performs.
     */
    actionType: 'edit' | 'archive' | 'delete';
    /**
     * Determines if the button is visible or not.
     */
    visible: boolean;
    /**
     * Callback function that handles the button action.
     * @param id - The ID of the item.
     * @param e - The event object.
     */
    handleAction: (id: any, e?: any) => void;
    /**
     * The ID of the item the action button is associated with.
     */
    itemId: any;
    /**
     * An object mapping action types to their associated icons.
     */
    icons: {
        [key: string]: ReactNode;
    };
};
/**
 * A functional component that renders an action button.
 * The button's type of action (edit, archive, delete), visibility, and associated item ID are customizable.
 * An icon for each action type can also be provided through the 'icons' prop.
 *
 * @returns The rendered ActionButton component or null if the button is not visible
 */
declare const ActionButton: React.FC<ActionButtonProps>;
export default ActionButton;
