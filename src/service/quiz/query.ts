import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import QuizQueryKey from "./query.key.ts";
import quizApi from "./QuizApi.ts";
import {IQuizForm} from "./types.ts";

// 퀴즈 목록 조회
export function useQueryQuizList() {
    return useQuery({
        queryKey:[ QuizQueryKey.LIST],
        queryFn: () => quizApi.getQuizList(),
    })
}


// 퀴즈 상세 조회
export function useQueryQuizDetail(id:number) {
    return useQuery({
        queryKey:[ QuizQueryKey.DETAIL, id],
        queryFn: () => quizApi.getQuizDetail(id),
    })
}

// 퀴즈 등록
export function useMutationAddQuiz() {
    const queryClient = useQueryClient()
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (variables:IQuizForm) =>  quizApi.addQuiz(variables),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QuizQueryKey.LIST] })
            navigate(`/quiz/list`)

        },
        onError:(error)=>{
            if(error) {
                console.log(error)
            }
        }
    })
}

// 퀴즈 수정
export function useMutationUpdateQuiz() {
    const queryClient = useQueryClient()
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (variables:{
            id:number,
            request:IQuizForm
        })=>quizApi.updateQuiz(variables.id,variables.request),
        onSuccess: (_,variables) => {
            queryClient.invalidateQueries({ queryKey: [QuizQueryKey.LIST] })
            queryClient.invalidateQueries({ queryKey: [QuizQueryKey.DETAIL,variables.id] })
            navigate(`/quiz/list`)
        },
        onError:(error) =>{
            if(error) {
                console.log(error)
            }
        }
    })
}


// 퀴즈 삭제
export function useMutationDeleteQuiz() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: quizApi.deleteQuiz,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QuizQueryKey.LIST] })
        },
        onError:(error)=>{
            if(error) {
                console.log(error)
            }
        }
    })
}
