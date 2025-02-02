import BaseApi from "../BaseApi.ts";
import {Concept, CreateConceptRequestDto, UpdateConceptRequestDto} from "../generate.api.types.ts";
import {IResponse} from "../network.types.ts";

export class ConceptApi extends BaseApi{
    constructor() {
        super(import.meta.env.VITE_API_ENDPOINT!); // BaseApi에 API 엔드포인트 전달
    }


    async getConceptList(){
        return this.request("concept",{
            method:"GET"
        })
    }

    async getConcept(conceptId:number):Promise<IResponse<Concept>>{
        return this.request(`concept/${conceptId}`,{
            method:"GET"
        })

    }

    async updateConcept(id:number,request:UpdateConceptRequestDto){
        return this.request(`concept/${id}`,{
            method:"PATCH",
            body:JSON.stringify(request)
        })
    }

    async createConcept(request:CreateConceptRequestDto){
        return this.request("concept",{
            method:"POST",
            body:JSON.stringify(request)
        })

    }


}


export const conceptApi =  new ConceptApi()
