import {useCallback, useState} from 'react';
import {SortColumn} from "react-data-grid";
import {ArrayUtils} from "../../../helper/class/ArrayUtils.ts";

function useSortColumn(handleSortChange?: (sortColumns: SortColumn[]) => void) {

    const [sortColumns, setSortColumns] = useState<SortColumn[]>([]);

    const onSortColumnsChange = useCallback((sortColumns: SortColumn[]) => {
        if(ArrayUtils.isEmpty<SortColumn>(sortColumns)) return

        if (handleSortChange) {
            handleSortChange(sortColumns);
        }
        setSortColumns(sortColumns.slice(-1));
    }, []);
    return {sortColumns,onSortColumnsChange}
}

export default useSortColumn;
