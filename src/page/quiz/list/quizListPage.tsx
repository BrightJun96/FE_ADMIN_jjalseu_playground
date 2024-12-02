import {useQueryQuizList} from "../../../service/quiz/query.ts";
import CustomTable from "../../../ui/table/customTable.tsx";
import quizListTableColumn from "./constant/quizListTableColumn.ts";

// 퀴즈 목록 페이지
function QuizListPage() {

    const {data:quizList} = useQueryQuizList()

    console.log("quizList :",quizList)

    return (
        <div >
            <CustomTable columns={quizListTableColumn} rows={quizList?.data?.quizList??[]}/>

        </div>
    );
}

export default QuizListPage;
