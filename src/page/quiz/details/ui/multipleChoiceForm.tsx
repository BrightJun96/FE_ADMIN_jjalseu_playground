import {useContext} from "react";
import QuizFormContext from "../../../../context/quizFormContext.ts";
import {GetQuizMultipleChoiceSharedDto} from "../../../../service/generate.api.types.ts";
import {IQuizForm, QuizFormKey} from "../../../../service/quiz/types.ts";
import {primitive} from "../../../../types/primitive.ts";
import GroupCheckBox from "../../../../ui/checkbox/groupCheckBox.tsx";
import MultipleChoiceContents from "./multipleChoiceContents.tsx";


/**
 * 객관식 폼
 */
function MultipleChoiceForm({quizForm,commonHandleChange}:{
    quizForm:IQuizForm,
    commonHandleChange: (value: primitive|primitive[], key: QuizFormKey) => void
}) {
    const {setState}= useContext(QuizFormContext)

    // 객관식 답안 옵션
    const checkBoxOptions =quizForm.multipleChoiceContents.map((m,index) => ({label:`${index+1}번`,value:m.id}))


    function handleMultipleChoiceContents(value:GetQuizMultipleChoiceSharedDto[]){

        setState((prev)=> ({...prev,multipleChoiceContents:value}))


    }

    function handleAnswer(answer:number[]){

        commonHandleChange(answer[0],"answer")

    }

    return (
        <>
            <span>객관식</span>
            {/*객관식일 경우,나타날 필드(중복 선택 여부)*/}
            {/*    <Select*/}
            {/*        options={DUPLICATE_OPTIONS}*/}
            {/*        label={"객관식 - 중복 선택 여부"}*/}
            {/*        handleOptionChange={(value) => commonHandleChange(value,"isMultiple")}*/}
            {/*    />*/}

            {/*객관식일 경우,나타날 필드(객관식 선택지 리스트)*/}

                <MultipleChoiceContents
                    quizForm={quizForm}
                    onChange={handleMultipleChoiceContents}
                />
            {/*객관실일 경우, 나타날 필드(객관식 답안)*/}
                <GroupCheckBox
                    className={"!px-2"}
                    label={"객관식 답안"}
                    options={checkBoxOptions}
                    initCheckedList={[quizForm.answer]}
                    isMultiSelect={false}
                    direction={"col"}
                    onChange={handleAnswer}
                />
        </>
    );
}

export default MultipleChoiceForm;
