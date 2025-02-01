import {useContext, useState} from "react";
import QuizFormContext from "../../context/quizFormContext.ts";
import {IQuizForm, QuizFormKey} from "../../service/quiz/types.ts";
import {primitive} from "../../types/primitive.ts";
import initQuizForm from "./details/constant/InitQuizForm.ts";

// 퀴즈 폼 커스텀 훅
function useQuizForm() {

    const {state,setState}= useContext(QuizFormContext)
    const [initData,setInitData] = useState<IQuizForm>(initQuizForm)
    // onChange 함수
    function commonHandleChange( value:primitive|primitive[],key:QuizFormKey) {
        setState((prev)=>({...prev,[key]:value}))
    }
    return {commonHandleChange,quizForm:state,setQuizForm:setState,initData,setInitData}
}

export default useQuizForm;
