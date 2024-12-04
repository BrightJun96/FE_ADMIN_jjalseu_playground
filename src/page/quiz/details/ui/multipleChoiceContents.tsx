"use client"


import {useEffect} from "react";
import {IQuizForm} from "../../../../service/quiz/types.ts";
// 객관식 문제 컨텐츠
import TextInput from "../../../../ui/input/textInput.tsx";

const MultipleChoiceContents = ({
                                    onChange,
                                    quizForm
}:{
    onChange:(value:string[])=>void,
    quizForm :IQuizForm
}) => {


    function handleChoiceContentChange(value:string,index:number) {




        onChange(quizForm.multipleChoiceContents.map((v,i)=>i===index?value:v))

    }

    useEffect(() => {

    }, [quizForm]);


    return (
        <div className={"w-full"}>
            <span className={"text-title3Normal mb-[12px]"}>객관식 문제안</span>
            <div className={"ml-[16px] flex flex-col gap-2"}>
                {
                    // quizForm.multipleChoices
                    quizForm.multipleChoiceContents
                        .map((v,i)=>
                            <TextInput
                                key={i}
                                label={`${i+1}번`}
                                className={"w-full"}
                                placeholder={"문제안을 입력해주세요."}
                                value={v}
                                onChange={(value)=>handleChoiceContentChange(value,i)}
                            />
                        )
                }
            </div>
        </div>
    );
};

export default MultipleChoiceContents;
