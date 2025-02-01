// 초기값
import {IQuizForm} from "../../../../service/quiz/types.ts";
import FIELD_OPTIONS from "./FieldOptions.ts";

const initialQuizForm:IQuizForm={
    title:"", // 퀴즈 제목
    content:"", // 퀴즈 내용
    answer:1,
    explanation:"",
    field: FIELD_OPTIONS[0].value,
    multipleChoiceContents:[
        {id:1,content:""},
        {id:2,content:""},
        {id:3,content:""},
        {id:4,content:""}
    ], // 객관식 선택지
    detailUrl:"" ,// 상세 URL
    // 메타데이터
    quizMetaData:{
        seoMetaTitle:"",
        seoMetaDescription:"",
        metaImageUrl:""
    }
}

export default initialQuizForm
