import {createContext, Dispatch, SetStateAction} from "react";
import initialQuizForm from "../page/quiz/details/constant/InitQuizForm.ts";
import {IQuizForm} from "../service/quiz/types.ts";

const QuizFormContext = createContext<{ state:IQuizForm,setState:Dispatch<SetStateAction<IQuizForm>> }>({
    state:initialQuizForm,
    setState:()=>{}
});

export default QuizFormContext;
