import {
  TableColumnDefinition,
  TableColumnSizingOptions,
  createTableColumn,
} from "@fluentui/react-components";
import { ITableV9, ITableV9Column } from "./Interface";
import { useMemo } from "react";

export const CreateColumnHeader = (defaultColumns: ITableV9Column[]) =>
  useMemo(() => {
    const columns: TableColumnDefinition<any>[] = [];

    defaultColumns.forEach((column: ITableV9Column) => {
      columns.push(
        createTableColumn({
          columnId: column.key,
          compare: column.compare,
        })
      );
    });

    return columns;
  }, [defaultColumns]);

export const GetTableColumnSizingOptions = (
  columns: ITableV9Column[]
): TableColumnSizingOptions => {
  const columnSizingOptions: TableColumnSizingOptions = {};
  columns.forEach((column) => {
    columnSizingOptions[column.key] = {
      idealWidth: column.width,
      minWidth: column.minWidth,
    };
  });

  return columnSizingOptions;
};

export const Reorder = <T>(
  list: T[],
  sourceIndex: number,
  destinationIndex: number
): T[] => {
  const result = [...list];
  const [removed] = result.splice(sourceIndex, 1);
  result.splice(destinationIndex, 0, removed);

  return result;
};

export const TitleCase = (
  str: string,
  charJoin?: string,
  splitChar?: string
) => {
  const strSlice = str.toLowerCase().split(splitChar || " ");
  const stringJoin = charJoin || " ";

  const final: string[] = [];

  for (const word of strSlice) {
    final.push(word.charAt(0).toUpperCase() + word.slice(1));
  }

  return final.join(stringJoin);
};

export const GetColumnKeyShow = (column: ITableV9Column[]): string[] =>
  useMemo(() => {
    return column.filter((obj) => !obj.hidden).map((obj) => obj.label);
  }, [column]);

export const GetColumnKeyHidden = (column: ITableV9Column[]): string[] =>
  useMemo(() => {
    return column.filter((obj) => obj.hidden).map((obj) => obj.label);
  }, [column]);

export const ShowSettingButton = (props: ITableV9) => {
  return (
    props.menuShowColumnEnabled ||
    props.menuGroupDataSourceEnabled ||
    props.menuAddColumnEnabled
  );
};

export const GetGroupItems = (dataSource: any[], field: string) => {
  const groupItems = dataSource.reduce((result: any[], item: any) => {
    if (!result.includes(item[field])) {
      result.push(item[field]);
    }
    return result;
  }, []);
  return groupItems;
};

export const GenerateUniqueID = () => {
  return Math.random().toString(16).slice(2);
};
