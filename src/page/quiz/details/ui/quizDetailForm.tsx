import {useEffect, useState} from "react";
import {useQueryQuizDetail} from "../../../../service/quiz/query.ts";
import {QuizForm, QuizFormKey} from "../../../../service/quiz/types.ts";
import {primitive} from "../../../../types/primitive.ts";
import TextInput from "../../../../ui/input/textInput.tsx";
import Select from "../../../../ui/select/select.tsx";
import TextEditor from "../../../../ui/textEditor/textEditor.tsx";
import FIELD_OPTIONS from "../constant/FieldOptions.ts";
import initialQuizForm from "../constant/InitQuizForm.ts";
import LANGUAGE_OPTIONS from "../constant/LanguageOptions.ts";
import LEVEL_OPTIONS from "../constant/LevelOptions.ts";
import TYPE_OPTIONS from "../constant/TypeOptions.ts";
import MetaDataForm from "./metaDataForm.tsx";
import MultipleChoiceForm from "./multipleChoiceForm.tsx";

// 퀴즈 상세 폼
function QuizDetailForm({quizId}:{quizId:number}) {

    const {data} = useQueryQuizDetail(quizId)

    // 퀴즈 폼 상태
    const [quizForm,setQuizForm]=useState<QuizForm>(initialQuizForm);


    // onChange 함수
    function commonHandleChange( value:primitive|primitive[],key:QuizFormKey) {
        setQuizForm((prev)=>({...prev,[key]:value}))
    }

    console.log("data :",data)
    useEffect(() => {
        if(data){
            const {level,title,content,multipleChoiceAnswer,subjectiveAnswer,type,hint,explanation,field,lang,time,metaTitle,metaDescription,metaImageUrl} =data.data
            setQuizForm(prev => ({...prev,
                title,
                content,
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

            }))
        }
    }, [data]);

    return (
        <form className={"w-full"}>
            <TextInput
                value={quizForm.title}
                label={"퀴즈 제목"}
                placeholder={"제목을 입력하세요"}
                onChange={(value) => commonHandleChange(value,"title") }
            />
            {/*퀴즈 내용 (텍스트 에디터)*/}
            <TextEditor
                value={quizForm.content}
                label={"퀴즈 내용"}
                onHTMLChange={(value)=> commonHandleChange(value,"content") }
            />
            {/*힌트 (텍스트 에디터)*/}
            <TextEditor
                value={quizForm.hint}
                label={"힌트"}
                onHTMLChange={(value)=> commonHandleChange(value,"hint")}
            />
            {/*해설 (텍스트 에디터)*/}
            <TextEditor
                value={quizForm.explanation}
                label={"해설"}
                onHTMLChange={(value)=> commonHandleChange(value,"explanation")}
            />
            {/*분야*/}
            <Select
                options={FIELD_OPTIONS}
                label={"분야"}
                handleOptionChange={(value) => commonHandleChange(value,"field")}
            />
            {/*언어*/}
            <Select
                options={LANGUAGE_OPTIONS}
                label={"언어"}
                handleOptionChange={(value) => commonHandleChange(value,"lang")}
            />
            {/*문제 난이도*/}
            <Select
                options={LEVEL_OPTIONS}
                label={"문제 난이도"}
                handleOptionChange={(value) => commonHandleChange(value,"level")}
            />
            {/*문제 타입(객관식 or 주관식)*/}
            <Select
                options={TYPE_OPTIONS}
                label={"문제타입"}
                handleOptionChange={(value)=>commonHandleChange(value,"type")}

            />
            {/*상세 URL*/}
            <TextInput
                value={quizForm.detailUrl}
                label={"상세 URL"}
                className={"w-full"}
                placeholder={"상세 URL을 입력해주세요."}
                onChange={(value)=>commonHandleChange(value,"detailUrl")}
            />

            {/*객관식 폼*/}
            {quizForm.type==="MULTIPLE_CHOICE"&&
                <MultipleChoiceForm quizForm={quizForm} commonHandleChange={commonHandleChange}/>
            }

            {/*메타데이터 섹션(제목,설명,이미지 URL)*/}
            <MetaDataForm
                metaData={{
                    metaTitle:quizForm.metaTitle,
                    metaDescription:quizForm.metaDescription,
                    metaImageUrl:quizForm.metaImageUrl,
                    commonHandleChange
                }}
            />
        </form>
    );
}

export default QuizDetailForm;
