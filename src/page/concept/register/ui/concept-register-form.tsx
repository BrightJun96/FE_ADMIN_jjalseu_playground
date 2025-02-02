import React, {useState} from 'react';
import {useMutationCreateConcept} from "../../../../service/concept/concept.query.ts";
import {
    CreateConceptRequestDto,
    CreateConceptRequestDtoFieldEnum,
    CreateConceptRequestDtoTechEnum,
    CreateMetadataSharedDto
} from "../../../../service/generate.api.types.ts";
import {primitive} from "../../../../types/primitive.ts";
import PrimaryButton from "../../../../ui/button/primaryButton.tsx";
import TextInput from "../../../../ui/input/textInput.tsx";
import Select from "../../../../ui/select/select.tsx";
import TextEditor from "../../../../ui/textEditor/textEditor.tsx";
import FIELD_OPTIONS from "../../../quiz/details/constant/FieldOptions.ts";
import LANGUAGE_OPTIONS from "../../../quiz/details/constant/LanguageOptions.ts";

export type Concept = CreateConceptRequestDto
export type ConceptKey = keyof Concept
type MetaKey = keyof CreateMetadataSharedDto
function ConceptRegisterForm(props) {

    const initForm:Concept = {
        title:"",
        content:"",
        detailUrl:"",
        field:CreateConceptRequestDtoFieldEnum.FRONTEND,
        tech:CreateConceptRequestDtoTechEnum.JAVASCRIPT,
        metaData:{
            metaTitle:"",
            metaDescription:"",
            metaImageUrl:""
        }
    }

    const [conceptForm,setConceptForm] = useState<Concept>(initForm)

    const {
        mutate:create
    } =useMutationCreateConcept()

    function createConcept(){
        create({
                title: conceptForm.title,
                content: conceptForm.content,
                field: conceptForm.field,
                tech: conceptForm.tech,
                detailUrl:conceptForm.detailUrl,
                metaData: {
                    metaTitle: conceptForm.metaData.metaTitle,
                    metaDescription: conceptForm.metaData.metaDescription,
                    metaImageUrl: conceptForm.metaData.metaImageUrl
                }
        })
    }

    function commonHandleChange( value:primitive|primitive[],key:ConceptKey) {
        setConceptForm((prev)=>({...prev,[key]:value}))
    }

    function handleMeta(value:string,key:MetaKey){


        setConceptForm((prev) => ({

            ...prev,metaData:{
                ...prev.metaData,
                [key]:value
            }
        }))
    }
    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault()
            }}>
                <TextInput
                    value={conceptForm.title}
                    label={"제목"}
                    placeholder={"제목을 입력하세요"}
                    onChange={(value) => commonHandleChange(value, "title")}
                />

                {/*개념 내용 (텍스트 에디터)*/}
                <TextEditor
                    initValue={conceptForm.content}
                    label={"내용"}
                    onHTMLChange={(value) => commonHandleChange(value, "content")}
                />


                <Select
                    options={FIELD_OPTIONS}
                    label={"분야"}
                    handleOptionChange={(value) => commonHandleChange(value as CreateConceptRequestDtoFieldEnum, "field")}
                />

                <Select
                    options={LANGUAGE_OPTIONS}
                    label={"언어"}
                    handleOptionChange={(value) => commonHandleChange(value, "tech")}
                />

                {/*상세 URL*/}
                <TextInput
                    value={conceptForm.detailUrl}
                    label={"상세 URL"}
                    className={"w-full"}
                    placeholder={"상세 URL을 입력해주세요."}
                    onChange={(value) => commonHandleChange(value, "detailUrl")}
                />
                <>
            <span
                className={"text-title2Normal"}
            >메타데이터</span>
                    {/*제목*/}
                    <TextInput
                        label={"메타데이터-제목"}
                        placeholder={"제목을 입력하세요"}
                        className={"w-full"}
                        value={conceptForm.metaData.metaTitle}
                        onChange={(value) => handleMeta(value, "metaTitle")}
                    />
                    {/*설명*/}
                    <TextInput
                        label={"메타데이터-설명"}
                        placeholder={"설명을 입력하세요"}
                        className={"w-full"}
                        value={conceptForm.metaData.metaDescription}
                        onChange={(value) => handleMeta(value, "metaDescription")}
                    />
                    {/*이미지 URL*/}
                    <TextInput
                        label={"메타데이터-이미지 URL"}
                        placeholder={"이미지 URL을 입력하세요"}
                        className={"w-full"}
                        value={conceptForm.metaData.metaImageUrl}
                        onChange={(value) => handleMeta(value, "metaImageUrl")}
                    />
                </>


                <div className={"w-full flex gap-10 justify-center mt-10"}>
                    {/*버튼*/}
                    <PrimaryButton
                        type={"button"}
                        color={"primary"}
                        onClick={createConcept}
                    >
                        생성
                    </PrimaryButton>
                    <PrimaryButton
                        type={"button"}
                        color={"primarySecondary"}
                        onClick={() => {
                        }}
                    >
                        삭제
                    </PrimaryButton>

                </div>
            </form>
        </div>
    );
}

export default ConceptRegisterForm;
