export interface CardKanbanProps {
  card: any;
  index: number;
  cardsProps?: ICardsProps;
  onCardClick?: (event: React.MouseEvent, cardItem?: any) => void;
  onCardDoubleClick?: (event: React.MouseEvent, cardItem?: any) => void;
}

export interface ColumnKanbanProps {
  cards: any[];
  index: number;
  column: IColumn;
  columnOrientation?: "vertical" | "horizontal";
  isDraggable?: boolean;
  cardsProps?: ICardsProps;
  columnProps?: IColumnsProps;
  onRenderAddCardButton?: () => JSX.Element;
  onAddCardClick?: (event: React.MouseEvent, columnItem?: IColumn) => void;
  onCardClick?: (event: React.MouseEvent, cardItem?: any) => void;
  onCardDoubleClick?: (event: React.MouseEvent, cardItem?: any) => void;
  onColumnClick?: (event: React.MouseEvent, columnItem?: IColumn) => void;
}

export interface AddColumnKanbanProps {
  columnOrientation?: string;
  onAddColumnClick?: (
    event: React.MouseEvent,
    columns?: IColumn[],
    newColumn?: IColumn
  ) => void;
}

export interface AddCardKanbanProps {
  columnOrientation?: string;
  onAddCardClick?: (event: React.MouseEvent, columnItem?: IColumn) => void;
}

/**
 * Represents a mapping of column's keyField to arrays cards.
 */
export interface CardsMap<T = any> {
  [x: string]: T[];
}

/**
 * Represents the location of a draggable item within a container.
 */
export interface IDrag {
  /**
   * The unique key that identifies the droppable item.
   */
  key: string;

  /**
   * The index of the draggable item within its container.
   */
  index: number;
}

/**
 * Represents the properties for configuring a card component.
 */
export interface ICardsProps<U = any> {
  /**
   * Defines the key field of card.
   * The card renders its layout based on this key field.
   */
  keyField: string;

  /**
   * Callbak for rendering the content of the card.
   * @param cardItem - The data associated with the card.
   * @returns The JSX element representing the card's content.
   */
  onRender?: (cardItem?: U) => JSX.Element;
}

/**
 * Represents a column configuration for a kanban board.
 */
export interface IColumn {
  /**
   * The unique key that identifies this column.
   * This key related to keyField on IColumnsProps.
   * @see IColumnsProps
   */
  key: string;

  /**
   * The display label for the column.
   */
  label: string;

  /**
   * Optional data associated with the column.
   */
  data?: any;

  /**
   * Indicates whether dropping items into this column is disabled.
   * @default false
   */
  isDropDisabled?: boolean;

  /**
   * Indicates whether card can be added in this column.
   * @default true
   */
  addCardEnabled?: boolean;

  /**
   * Indicates position of the Add New Card button
   * @default "bottom"
   */
  addCardButtonPosition?: "top" | "bottom";

  /**
   * Callback for rendering the header content of the column.
   * @param columnItem - The column-specific data.
   * @param cardItem - The card-specific data in the column.
   * @returns The JSX element representing the header.
   */
  onRenderHeader?: (cardItem?: any, columnItem?: IColumn) => JSX.Element;

  /**
   * Callback for rendering the footer content of the column.
   * @param columnItem - The column-specific data.
   * @param cardItem - The card-specific data in the column.
   * @returns The JSX element representing the footer.
   */
  onRenderFooter?: (cardItems?: any, columnItem?: IColumn) => JSX.Element;
}

/**
 * Represents the properties for configuring all columns in a kanban board.
 */
export interface IColumnsProps {
  /**
   * Defines the key field of kanban column.
   * The kanban board renders its layout based on this key field.
   */
  keyField: string;

  /**
   * Callback for rendering the header content of the column.
   * @param columnItem - The column-specific data.
   * @param cardItem - The card-specific data in the column.
   * @returns The JSX element representing the header.
   */
  onRenderHeader?: (cardItem?: any, columnItem?: IColumn) => JSX.Element;

  /**
   * Callback for rendering the footer content of the column.
   * @param columnItem - The column-specific data.
   * @param cardItem - The card-specific data in the column.
   * @returns The JSX element representing the footer.
   */
  onRenderFooter?: (cardItem?: any, columnItem?: IColumn) => JSX.Element;
}

/**
 * Represents the configuration options for a kanban board component.
 * T represent the card type.
 * U represent the IcardsProps type
 */
export interface IKanban<T = any, U = any> {
  /**
   * An array of default columns to initialize the board.
   */
  defaultColumns?: IColumn[];

  /**
   * An array of default cards to initialize the board.
   */
  defaultCards?: T[];

  /**
   * An array of columns for the board.
   */
  columns?: IColumn[];

  /**
   * An array of cards for the board.
   */
  cards?: T[];

  /**
   * Configuration properties for columns in the board.
   */
  columnsProps: IColumnsProps;

  /**
   * Configuration properties for cards in the board.
   */
  cardsProps: ICardsProps<U>;

  /**
   * The orientation of columns: "vertical" or "horizontal".
   * @default "vertical"
   */
  columnOrientation?: "vertical" | "horizontal";

  /**
   * Indicates whether columns can be dragged and rearranged.
   * @default true
   */
  dragColumnEnabled?: boolean;

  /**
   * Indicates whether adding a new column is enabled for the kanban board.
   * @default true
   */
  addColumnEnabled?: boolean;

  /**
   * Callback for rendering a custom "Add Column" button for thie kanban Board.
   * @returns The JSX element representing the custom "Add Column" button.
   */
  onRenderAddColumnButton?: () => JSX.Element;

  /**
   * Callback function when a button add column is clicked.
   * @param newColumns - New columns after adding a new default column.
   * @param newColumn - New default column added.
   */
  onAddColumnClick?: (newColumns?: IColumn[], newColumn?: IColumn) => void;

  /**
   * Callback for rendering a custom "Add Card" button for all columns.
   * @returns The JSX element representing the custom "Add Column" button.
   */
  onRenderAddCardButton?: () => JSX.Element;

  /**
   * Callback function when a button add card is clicked.
   * @param column - The column where the card is being added.
   * @param newCards - An array of cards after adding new one.
   * @param newCardItem - New card added.
   */
  onAddCardClick?: (column?: IColumn, newCards?: T[], newCardItem?: T) => void;

  /**
   * Callback function when a card is clicked.
   * @param cardItem - The clicked card.
   */
  onCardClick?: (cardItem?: T) => void;

  /**
   * Callback function when a card is double-clicked.
   * @param cardItem - The double-clicked card.
   */
  onCardDoubleClick?: (cardItem?: T) => void;

  /**
   * Callback function when a card drag operation starts.
   * @param cardItem - The card being dragged.
   */
  onCardDragStart?: (cardItem?: T) => void;

  /**
   * Callback function while a card is being dragged.
   * @param cardItem - The card being dragged.
   */
  onCardDrag?: (cardItem?: T) => void;

  /**
   * Callback function when a card drag operation ends.
   * @param cardsMap - The card with new order after dragging process.
   * @param cardItem - The card being dragged.
   * @param source - The source location of the card.
   * @param destination - The destination location of the card.
   */
  onCardDragEnd?: (
    cardsMap?: CardsMap,
    cardItem?: T,
    source?: IDrag,
    destination?: IDrag
  ) => void;

  /**
   * Callback function when a column is clicked.
   * @param columnItem - The clicked column.
   */
  onColumnClick?: (columnItem?: IColumn) => void;

  /**
   * Callback function when a column drag operation starts.
   * @param columnItem - The column being dragged.
   */
  onColumnDragStart?: (columnItem?: IColumn) => void;

  /**
   * Callback function while a column is being dragged.
   * @param columnItem - The column being dragged.
   */
  onColumnDrag?: (columnItem?: IColumn) => void;

  /**
   * Callback function when a column drag operation ends.
   * @param columns - The column with new order after dragging process.
   * @param columnItem - The column being dragged.
   * @param source - The source location of the column.
   * @param destination - The destination location of the column.
   */
  onColumnDragEnd?: (
    columns?: IColumn[],
    columnItem?: IColumn,
    sourceIndex?: number,
    destinationIndex?: number
  ) => void;
}
