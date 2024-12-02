import {useContext} from "react";
import QuizFormContext from "../../context/quizFormContext.ts";
import {QuizFormKey} from "../../service/quiz/types.ts";
import {primitive} from "../../types/primitive.ts";

// 퀴즈 폼 커스텀 훅
function useQuizForm() {

   const {state,setState}= useContext(QuizFormContext)
    // onChange 함수
    function commonHandleChange( value:primitive|primitive[],key:QuizFormKey) {
        setState((prev)=>({...prev,[key]:value}))
    }
    return {commonHandleChange,quizForm:state,setQuizForm:setState}
}

export default useQuizForm;
