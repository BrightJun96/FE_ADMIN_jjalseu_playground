import React, {ReactNode} from 'react';

function PrivateRouterProvider({
    children
                               }:{
    children:ReactNode
}) {




    return (
        <>
            {
            children
            }
        </>
    );
}

export default PrivateRouterProvider;
