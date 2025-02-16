import {Cookies} from "react-cookie";
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

            if(!accessToken || !refreshToken) {
                window.location.href="/"

            }

            if(accessToken){

                headers.Authorization=  `Bearer ${accessToken}`

            }

            if(refreshToken){

                // await authAPI.reissueACT()


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

                window.location.href="/"

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




}

export default BaseApi;
