import {TableColumn} from "../../../../ui/table/customTable.tsx";

// 퀴즈 목록 테이블 컬럼
 const QuizListColumn:TableColumn[]=[
    {
        key:"title",
        name:"제목"
    },
    {
        key:"field",
        name:"분야"
    },
    {
        key:"createdAt",
        name:"생성일"
    },
    {
        key:"updatedAt",
        name:"수정일"
    }
]

export default QuizListColumn;
