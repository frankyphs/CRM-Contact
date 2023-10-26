import React, { FunctionComponent } from "react";
import { ReactFlowProvider } from "reactflow";

import ReactFlowWrapper from "./ReactFlowWrapper";
import { IFlowEditorProps } from "./utils/Interfaces";


const FlowEditor: FunctionComponent<IFlowEditorProps> = (props) => (
  <ReactFlowProvider>
    <ReactFlowWrapper {...props} />
  </ReactFlowProvider>
);

export default FlowEditor;