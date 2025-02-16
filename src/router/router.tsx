import {createBrowserRouter} from "react-router-dom";
import {authenticate} from "../helper/authenticate.ts";
import ConceptDetailsPage from "../page/concept/details/concept-details-page.tsx";
import ConceptListPage from "../page/concept/list/conceptListPage.tsx";
import ConceptRegisterPage from "../page/concept/register/concept-register-page.tsx";
import LoginPage from "../page/login/loginPage.tsx";
import QuizDetailsPage from "../page/quiz/details/quizDetailsPage.tsx";
import QuizListPage from "../page/quiz/list/quizListPage.tsx";
import QuizRegisterPage from "../page/quiz/register/quizRegisterPage.tsx";

const router = createBrowserRouter([
    {
        path:"/",
        element:<LoginPage/>,
        loader:authenticate.notAuthPageCheck
    },
    // 퀴즈
    {
        path:"quiz",
        children:[
            {
                path:"list",
                element:<QuizListPage/>,
                loader:authenticate.authPageCheck
            },
            {
                path:":id",
                element:<QuizDetailsPage/>,
                loader:authenticate.authPageCheck
            },
            {
                path:"register",
                element:<QuizRegisterPage/>,
                loader:authenticate.authPageCheck
            }
        ]
    },
    // 개념
    {
        path:"concept",
        children:[
            {path: "list",element: <ConceptListPage/>,
                loader:authenticate.authPageCheck
            },
            {path:":id",element: <ConceptDetailsPage/>,
                loader:authenticate.authPageCheck
            },
            {
                path:"register", element: <ConceptRegisterPage/>,
                loader:authenticate.authPageCheck

            }
        ]


    },

    // 인증
    {
        path:"auth",
        children:[
            // 로그인
            {
                path:"login",
                element:<LoginPage/>
            }]
    }
]);

export default router;
