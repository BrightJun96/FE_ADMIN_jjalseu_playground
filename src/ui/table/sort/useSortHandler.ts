import {SortColumn} from "react-data-grid";
import {useSearchParams} from "react-router-dom";
import {Direction} from "../../../type/feature/todo/types.ts";
import {createSortParams} from "./createSortParams.ts";


interface UseSortHandlerOptions {
    sortKey?: string;
    orderKey?: string;
}

export function useSortHandler({ sortKey = 'sort', orderKey = 'order' }: UseSortHandlerOptions = {}) {
    const [_, setSearchParams] = useSearchParams();

    return (sortColumns: SortColumn[]) => {
        
        const { columnKey, direction } = createSortParams(sortColumns);
        setSearchParams({
            [sortKey]: columnKey,
            [orderKey]:Direction[direction]
        })

    };
}
