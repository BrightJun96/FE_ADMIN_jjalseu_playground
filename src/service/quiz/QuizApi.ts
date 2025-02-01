import BaseApi from "../BaseApi.ts";
import {
    CreateQuizRequestDto,
    GetQuizListResponseDto,
    GetQuizSharedDto,
    UpdateQuizRequestDto
} from "../generate.api.types.ts";
import {IResponse} from "../network.types.ts";
import {QuizListRequest} from "./types.ts";

// 퀴즈 API 추상화 인터페이스
export interface AbstractQuizApi{
    // 목록
    getQuizList(request:QuizListRequest): Promise<IResponse<GetQuizListResponseDto>>;

    // // 상세
    getQuizDetail(id:number): Promise<IResponse<GetQuizSharedDto>>;

    // 등록
    addQuiz(request:CreateQuizRequestDto): Promise<IResponse<null>>;

    // 수정
    updateQuiz(id:number,request:UpdateQuizRequestDto): Promise<IResponse<null>>;

    // 삭제
    deleteQuiz(id:number):  Promise<IResponse<null>>;
}

// 퀴즈 API
class QuizApi extends BaseApi implements AbstractQuizApi{

    constructor() {
        super(import.meta.env.VITE_API_ENDPOINT!); // BaseApi에 API 엔드포인트 전달
    }
    // 목록
    async getQuizList(request?:QuizListRequest): Promise<IResponse<GetQuizListResponseDto>>{
        return this.request<GetQuizListResponseDto>("quiz", {
            method: "GET",
            queryString: request
        });
    }

    // // 상세
    getQuizDetail(id: number): Promise<IResponse<GetQuizSharedDto>> {
        return this.request<GetQuizSharedDto>(`quiz/${id}`, {
            method: "GET",
        })
    }

    // 등록
    addQuiz(request: CreateQuizRequestDto): Promise<IResponse<null>> {
        return this.request<null>("quiz", {
            method: "POST",
            body: JSON.stringify(request)
        })
    }

    // 수정
    updateQuiz(id: number, request: UpdateQuizRequestDto): Promise<IResponse<null>> {
        return this.request<null>(`quiz/${id}`, {
            method: "PATCH",
            body: JSON.stringify(request)
        })
    }

    // 삭제
    deleteQuiz(id: number):  Promise<IResponse<null>>{
        return this.request<null>(`quiz/${id}`, {
            method: "DELETE"
        })
    }


}

const quizApi = new QuizApi();

export default quizApi;
