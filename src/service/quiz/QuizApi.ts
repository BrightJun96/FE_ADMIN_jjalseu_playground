import BaseApi from "../BaseApi.ts";
import {IResponse} from "../network.types.ts";
import {QuizItem, QuizListRequest} from "./types.ts";

export interface AbstractQuizApi{
    // 목록
    getQuizList(request:QuizListRequest): Promise<IResponse<QuizItem[]>>;

    // // 상세
    // getQuizDetail(id:number): Promise<IResponse<QuizItem>>;

    // // 등록
    // addQuiz<TAddRequest>(request:TAddRequest): Promise<Response>;
    //
    // // 수정
    // updateQuiz<TEditRequest>(id:number,request:TEditRequest): Promise<Response>;
    //
    // // 삭제
    // deleteQuiz(id:number): Promise<Response>;
}




class QuizApi extends BaseApi implements AbstractQuizApi{
    // 목록
    async getQuizList(request:QuizListRequest): Promise<IResponse<QuizItem[]>>{
        return this.request<QuizItem[]>("quiz", {
            method: "GET",
            queryString: request,
        });
    }

    // // 상세
    // getQuizDetail<TItemResponse>(id: number): Promise<IResponse<TItemResponse>> {
    //     return Promise.resolve(undefined);
    // }
    //
    // // 등록
    // addQuiz<TAddRequest>(request: TAddRequest): Promise<Response> {
    //     return Promise.resolve(undefined);
    // }
    //
    // // 수정
    // updateQuiz<TEditRequest>(id: number, request: TEditRequest): Promise<Response> {
    //     return Promise.resolve(undefined);
    // }
    //
    //
    // // 삭제
    // deleteQuiz(id: number): Promise<Response> {
    //     return Promise.resolve(undefined);
    // }




}

export default QuizApi;
