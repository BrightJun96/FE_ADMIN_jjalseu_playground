import React from 'react';

// 제목 컴포넌트
function Title({children}:{children:React.ReactNode}) {
    return (
        <h1>
            {children}
        </h1>
    );
}

export default Title;
