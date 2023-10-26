import React, { useState } from "react";
import { Icon, Stack } from "@fluentui/react";
import { AddCardKanbanProps } from "./utils/Interface";

const AddCard: React.FC<AddCardKanbanProps> = (props) => {
  const [bcAddCard, setBcAddCard] = useState<string>("lightgray");

  return (
    <Stack
      verticalAlign="center"
      horizontalAlign="center"
      role="button"
      styles={{
        root: {
          width: props.columnOrientation !== "horizontal" ? "100%" : undefined,
          backgroundColor: bcAddCard,
          margin:
            props.columnOrientation === "horizontal"
              ? "0 0 0 5px"
              : "5px 0 0 0",
          padding: 5,
          cursor: "pointer",
        },
      }}
      onMouseEnter={() => setBcAddCard("gray")}
      onMouseLeave={() => setBcAddCard("lightgray")}
      onClick={props.onAddCardClick}
    >
      <Icon iconName="Add" />
    </Stack>
  );
};

export default AddCard;
