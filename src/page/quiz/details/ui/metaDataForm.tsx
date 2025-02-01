import {useContext} from "react";
import QuizFormContext from "../../../../context/quizFormContext.ts";
import TextInput from "../../../../ui/input/textInput.tsx";


interface MetaDataFormProps {
    metaData: {
        metaTitle:string,
        metaDescription:string,
        metaImageUrl:string
    }
}

{/*메타데이터 섹션(제목,설명,이미지 URL)*/}
function MetaDataForm({
                                metaData,
                         }:MetaDataFormProps) {
    const {metaTitle,metaDescription,metaImageUrl}=metaData

    const {setState}= useContext(QuizFormContext)



    function handleMetaData(value:string,metaField:"seoMetaTitle"|"seoMetaDescription"|"metaImageUrl"){

        setState((prev) => ({...prev,

            quizMetaData:{
                ...prev.quizMetaData,
                [metaField]:value
            }

        }))

    }

    return (
        <>
            <span
            className={"text-title2Normal"}
            >메타데이터</span>
            {/*제목*/}
            <TextInput
                label={"메타데이터-제목"}
                placeholder={"제목을 입력하세요"}
                className={"w-full"}
                value={metaTitle}
                onChange={(value) => handleMetaData(value,"seoMetaTitle")}
            />
            {/*설명*/}
            <TextInput
                label={"메타데이터-설명"}
                placeholder={"설명을 입력하세요"}
                className={"w-full"}
                value={metaDescription}
                onChange={(value) => handleMetaData(value,"seoMetaDescription")}
            />
            {/*이미지 URL*/}
            <TextInput
                label={"메타데이터-이미지 URL"}
                placeholder={"이미지 URL을 입력하세요"}
                className={"w-full"}
                value={metaImageUrl}
                onChange={(value) => handleMetaData(value,"metaImageUrl")}
            />
        </>
    );
}

export default MetaDataForm;
