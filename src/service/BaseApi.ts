import {Cookies} from "react-cookie";
import {ReissueACTResponse} from "./auth/auth.api.ts";
import {CustomRequestInit, IResponse, QueryString} from "./network.types.ts";

abstract class BaseApi{

    protected readonly cookies: Cookies; // 쿠키 인스턴스 추가
    private readonly baseUrl: string;

    protected constructor(baseUrl: string) {
        if (!baseUrl) {
            throw new Error("API 엔드포인트가 필요합니다.");
        }
        this.baseUrl = baseUrl;
        this.cookies = new Cookies(); // Cookies 인스턴스 생성

    }

    protected async request<T=unknown,>(endpoint: string, options?: CustomRequestInit):Promise<IResponse<T>>{

        try {
            const headers : any = {
                ...this.getDefaultHeaders(),
                ...options?.headers,
            };

            const accessToken = this.getAuthToken("access")
            const refreshToken  = this.getAuthToken("refresh")



            if(accessToken){

                headers.Authorization=  `Bearer ${accessToken}`

            }





            const processedEndpoint = options?.queryString
                ? `${endpoint}?${this.buildQueryString(options.queryString)}`
                : endpoint;

            const response = await fetch(`${this.baseUrl}/${processedEndpoint}`, {
                credentials: "include",
                headers
                , ...options
            });




            if(response.status===401){

                // refreshToken이 있다면 refreshToken을 통해 accessToken 재발급
                if(refreshToken){

                    await this.reissueACT()

                }else{
                    window.location.href="/"
                }



            }

            if (!response.ok) {
                await this.handleErrorResponse(response);
            }

            return response.json() ;

        }
        catch (error) {
            console.error("API 요청 중 에러 발생:", error);
            throw error;
        }

    }

    private async handleErrorResponse(response: Response): Promise<void> {
        const errorDetails = await response.text();
        throw new Error(
            `Network error: ${response.status} - ${response.statusText}. Details: ${errorDetails}`
        );
    }

    private buildQueryString(query: QueryString): string {
        return Object.entries(query)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
    }

    private getDefaultHeaders(): Record<string, string> {
        return {
            'Content-Type': 'application/json',
        };
    }

    private getAuthToken(tokenType:"access"|"refresh") : string|undefined{
        return tokenType==="access"? this.cookies.get("access_token"):this.cookies.get("refresh_token")
    }

    private async reissueACT(){
        try {
            const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/auth/reissue-accessToken`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${this.cookies.get("refresh_token")}`
                }
            })

            console.log("response :",response)

            const reissueResponse: IResponse<ReissueACTResponse> =await response.json()
            this.cookies.set("access_token",reissueResponse.data.accessToken)

        }catch (e) {
            window.location.href="/"

        }
    }




}

export default BaseApi;
