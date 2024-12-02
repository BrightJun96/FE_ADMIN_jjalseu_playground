import 'react-data-grid/lib/styles.css';

import DataGrid, {CellClickArgs, SortColumn} from 'react-data-grid';
import useSortColumn from "./sort/useSortColumn.ts";

export interface TableColumn{
    key: string;
    name: string;
    sortable?:boolean;
}

export interface TableRow{
    [key: string]: any;
}

interface CustomTableProps {
    columns: TableColumn[];
    rows:TableRow[];
    handleSortChange?: (sortColumns: SortColumn[]) => void;
    handleCellClick?: (params:CellClickArgs<TableRow>) => void;
}

function CustomTable({
    columns,
    rows,
                         handleSortChange,
    handleCellClick
                     }:CustomTableProps) {


    const {sortColumns,onSortColumnsChange}  = useSortColumn(handleSortChange)

    // 셀 클릭
    function onCellClick(params:CellClickArgs<TableRow>){
        if(handleCellClick){
            handleCellClick(params)
        }
    }
    return (
        <DataGrid
            defaultColumnOptions={{ width: '1fr' }}
            sortColumns={sortColumns}
            onCellClick={onCellClick}
            onSortColumnsChange={onSortColumnsChange}
        columns={columns}
        rows={rows}
        />
    );
}

export default CustomTable;
