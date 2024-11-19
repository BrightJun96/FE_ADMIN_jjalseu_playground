// fetch option 타입 확장
export interface CustomRequestInit extends RequestInit {
    queryString?:(string[][] | Record<string, string> | string | URLSearchParams)
    // 인증이 필요한지에 대한 파라미터
    auth?: boolean;
}

// 응답 타입
export interface IResponse<T>{
    data:T;
}



