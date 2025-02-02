import {CellClickArgs} from "react-data-grid";
import {useNavigate} from "react-router-dom";
import {useQueryConceptList} from "../../../service/concept/concept.query.ts";
import PrimaryButton from "../../../ui/button/primaryButton.tsx";
import CustomTable, {TableRow} from "../../../ui/table/customTable.tsx";
import Title from "../../../ui/title/Title.tsx";
import {ConceptListTableColumnConstant} from "./constant/concept-list-table-column.constant.ts";

function ConceptListPage() {

    const {data:conceptList} = useQueryConceptList()
    const navigate = useNavigate()



    function handleCellClick(params:CellClickArgs<TableRow>){
        navigate(`/concept/${params.row.id}`)
    }

    console.log("conceptList:",conceptList)
    return (
        <div className={"w-full"}>
            <Title>개념 목록</Title>
            <PrimaryButton color={"primary"} onClick={() => navigate("/concept/register")}>
                개념 생성
            </PrimaryButton>
            <CustomTable
                columns={ConceptListTableColumnConstant}
                rows={conceptList?.data ?? []}
                handleCellClick={handleCellClick}

            />
        </div>
    );
}

export default ConceptListPage;
