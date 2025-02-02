import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import QuizFormProvider from "../../../provider/quizFormProvider.tsx";
import Title from "../../../ui/title/Title.tsx";
import QuizDetailForm from "./ui/quizDetailForm.tsx";

// 퀴즈 상세 페이지
function QuizDetailsPage() {

    const {id} =  useParams()


    const navigate = useNavigate()

    useEffect(() => {

        if(!id){
            alert("존재하지 않느 상세페이지입니다.")
            navigate("/quiz/list")
        }
    }, [id]);

    return (
        <div className={"w-full"}>
                <Title>
                    퀴즈 상세
                </Title>

            <QuizFormProvider>
                {id && <QuizDetailForm quizId={Number(id)}/>}
            </QuizFormProvider>
        </div>
    );
}

export default QuizDetailsPage;
