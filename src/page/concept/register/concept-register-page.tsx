import React from 'react';
import Title from "../../../ui/title/Title.tsx";
import ConceptRegisterForm from "./ui/concept-register-form.tsx";

// 개념 등록 페이지
function ConceptRegisterPage(props) {
    return (
        <div className={"w-full"}>
            <Title>개념 등록</Title>
            <ConceptRegisterForm/>
        </div>
    );
}

export default ConceptRegisterPage;
