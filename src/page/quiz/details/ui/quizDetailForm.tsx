import {useEffect} from "react";
import {useMutationDeleteQuiz, useMutationUpdateQuiz, useQueryQuizDetail} from "../../../../service/quiz/query.ts";
import PrimaryButton from "../../../../ui/button/primaryButton.tsx";
import QuizForm from "../../ui/quizForm.tsx";
import useQuizForm from "../../useQuizForm.ts"

// 퀴즈 상세 폼
function QuizDetailForm({quizId}:{quizId:number}) {

    const {data} = useQueryQuizDetail(quizId)
    const {setQuizForm,quizForm} = useQuizForm()
    const {mutate:update}= useMutationUpdateQuiz()
    const {mutate:remove}= useMutationDeleteQuiz()

    // 퀴즈 수정
    function updateQuiz(){

        update({id:quizId,request:quizForm})
    }

    // 퀴즈 삭제
    function removeQuiz(){
        remove(quizId)

    }


    useEffect(() => {
        if(data){
            const {title,content,multipleChoices,multipleChoiceAnswer,subjectiveAnswer,type,hint,explanation,field,lang,time,metaTitle,metaDescription,metaImageUrl,detailUrl} =data.data
            setQuizForm(prev => ({...prev,
                title,
                content,
                multipleChoices:multipleChoices.map(({content}) => content),
                multipleChoiceAnswer ,
                subjectiveAnswer,
                type,
                hint,
                explanation,
                field,
                lang,
                time,
                metaTitle,
                metaDescription,
                metaImageUrl:metaImageUrl??"",
                detailUrl
            }))
        }
    }, [data]);



    return (
        <QuizForm
            onSubmit={updateQuiz}
        >
            <PrimaryButton
                type={"submit"}
                color={"primary"}
                onClick={updateQuiz}
            >
                수정
            </PrimaryButton>
            <PrimaryButton
                type={"button"}
                color={"primarySecondary"}
                onClick={removeQuiz}
            >
                삭제
            </PrimaryButton>
        </QuizForm>
    );
}

export default QuizDetailForm;
