import {CreateQuizRequestDto, CreateQuizRequestDtoFieldEnum} from "../../../../service/generate.api.types.ts";
import {useMutationAddQuiz} from "../../../../service/quiz/query.ts";
import PrimaryButton from "../../../../ui/button/primaryButton.tsx";
import QuizForm from "../../ui/quizForm.tsx";
import useQuizForm from "../../useQuizForm.ts"

function QuizRegisterForm() {

   const {quizForm} =  useQuizForm()
   const {mutate:add}= useMutationAddQuiz()

    function addQuiz(){

       const createField:CreateQuizRequestDto = {
           title:quizForm.title,
           content:quizForm.content,
           explanation :quizForm.explanation,
           detailUrl:quizForm.detailUrl,
           field: quizForm.field as CreateQuizRequestDtoFieldEnum,
           answer: quizForm.answer,
           quizMetaData: {
               seoMetaTitle:quizForm.quizMetaData.seoMetaTitle,
               seoMetaDescription:quizForm.quizMetaData.seoMetaDescription,
               metaImageUrl: quizForm.quizMetaData.metaImageUrl},
           multipleChoices:quizForm.multipleChoiceContents.map((m) => ({
               content:m.content
           }))
       }

        add(createField)
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
