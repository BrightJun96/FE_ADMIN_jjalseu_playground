import {GetQuizSharedDtoFieldEnum} from "../../../service/generate.api.types.ts";
import {IQuizForm} from "../../../service/quiz/types.ts";
import TextInput from "../../../ui/input/textInput.tsx";
import Select from "../../../ui/select/select.tsx";
import TextEditor from "../../../ui/textEditor/textEditor.tsx";
import FIELD_OPTIONS from "../details/constant/FieldOptions.ts";
import MetaDataForm from "../details/ui/metaDataForm.tsx";
import MultipleChoiceForm from "../details/ui/multipleChoiceForm.tsx";
import useQuizForm from "../useQuizForm.ts"

function QuizForm({children,onSubmit,initData}:{
    children:React.ReactNode,
    onSubmit:()=>void,
    initData?:IQuizForm
}) {

    const {quizForm,commonHandleChange} = useQuizForm()

    function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        onSubmit()
    }

    return (
        <form
            className={"w-full"}
            onSubmit={handleSubmit}
        >
            <TextInput
                value={quizForm.title}
                label={"퀴즈 제목"}
                placeholder={"제목을 입력하세요"}
                onChange={(value) => commonHandleChange(value, "title")}
            />
            {/*퀴즈 내용 (텍스트 에디터)*/}
            <TextEditor
                initValue={initData?.content}
                label={"퀴즈 내용"}
                onHTMLChange={(value) => commonHandleChange(value, "content")}
            />
            {/*힌트 (텍스트 에디터)*/}
            {/*<TextEditor*/}
            {/*    initValue={initData?.hint}*/}
            {/*    label={"힌트"}*/}
            {/*    onHTMLChange={(value) => commonHandleChange(value, "hint")}*/}
            {/*/>*/}
            {/*해설 (텍스트 에디터)*/}
            <TextEditor
                initValue={initData?.explanation}
                label={"해설"}
                onHTMLChange={(value) => commonHandleChange(value, "explanation")}
            />
            {/*분야*/}
            <Select
                options={FIELD_OPTIONS}
                label={"분야"}
                handleOptionChange={(value) => commonHandleChange(value as GetQuizSharedDtoFieldEnum, "field")}
            />
            {/*언어*/}
            {/*<Select*/}
            {/*    options={LANGUAGE_OPTIONS}*/}
            {/*    label={"언어"}*/}
            {/*    handleOptionChange={(value) => commonHandleChange(value, "lang")}*/}
            {/*/>*/}
            {/*문제 난이도*/}
            {/*<Select*/}
            {/*    options={LEVEL_OPTIONS}*/}
            {/*    label={"문제 난이도"}*/}
            {/*    handleOptionChange={(value) => commonHandleChange(value, "level")}*/}
            {/*/>*/}
            {/*문제 타입(객관식 or 주관식)*/}
            {/*<Select*/}
            {/*    options={TYPE_OPTIONS}*/}
            {/*    label={"문제타입"}*/}
            {/*    handleOptionChange={(value) => commonHandleChange(value, "type")}*/}

            {/*/>*/}
            {/*상세 URL*/}
            <TextInput
                value={quizForm.detailUrl}
                label={"상세 URL"}
                className={"w-full"}
                placeholder={"상세 URL을 입력해주세요."}
                onChange={(value) => commonHandleChange(value, "detailUrl")}
            />

            {/*문제풀이 소요시간*/}
            {/*<TextInput*/}
            {/*    value={quizForm.time}*/}
            {/*    type={"number"}*/}
            {/*    label={"문제풀이 소요시간(초)"}*/}
            {/*    className={"w-full"}*/}
            {/*    placeholder={"문제풀이 소요시간을 입력해주세요."}*/}
            {/*    onChange={(value)=>commonHandleChange(value,"time")}*/}
            {/*/>*/}
            {/*객관식 폼*/}
                <MultipleChoiceForm quizForm={quizForm} commonHandleChange={commonHandleChange}/>

            {/*메타데이터 섹션(제목,설명,이미지 URL)*/}
            <MetaDataForm
                metaData={{
                    metaTitle: quizForm.quizMetaData.seoMetaTitle,
                    metaDescription: quizForm.quizMetaData.seoMetaDescription,
                    metaImageUrl: quizForm.quizMetaData.metaImageUrl??"",
                }}
            />
            {children}
        </form>
    );
}

export default QuizForm;
