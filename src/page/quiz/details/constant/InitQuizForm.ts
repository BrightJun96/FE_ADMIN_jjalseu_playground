// 초기값
import {QuizForm, QuizType} from "../../../../service/quiz/types.ts";
import FIELD_OPTIONS from "./FieldOptions.ts";
import LANGUAGE_OPTIONS from "./LanguageOptions.ts";
import TYPE_OPTIONS from "./TypeOptions.ts";

const initialQuizForm:QuizForm={
    title:"", // 퀴즈 제목
    content:"", // 퀴즈 내용
    subjectiveAnswer:"", // 주관식 답안
    multipleChoiceAnswer:[], // 객관식 답안
    hint:"",
    explanation:"",
    type:TYPE_OPTIONS[0].value as QuizType,
    field: FIELD_OPTIONS[0].value,
    lang:LANGUAGE_OPTIONS[0].value,
    level:1,
    isMultiple:false,
    time:0,
    multipleChoiceContents:["","","","",""], // 객관식 선택지
    // 메타데이터
    metaTitle:"", // 제목
    metaDescription:"", // 설명
    metaImageUrl:"" ,// 이미지 URL
    detailUrl:"" // 상세 URL
}

export default initialQuizForm
