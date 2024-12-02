import {useEffect} from "react";
import {useQueryQuizDetail} from "../../../../service/quiz/query.ts";
import PrimaryButton from "../../../../ui/button/primaryButton.tsx";
import QuizForm from "../../ui/quizForm.tsx";
import useQuizForm from "../../useQuizForm.ts"

// 퀴즈 상세 폼
function QuizDetailForm({quizId}:{quizId:number}) {

    const {data} = useQueryQuizDetail(quizId)
    const {setQuizForm} = useQuizForm()



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
        <QuizForm>
            <PrimaryButton color={"primary"}>
                수정
            </PrimaryButton>
        </QuizForm>
    );
}

export default QuizDetailForm;
