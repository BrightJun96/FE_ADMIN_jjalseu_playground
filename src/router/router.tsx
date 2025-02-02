import {createBrowserRouter} from "react-router-dom";
import ConceptDetailsPage from "../page/concept/details/concept-details-page.tsx";
import ConceptListPage from "../page/concept/list/conceptListPage.tsx";
import ConceptRegisterPage from "../page/concept/register/concept-register-page.tsx";
import LoginPage from "../page/login/loginPage.tsx";
import QuizDetailsPage from "../page/quiz/details/quizDetailsPage.tsx";
import QuizListPage from "../page/quiz/list/quizListPage.tsx";
import QuizRegisterPage from "../page/quiz/register/quizRegisterPage.tsx";

const router = createBrowserRouter([
    {

        children:[
            // 퀴즈
            {
                path:"quiz",
                children:[
                    {
                        path:"list",
                        element:<QuizListPage/>
                    },
                    {
                        path:":id",
                        element:<QuizDetailsPage/>
                    },
                    {
                        path:"register",
                        element:<QuizRegisterPage/>
                    }
                ]
            },
            // 개념
            {
                path:"concept",
                children:[
                    {path: "list",element: <ConceptListPage/>},
                    {path:":id",element: <ConceptDetailsPage/>},
                    {
                        path:"register", element: <ConceptRegisterPage/>
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
        ],

    },
]);

export default router;
