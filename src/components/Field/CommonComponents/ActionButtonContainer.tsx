import { Button, makeStyles, mergeClasses } from "@fluentui/react-components";
import React from "react";
import { ActionButtonContainerProps } from "./utils/commonComponents.interface";

// ? HOW TO USE
// This component is used to create an action button container that typically contains "Save" and "Cancel" buttons
// It can be used in two different positions: 'right' or 'bottom'

// Example usage when actionButtonPosition is 'right':
// - When editing is active (isEditing is true), it displays an ActiveComponent along with ActionButtonContainer
// - The ActionButtonContainer is wrapped in a flex container div for layout control
// - You can customize the styling of the div directly or use the Fluent UI v9 styling guide with makeStyles()

// Example usage:
// const buttonOnRightContainer: {
//   display: "flex",
//   columnGap: "8px",
//   justifyContent: "space-between",
// };

// <Field>
//   {isEditing ?
//     <InactiveComponent>
//     :
//     <div style={buttonOnRightContainer}>
//       <ActiveComponent/>
// ?     {isActionButtonOnRight && <ActionButtonContainer/>}
//    </div>}
// </Field>

const createClassName = makeStyles({
  root: {
    display: "flex",
    columnGap: "6px",
  },
});

const ActionButtonContainer: React.FC<ActionButtonContainerProps> = (props) => {
  const c = createClassName();
  const rootClassName = mergeClasses(c.root, props.className);

  return (
    <div className={rootClassName} style={props.style}>
      <Button
        disabled={props.disabled || props.saveDisabled}
        onClick={props.onSave}
        size={props.size}
        appearance="primary"
      >
        {props.saveLabel || "Save"}
      </Button>
      <Button
        disabled={props.disabled}
        onClick={props.onCancel}
        size={props.size}
      >
        {props.cancelLabel || "Cancel"}
      </Button>
    </div>
  );
};

export default ActionButtonContainer;
