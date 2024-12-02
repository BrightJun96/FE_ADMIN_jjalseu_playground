import {useMutationAddQuiz} from "../../../../service/quiz/query.ts";
import PrimaryButton from "../../../../ui/button/primaryButton.tsx";
import QuizForm from "../../ui/quizForm.tsx";
import useQuizForm from "../../useQuizForm.ts"

function QuizRegisterForm() {

   const {quizForm} =  useQuizForm()
   const {mutate:add}= useMutationAddQuiz()

    function addQuiz(){
        console.log("등록")
        add(quizForm)
    }

    return (
        <QuizForm
        onSubmit={addQuiz}
        >
            <PrimaryButton
                type={"submit"}
                color={"primary"}>등록</PrimaryButton>
        </QuizForm>

    );
}

export default QuizRegisterForm;
