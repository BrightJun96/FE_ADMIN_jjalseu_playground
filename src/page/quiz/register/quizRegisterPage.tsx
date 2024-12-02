import QuizFormProvider from "../../../provider/quizFormProvider.tsx";
import Title from "../../../ui/title/Title.tsx";
import QuizRegisterForm from "./ui/quizRegisterForm.tsx";

// 퀴즈 등록 페이지
function QuizRegisterPage() {
    return (
        <div className={"w-full"}>
            <Title>퀴즈 등록</Title>
            <QuizFormProvider>
                <QuizRegisterForm/>
            </QuizFormProvider>
        </div>
    );
}

export default QuizRegisterPage;
