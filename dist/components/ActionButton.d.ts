import React, { ReactNode } from 'react';
/**
 * @typedef ActionButtonProps
 * @type {object}
 * @property {('edit'|'archive'|'delete')} actionType - The type of action the button performs
 * @property {boolean} visible - Determines if the button is visible or not
 * @property {(id: any, e?: any) => void} handleAction - Callback function that handles the button action
 * @property {any} itemId - The ID of the item the action button is associated with
 * @property {{ [key: string]: ReactNode }} icons - An object mapping action types to their associated icons
 */
type ActionButtonProps = {
    actionType: 'edit' | 'archive' | 'delete';
    visible: boolean;
    handleAction: (id: any, e?: any) => void;
    itemId: any;
    icons: {
        [key: string]: ReactNode;
    };
};
/**
 * A functional component that renders an action button.
 * The button's type of action (edit, archive, delete), visibility, and associated item ID are customizable.
 * An icon for each action type can also be provided through the 'icons' prop.
 *
 * @param {ActionButtonProps} props - The properties or attributes of the ActionButton component
 * @returns {JSX.Element | null} The rendered ActionButton component or null if the button is not visible
 */
declare const ActionButton: React.FC<ActionButtonProps>;
export default ActionButton;
