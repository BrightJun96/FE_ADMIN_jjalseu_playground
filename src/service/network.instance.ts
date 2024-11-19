import {CustomRequestInit} from "./network.types.ts";


export const API_URL = "http://localhost:8080";




async function networkInstance(endpoint: string, options?: CustomRequestInit):Promise<Response>{

    const processedEndpoint = options?.queryString && Object.keys(options.queryString).length > 0 ? `${endpoint}?${new URLSearchParams(options.queryString).toString()}` : endpoint;


    if(options){
        options.headers={
            ...options.headers,
            'Content-Type': 'application/json',
        }
    }
    return await fetch(`${API_URL}/${processedEndpoint}`,options);
}

export default networkInstance;
