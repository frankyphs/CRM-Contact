import React, { useMemo, useState } from "react";
import {
  DragDropContext,
  DragStart,
  DragUpdate,
  DropResult,
  Droppable,
  DroppableProvided,
} from "@hello-pangea/dnd";
import { Stack } from "@fluentui/react";
import { CardsMap, IKanban, IColumn, IDrag } from "./utils/Interface";
import {
  generateUniqueKey,
  getCardsMap,
  isEmptyObject,
  reorderCards,
  reorderColumns,
} from "./utils/Helper";
import Column from "./Column";
import AddColumn from "./AddColumn";

const Kanban: React.FC<IKanban> = (props) => {
  // Columns
  const [defaultColumns, setDefaultColumns] = useState<IColumn[]>(
    props.defaultColumns || []
  );
  const columnsData = props.columns || defaultColumns;

  // Cards
  const initialDefaultCards: CardsMap = useMemo(() => {
    return getCardsMap(
      props.defaultColumns || [],
      props.defaultCards || [],
      props.columnsProps?.keyField || ""
    );
  }, []);
  const controlledCards: CardsMap = useMemo(() => {
    return getCardsMap(
      props.columns || [],
      props.cards || [],
      props.columnsProps?.keyField || ""
    );
  }, [props.cards, props.columns]);

  const [defaultCards, setDefaultCards] =
    useState<CardsMap>(initialDefaultCards);
  const cardsData = !isEmptyObject(defaultCards)
    ? defaultCards
    : controlledCards;

  // Handle Click
  const handleCardClick = (event: React.MouseEvent, card: any) => {
    event.stopPropagation();
    props.onCardClick?.(card);
  };

  const handleCardDoubleClick = (event: React.MouseEvent, card: any) => {
    event.stopPropagation();
    props.onCardDoubleClick?.(card);
  };

  const handleColumnClick = (event: React.MouseEvent, column: any) => {
    props.onColumnClick?.(column);
  };

  // Handle Drag
  const handleDragStart = (start: DragStart) => {
    // type show droppable location
    const { type, source } = start;

    if (type === "COLUMN") {
      const card = cardsData[source.droppableId][source.index];
      props.onCardDragStart?.(card);
    }

    if (type === "BOARD") {
      const column = columnsData[source.index];
      props.onColumnDragStart?.(column);
    }
  };

  const handleDrag = (update: DragUpdate) => {
    // type show droppable location
    const { type, source } = update;

    if (type === "COLUMN") {
      const card = cardsData[source.droppableId][source.index];
      props.onCardDrag?.(card);
    }

    if (type === "BOARD") {
      const column = columnsData[source.index];
      props.onColumnDrag?.(column);
    }
  };

  const handleDragEnd = (result: DropResult) => {
    // type show droppable location
    const { type, source, destination } = result;

    if (type === "COLUMN") {
      const newMapCards = reorderCards(result, cardsData);

      if (props.onCardDragEnd) {
        const card = cardsData[source.droppableId][source.index];
        const sourceCard: IDrag = {
          key: source.droppableId,
          index: source.index,
        };
        const destinationCard: IDrag = {
          key: destination?.droppableId || "",
          index: destination?.index || -1,
        };
        props.onCardDragEnd(newMapCards, card, sourceCard, destinationCard);
      }
      props.defaultCards && newMapCards && setDefaultCards(newMapCards);
    }

    if (type === "BOARD") {
      const newOrderColumns = reorderColumns(result, columnsData);

      if (props.onColumnDragEnd) {
        const column = columnsData[source.index];
        props.onColumnDragEnd(
          newOrderColumns,
          column,
          source.index,
          destination?.index
        );
      }
      props.defaultColumns &&
        newOrderColumns &&
        setDefaultColumns(newOrderColumns);
    }
  };

  // Handle Add Column Click
  const handleAddColumnClick = () => {
    const defaultKey = generateUniqueKey();
    const defaultNewColumn: IColumn = {
      key: `key-${defaultKey}`,
      label: `column-${defaultKey}`,
      data: {},
    };
    props.onAddColumnClick?.(
      [...columnsData, defaultNewColumn],
      defaultNewColumn
    );
    props.defaultColumns &&
      setDefaultColumns((prevColumn) => [...prevColumn, defaultNewColumn]);
    props.defaultCards &&
      setDefaultCards({ ...defaultCards, [defaultNewColumn.key]: [] });
  };

  // Handle Add Card Click
  const handleAddCardClick = (event: React.MouseEvent, column: any) => {
    if (props.defaultCards) {
      const defaultKey = generateUniqueKey();
      const defaultNewCard = {
        [props.cardsProps.keyField]: `card-${defaultKey}`,
      };

      const updatedCards = { ...cardsData };
      const cardsInColumn = updatedCards[column.key];
      cardsInColumn.push(defaultNewCard);

      updatedCards[column.key] = cardsInColumn;

      props.onAddCardClick?.(column, cardsInColumn, defaultNewCard);
      setDefaultCards(updatedCards);
    } else {
      props.onAddCardClick?.(column);
    }
  };

  return (
    <DragDropContext
      onDragStart={handleDragStart}
      onDragUpdate={handleDrag}
      onDragEnd={handleDragEnd}
    >
      <Droppable
        droppableId="board"
        type="BOARD"
        direction={
          props.columnOrientation === "horizontal" ? "vertical" : "horizontal"
        }
      >
        {(provided: DroppableProvided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <Stack
              className="board"
              tokens={{ childrenGap: 5 }}
              horizontal={
                props.columnOrientation === "horizontal" ? false : true
              }
            >
              {Object.values(columnsData).map((column, index) => (
                <Column
                  key={column.key}
                  index={index}
                  column={column}
                  cards={cardsData[column.key]}
                  columnProps={props.columnsProps}
                  cardsProps={props.cardsProps}
                  isDraggable={props.dragColumnEnabled}
                  columnOrientation={props.columnOrientation}
                  onRenderAddCardButton={props.onRenderAddCardButton}
                  onAddCardClick={handleAddCardClick}
                  onCardClick={handleCardClick}
                  onCardDoubleClick={handleCardDoubleClick}
                  onColumnClick={handleColumnClick}
                />
              ))}
              {provided.placeholder}

              {/* Add Column Button */}
              {props.addColumnEnabled ===
              false ? null : props.onRenderAddColumnButton ? (
                <div onClick={handleAddColumnClick}>
                  {props.onRenderAddColumnButton()}
                </div>
              ) : (
                <AddColumn
                  columnOrientation={props.columnOrientation}
                  onAddColumnClick={handleAddColumnClick}
                />
              )}
            </Stack>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Kanban;
