import React from "react";
import { Label, Stack } from "@fluentui/react";
import {
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "@hello-pangea/dnd";
import { ColumnKanbanProps } from "./utils/Interface";
import Card from "./Card";
import AddCard from "./AddCard";

const Column: React.FC<ColumnKanbanProps> = (props) => {
  return (
    <Draggable
      draggableId={props.column.key}
      index={props.index}
      isDragDisabled={props.isDraggable === false ? true : false}
    >
      {(provided: DraggableProvided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="column"
          style={{
            ...provided.draggableProps.style,
            padding: 5,
            border: "2px solid #454545",
            backgroundColor: "white",
          }}
          onClick={(e) => props.onColumnClick?.(e, props.column)}
        >
          <Stack
            horizontal={props.columnOrientation === "horizontal"}
            tokens={{ childrenGap: 5 }}
          >
            {/* Header Column */}
            <Stack
              {...provided.dragHandleProps}
              className="column-header"
              verticalAlign="center"
              horizontalAlign="center"
              style={{
                border: "2px solid #454545",
                minHeight:
                  props.columnOrientation === "horizontal" ? "100%" : "auto",
                backgroundColor: "white",
                minWidth: 250,
                maxWidth:
                  props.columnOrientation === "horizontal" ? 100 : undefined,
              }}
            >
              {props.column.onRenderHeader ? (
                props.column.onRenderHeader(props.cards, props.column)
              ) : props.columnProps?.onRenderHeader ? (
                props.columnProps?.onRenderHeader?.(props.cards, props.column)
              ) : (
                <Label
                  styles={{
                    root: {
                      width: 250,
                      wordWrap: "break-word",
                      textAlign: "center",
                    },
                  }}
                >
                  {props.column.label}
                </Label>
              )}
            </Stack>

            {/* Droppable Area */}
            <Droppable
              droppableId={props.column.key}
              type="COLUMN"
              direction={props.columnOrientation}
              isDropDisabled={props.column.isDropDisabled}
            >
              {(
                provided: DroppableProvided,
                snapshot: DroppableStateSnapshot
              ) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    order: props.column.addCardButtonPosition === "top" ? 1 : 0,
                  }}
                >
                  <Stack
                    className="card-list"
                    tokens={{ childrenGap: 5 }}
                    horizontal={
                      props.columnOrientation === "horizontal" ? true : false
                    }
                    styles={{
                      root: {
                        border: "2px solid #454545",
                        backgroundColor: snapshot.isDraggingOver
                          ? "#dddddd"
                          : "none",
                        minHeight: 100,
                        minWidth: 250,
                        padding: 5,
                      },
                    }}
                  >
                    {/* <Stack.Item grow> */}
                    {props.cards?.map((card, index) => (
                      <Card
                        key={card[props.cardsProps?.keyField as string]}
                        index={index}
                        card={card}
                        cardsProps={props.cardsProps}
                        onCardClick={props.onCardClick}
                        onCardDoubleClick={props.onCardDoubleClick}
                      />
                    ))}
                    {provided.placeholder}
                    {/* </Stack.Item> */}
                  </Stack>
                </div>
              )}
            </Droppable>

            {/* Add Card Button */}
            {props.column.addCardEnabled ===
            false ? null : props.onRenderAddCardButton ? (
              <div onClick={(e) => props.onAddCardClick?.(e, props.column)}>
                {props.onRenderAddCardButton()}
              </div>
            ) : (
              <AddCard
                columnOrientation={props.columnOrientation}
                onAddCardClick={(e) => props.onAddCardClick?.(e, props.column)}
              />
            )}

            {/* Column Footer */}
            <div
              style={{
                order: props.column.addCardButtonPosition === "top" ? 1 : 0,
              }}
            >
              {props.column.onRenderFooter
                ? props.column.onRenderFooter(props.cards, props.column)
                : props.columnProps?.onRenderFooter?.(
                    props.cards,
                    props.column
                  )}
            </div>
          </Stack>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
