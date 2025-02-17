import BaseApi from "../BaseApi.ts";
import {IResponse} from "../network.types.ts";

export interface Auth {
    id:string;
    pw:string;
}

export interface LoginResponse {
    accessToken:string
    refreshToken:string
}


function encodeBase64 (text:string)  {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    return btoa(String.fromCharCode(...data));
}

class AuthApi extends BaseApi{


    constructor() {
        super(import.meta.env.VITE_API_ENDPOINT!); // BaseApi에 API 엔드포인트 전달
    }

    async login(auth:Auth) : Promise<IResponse<LoginResponse> | undefined>{

        const basic = `${auth.id}:${auth.pw}`;
        const toBase64 =
            encodeBase64(basic)

        const BasicToken = `Basic ${toBase64}`;

        try {
            return await this.request<LoginResponse>("auth/login", {
                method: "POST",
                headers: {
                    Authorization: BasicToken,
                },
            },)
        }
        catch (e) {
            console.log( "login Error",e )
            alert("잘못된 계정정보입니다. 관리자에게 승인요청하세요.")
            return

        }




    }

    async reissueACT(){


        await this.request("reissue-accessToken",{
            method:"POST",
            headers:{
                Authorization :""
            }
        })
    }

    private getRctToken(){

        return this.cookies.get("refresh_token")
    }

}


export const authAPI =new AuthApi()
