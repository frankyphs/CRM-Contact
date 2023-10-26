import { DraggableLocation, DropResult } from "@hello-pangea/dnd";
import { CardsMap, IColumn } from "./Interface";

export const getCardsMap = (
  columns: IColumn[],
  cards: any[],
  key: string
): CardsMap => {
  const cardsMap: CardsMap = {};
  columns.forEach((column) => {
    cardsMap[column.key] = [];
  });

  cards.forEach((card) => {
    if (cardsMap[card[key]]) {
      cardsMap[card[key]].push(card);
    }
  });

  return cardsMap;
};

export const reorder = <T>(
  list: T[],
  sourceIndex: number,
  destinationIndex: number
): T[] => {
  const result = [...list];
  const [removed] = result.splice(sourceIndex, 1);
  result.splice(destinationIndex, 0, removed);

  return result;
};

export const reorderCardsMap = (
  cardsData: CardsMap,
  source: DraggableLocation,
  destination: DraggableLocation
) => {
  const newCardsData = { ...cardsData };

  // Moving card within column
  if (source.droppableId === destination.droppableId) {
    newCardsData[source.droppableId] = reorder(
      cardsData[source.droppableId],
      source.index,
      destination.index
    );
    return newCardsData;
  }

  // Moving card across column
  const sourceColumnCards = [...cardsData[source.droppableId]];
  const destinationColumnCards = [...cardsData[destination.droppableId]];

  const [movedCard] = sourceColumnCards.splice(source.index, 1);
  destinationColumnCards.splice(destination.index, 0, movedCard);

  newCardsData[source.droppableId] = sourceColumnCards;
  newCardsData[destination.droppableId] = destinationColumnCards;

  return newCardsData;
};

export const reorderColumns = (result: DropResult, columnsData: IColumn[]) => {
  const { source, destination } = result;
  if (!destination) return;
  return reorder(columnsData, source.index, destination.index);
};

export const reorderCards = (result: DropResult, cardsData: CardsMap) => {
  const { source, destination } = result;
  if (!destination) return;
  return reorderCardsMap(cardsData, source, destination);
};

export const isEmptyObject = (obj: any) =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

export const generateUniqueKey = () => {
  return Math.random().toString(16).slice(2);
};
