import {createBrowserRouter} from "react-router-dom";
import LoginPage from "../page/login/loginPage.tsx";
import QuizDetailsPage from "../page/quiz/details/quizDetailsPage.tsx";
import QuizListPage from "../page/quiz/list/quizListPage.tsx";
import QuizRegisterPage from "../page/quiz/register/quizRegisterPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello world!</div>,
        // 퀴즈
        children:[
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
