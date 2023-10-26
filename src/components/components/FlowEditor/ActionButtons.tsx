import React from "react";
import { FunctionComponent } from "react";
import { BaseButton, Button, DefaultButton, IconButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { Stack } from "@fluentui/react/lib/Stack";
import { mergeStyles } from "@fluentui/react/lib/Styling";
import { Position, Node, useReactFlow, useStoreApi, Edge } from "reactflow";
import { ITextFieldNodeData } from "./utils/Interfaces";
import { IIconProps } from "@fluentui/react/lib/Icon";

import { validateFlow } from "./utils/Helper";

const actionWrapperStyle = mergeStyles({
  position: "absolute",
  zIndex: 1,
  top: 10,
  left: 10
});

const AddIcon: IIconProps = { iconName: "Add" };
const UploadIcon: IIconProps = { iconName: "Upload" };
const DownloadIcon: IIconProps = { iconName: "Download" };

const ActionButtons: FunctionComponent<any> = (props) => {
  const reactFlow = useReactFlow();

  const handleAddClick = (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | BaseButton | Button | HTMLSpanElement, MouseEvent>) => {
    props.onAddClick(event);
  }

  const handleUploadClick = (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | BaseButton | Button | HTMLSpanElement, MouseEvent>) => {
    props.onUploadClick(event);
  }

  const handleDownloadClick = (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | BaseButton | Button | HTMLSpanElement, MouseEvent>) => {
    const nodes: Node[] = reactFlow.getNodes();
    const edges: Edge[] = reactFlow.getEdges();
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify({ nodes, edges }))}`;

    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "workflow.json";
    link.click();
  }

  return (
    <Stack horizontal
      className={actionWrapperStyle}
      verticalAlign="center"
      tokens={{ childrenGap: "10px" }}
    >
      <PrimaryButton
        iconProps={AddIcon}
        text={props.addNodeLabel}
        onClick={handleAddClick}
      />

      {props.importEnabled && <DefaultButton
        iconProps={UploadIcon}
        onClick={handleUploadClick}
      />}

      {props.exportEnabled && <DefaultButton
        iconProps={DownloadIcon}
        onClick={handleDownloadClick}
      />}
    </Stack>
  )
}

export default ActionButtons;