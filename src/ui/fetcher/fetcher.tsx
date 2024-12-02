import {UseQueryResult} from "@tanstack/react-query";
import React, {ReactElement} from "react";
import ErrorMessage from "../error/errorMessage.tsx";
import Loading from "../loading/loading.tsx";

interface FetcherProps {
    children: ReactElement;
    query: (params?:any) => UseQueryResult<any, Error>;
    params?:any
}

function Fetcher({children,query,params}:FetcherProps) {

    const {
        error,
        isLoading,

    } = params?query(params):query()

    if(isLoading){
        return <Loading/>
    }
    if (error){
        return <ErrorMessage error={error}/>
    }

    return (
        React.cloneElement(children,)
    );
}

export default Fetcher;
