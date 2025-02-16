// 로그인 페이지
import {FormEvent, useState} from "react";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {Auth, authAPI} from "../../service/auth/auth.api.ts";
import PrimaryButton from "../../ui/button/primaryButton.tsx";
import TextInput from "../../ui/input/textInput.tsx";


function LoginPage() {

    const [authForm,setAuthForm] = useState<Auth>({
        id:"",
        pw:""
    })

    const [actCookies, setActCookie] = useCookies(["access_token"]);
    const [rftCookies, setRftCookie] = useCookies(["refresh_token"]);
    const navigate = useNavigate()

    const loginButtonDisabledCondition = !authForm.id || !authForm.pw



    function handleAuthForm(field:"id"|"pw",value:string){

        setAuthForm((prev) => ({
            ...prev,
            [field]:value

        }))

    }


    async function handleSubmit(e:FormEvent<HTMLFormElement>){

        e.preventDefault()

        const response = await authAPI.login({
            id:authForm.id,
            pw:authForm.pw
        })

        if(!response){
            return
        }

        setActCookie("access_token",response?.data.accessToken)
        setRftCookie("refresh_token",response?.data.refreshToken)

        navigate("/concept/list")


    }

    return (
        <div className={"px-[300px] mt-[300px]"}>
            <h1 className={"font-bold text-title3Bold"}>관리자 로그인</h1>
            <form
                className={"flex flex-col gap-5"}
                onSubmit={handleSubmit}

            >
            <TextInput label={"아이디"} type={"text"} value={authForm.id}  onChange={(value) => handleAuthForm("id",value)} />
            <TextInput label={"비밀번호"} type={"password"} value={authForm.pw} onChange={(value) => handleAuthForm("pw",value)}/>
            <PrimaryButton
                className={"w-full h-[40px]"}
                disabled={loginButtonDisabledCondition}
                type={"submit"}
                color={"primary"}>
                로그인
            </PrimaryButton>

            </form>
        </div>
    );
}

export default LoginPage;
