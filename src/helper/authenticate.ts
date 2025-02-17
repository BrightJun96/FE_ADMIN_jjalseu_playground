import {Cookies} from "react-cookie";
import {redirect} from "react-router-dom";

export class Authenticate{
    private readonly cookies:Cookies

    constructor() {

        this.cookies = new Cookies()
        // 메서드 바인딩
        this.authPageCheck = this.authPageCheck.bind(this);
        this.notAuthPageCheck = this.notAuthPageCheck.bind(this);
        this.getToken = this.getToken.bind(this);
    }
     async authPageCheck(){
        if(!this.getToken()){
            window.alert("로그인이 필요합니다.")
            return redirect("/")
        }
        return null
    }

     async notAuthPageCheck(){
        if(this.getToken()){
            window.alert("이미 로그인이 되어있습니다.")
            return redirect("/concept/list")
        }
        return null
    }


     private getToken(){

        return this.cookies.get("access_token")
    }


}

export const authenticate= new Authenticate()
