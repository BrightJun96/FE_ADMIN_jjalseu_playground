import {useEffect} from "react";
import {UpdateQuizRequestDto, UpdateQuizRequestDtoFieldEnum} from "../../../../service/generate.api.types.ts";
import {useMutationDeleteQuiz, useMutationUpdateQuiz, useQueryQuizDetail} from "../../../../service/quiz/query.ts";
import PrimaryButton from "../../../../ui/button/primaryButton.tsx";
import QuizForm from "../../ui/quizForm.tsx";
import useQuizForm from "../../useQuizForm.ts"

// 퀴즈 상세 폼
function QuizDetailForm({quizId}:{quizId:number}) {

    const {data} = useQueryQuizDetail(quizId)

    const {setQuizForm,quizForm,initData,setInitData} = useQuizForm()
    const {mutate:update}= useMutationUpdateQuiz()
    const {mutate:remove}= useMutationDeleteQuiz()

    // 퀴즈 수정
    function updateQuiz(){


        const updateField:UpdateQuizRequestDto = {
            title:quizForm.title,
            content:quizForm.content,
            explanation :quizForm.explanation,
            detailUrl:quizForm.detailUrl,
            field: quizForm.field as UpdateQuizRequestDtoFieldEnum,
            answer: quizForm.answer,
            quizMetaData: { seoMetaTitle:quizForm.quizMetaData.seoMetaTitle,seoMetaDescription:quizForm.quizMetaData.seoMetaDescription,metaImageUrl: quizForm.quizMetaData.metaImageUrl},
            multipleChoices:quizForm.multipleChoiceContents
        }

        update({id:quizId,request:updateField})
    }

    // 퀴즈 삭제
    function removeQuiz(){
        remove(quizId)

    }


    useEffect(() => {
        if(data){
            const {title,content,explanation,field,detailUrl,multipleChoices,quizMetaData,answer} =data.data

            const detailsData ={
                title,
                content,
                multipleChoiceContents:multipleChoices,
                explanation,
                field,
                detailUrl,
                quizMetaData,
                answer
            }
            setQuizForm(prev => ({...prev,
             ...detailsData
            }))

            setInitData((prev) => ({...prev,...detailsData}))
        }
    }, [data]);



    return (
        <QuizForm
            initData={initData}
            onSubmit={updateQuiz}
        >
            <PrimaryButton
                type={"submit"}
                color={"primary"}
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
