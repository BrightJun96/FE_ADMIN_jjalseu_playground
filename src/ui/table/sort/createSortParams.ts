import {SortColumn, SortDirection} from "react-data-grid";

// 정렬 로직 추출
export function createSortParams(sortColumns: SortColumn[]): { columnKey: string, direction: SortDirection } {
    const { columnKey, direction } = sortColumns[0];
    return { columnKey, direction };
}
