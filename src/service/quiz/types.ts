// 퀴즈 목록 요청 타입

import {GetQuizMetaDataSharedDto, GetQuizMultipleChoiceSharedDto} from "../generate.api.types.ts";

export interface QuizListRequest extends Record<string, string> {
  field: string;
  lang: string;
}

// 객관식 컨텐츠 타입
export interface MultipleChoiceContent{
    multipleChoiceId:number;
    content:string;
    quizId:number;
    number:number;
}

// 퀴즈 종류 타입
export type QuizType = "MULTIPLE_CHOICE" | "SUBJECTIVE";



// 퀴즈 응답 타입
export interface QuizItem {
    quizId: number;
    title: string;
    content: string;
    multipleChoiceAnswer: number[];
    subjectiveAnswer: string;
    type: QuizType;
    hint: string;
    explanation: string;
    field: string;
    level: number;
    lang: string;
    time: number;
    multipleChoiceContents:MultipleChoiceContent[]
    metaTitle:string;
    metaDescription:string;
    metaImageUrl:string|null;
    createdAt: string;
    updatedAt: string;
    detailUrl:string // 상세 URL
}


// 퀴즈 요청 타입 & 퀴즈 폼 타입
export interface IQuizForm{
    title:string, // 퀴즈 제목
    content:string, // 퀴즈 내용
    explanation:string,// 해설
    field:string,// 분야
    multipleChoiceContents:GetQuizMultipleChoiceSharedDto[] //객관식 컨텐츠
    detailUrl:string // 상세 URL
    answer:number // 정답
    quizMetaData:Omit<GetQuizMetaDataSharedDto,"id">
}


// QuizForm keys
export type QuizFormKey = keyof IQuizForm;
