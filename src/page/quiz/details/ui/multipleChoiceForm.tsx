import {QuizForm, QuizFormKey} from "../../../../service/quiz/types.ts";
import {primitive} from "../../../../types/primitive.ts";
import GroupCheckBox from "../../../../ui/checkbox/groupCheckBox.tsx";
import Select from "../../../../ui/select/select.tsx";
import DUPLICATE_OPTIONS from "../constant/DuplicateOptions.ts";
import MultipleChoiceContents from "./multipleChoiceContents.tsx";


/**
 * 객관식 폼
 */
function MultipleChoiceForm({quizForm,commonHandleChange}:{
    quizForm:QuizForm,
    commonHandleChange: (value: primitive|primitive[], key: QuizFormKey) => void
}) {

    // 객관식 답안 옵션
    const checkBoxOptions = [
        {label:"1번",value:1},
        {label:"2번",value:2},
        {label:"3번",value:3},
        {label:"4번",value:4},
        {label:"5번",value:5},
    ]
    return (
        <>
            <span>객관식</span>
            {/*객관식일 경우,나타날 필드(중복 선택 여부)*/}
                <Select
                    options={DUPLICATE_OPTIONS}
                    label={"객관식 - 중복 선택 여부"}
                    handleOptionChange={(value) => commonHandleChange(value,"isMultiple")}
                />

            {/*객관식일 경우,나타날 필드(객관식 선택지 리스트)*/}

                <MultipleChoiceContents
                    quizForm={quizForm}
                    onChange={(value)=>commonHandleChange(value,"multipleChoiceContents")}

                />
            {/*객관실일 경우, 나타날 필드(객관식 답안)*/}
                <GroupCheckBox
                    className={"!px-2"}
                    label={"객관식 답안"}
                    options={checkBoxOptions}
                    direction={"col"}
                    onChange={(checkedList)=>commonHandleChange(checkedList,"multipleChoiceAnswer")}
                />
        </>
    );
}

export default MultipleChoiceForm;
