// 퀴즈 목록 요청 타입
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
    multipleChoices:MultipleChoiceContent[]
    metaTitle:string;
    metaDescription:string;
    metaImageUrl:string|null;
    createdAt: string;
    updatedAt: string;
    detailUrl:string // 상세 URL
}


// 퀴즈 요청 타입 & 퀴즈 폼 타입
export interface QuizForm{
    title:string, // 퀴즈 제목
    content:string, // 퀴즈 내용
    subjectiveAnswer:string, // 주관식 답안
    multipleChoiceAnswer:number[], // 객관식 답안
    hint:string,// 힌트
    explanation:string,// 해설
    type:QuizType,// 퀴즈 종류
    field:string,// 분야
    lang:string, // 언어
    level:number, // 난이도
    isMultiple:boolean,// 객관식일 경우 중복 선택 여부
    time:number, // 시간
    multipleChoiceContents:string[] //객관식 컨텐츠
    metaTitle:string, // 제목
    metaDescription:string, // 설명
    metaImageUrl:string // 이미지 URL
    detailUrl:string // 상세 URL
}


// QuizForm keys
export type QuizFormKey = keyof QuizForm;
