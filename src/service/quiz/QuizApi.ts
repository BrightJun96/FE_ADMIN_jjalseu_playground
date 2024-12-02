import BaseApi from "../BaseApi.ts";
import {IResponse} from "../network.types.ts";
import {QuizForm, QuizItem, QuizListRequest} from "./types.ts";

// 퀴즈 API 추상화 인터페이스
export interface AbstractQuizApi{
    // 목록
    getQuizList(request:QuizListRequest): Promise<IResponse<{quizList: QuizItem[] }>>;

    // // 상세
    getQuizDetail(id:number): Promise<IResponse<QuizItem>>;

    // 등록
    addQuiz(request:QuizForm): Promise<IResponse<null>>;

    // 수정
    updateQuiz(id:number,request:QuizForm): Promise<IResponse<null>>;

    // 삭제
    deleteQuiz(id:number):  Promise<IResponse<null>>;
}

// 퀴즈 API
class QuizApi extends BaseApi implements AbstractQuizApi{

    constructor() {
        super(import.meta.env.VITE_API_ENDPOINT!); // BaseApi에 API 엔드포인트 전달
    }
    // 목록
    async getQuizList(request?:QuizListRequest): Promise<IResponse<{quizList: QuizItem[] }>>{
        return this.request<QuizItem[]>("quiz/list", {
            method: "GET",
            queryString: request
        });
    }

    // // 상세
    getQuizDetail(id: number): Promise<IResponse<QuizItem>> {
        return this.request<QuizItem>(`quiz/${id}`, {
            method: "GET",
        })
    }

    // 등록
    addQuiz(request: QuizForm): Promise<IResponse<null>> {
        return this.request<null>("quiz", {
            method: "POST",
            body: JSON.stringify(request)
        })
    }

    // 수정
    updateQuiz(id: number, request: QuizForm): Promise<IResponse<null>> {
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
