import React from "react";
import { Spinner, TableCell } from "@fluentui/react-components";
import { LoadingStateTableProps } from "./utils/Interface";

const LoadingState: React.FC<LoadingStateTableProps> = (props) => {
  return (
    <TableCell colSpan={props.colspan}>
      <Spinner size="extra-small" />
    </TableCell>
  );
};

export default LoadingState;
