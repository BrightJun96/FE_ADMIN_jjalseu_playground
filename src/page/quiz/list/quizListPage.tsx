import {CellClickArgs} from "react-data-grid";
import {useNavigate} from "react-router-dom";
import {useQueryQuizList} from "../../../service/quiz/query.ts";
import PrimaryButton from "../../../ui/button/primaryButton.tsx";
import CustomTable, {TableRow} from "../../../ui/table/customTable.tsx";
import Title from "../../../ui/title/Title.tsx";
import quizListTableColumn from "./constant/quizListTableColumn.ts";

// 퀴즈 목록 페이지
function QuizListPage() {

    const {data:quizList} = useQueryQuizList()
    const navigate = useNavigate()

    function handleCellClick(params:CellClickArgs<TableRow>){
        navigate(`/quiz/${params.row.quizId}`)
    }

    return (
        <div className={"w-full"}>
            <Title>퀴즈 목록</Title>
            <PrimaryButton color={"primary"} onClick={()=>navigate("/quiz/register")}>
                퀴즈 생성
            </PrimaryButton>
            <CustomTable
                columns={quizListTableColumn}
                rows={quizList?.data?.quizList??[]}
                handleCellClick={handleCellClick}

            />

        </div>
    );
}

export default QuizListPage;
