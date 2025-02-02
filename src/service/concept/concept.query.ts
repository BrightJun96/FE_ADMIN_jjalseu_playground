// 개념 목록 조회
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {Concept, CreateConceptRequestDto, UpdateConceptRequestDto} from "../generate.api.types.ts";
import {IResponse} from "../network.types.ts";
import QueryKey from "../query.key.ts";
import {conceptApi} from "./concept.api.ts";


// 목록
export function useQueryConceptList(){

    return useQuery({
        queryKey:[QueryKey.Concept.LIST],
        queryFn:() => conceptApi.getConceptList()
    })
}

// 상세
export function useQueryConcept(conceptId:number){

    return useQuery<IResponse<Concept>>({
        queryKey:[QueryKey.Concept.DETAIL,conceptId],
        queryFn:() => conceptApi.getConcept(conceptId)
    })
}


// 수정
export function useMutationUpdateConcept(){
    const queryClient = useQueryClient()
    const navigate = useNavigate();

    return useMutation({
        mutationFn:({id,request}:{
            id:number,
            request:UpdateConceptRequestDto
        }) => conceptApi.updateConcept(id,request),
        onSuccess:(_,{id}) =>{
            queryClient.invalidateQueries({ queryKey: [QueryKey.Concept.LIST] })
            queryClient.invalidateQueries({ queryKey: [QueryKey.Concept.DETAIL,id] })
            navigate(`/concept/list`)
        },
        onError:(error) =>{
            if(error) {
                console.log(error)
            }
        }
    })




}


// 등록
export function useMutationCreateConcept(){
    const queryClient = useQueryClient()
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (variables:CreateConceptRequestDto) =>  conceptApi.createConcept(variables),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKey.Concept.LIST] })
            navigate(`/concept/list`)

        },
        onError:(error)=>{
            if(error) {
                console.log(error)
            }
        }
    })

}
