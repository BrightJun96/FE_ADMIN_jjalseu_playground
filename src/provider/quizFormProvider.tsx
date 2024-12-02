import React, {useState} from 'react';
import QuizFormContext from "../context/quizFormContext.ts";
import initialQuizForm from "../page/quiz/details/constant/InitQuizForm.ts";
import {IQuizForm} from "../service/quiz/types.ts";

// 퀴즈 폼 컨텍스트 프로파이더
function QuizFormProvider({
    children
                          }:{
    children:React.ReactNode
}) {

    const [quizForm,setQuizForm]=useState<IQuizForm>(initialQuizForm);


    return (
        <QuizFormContext.Provider value={{state:quizForm,setState:setQuizForm}}>{children}</QuizFormContext.Provider>
    );
}

export default QuizFormProvider;
