import {useNavigate, useParams} from "react-router-dom";
import Title from "../../../ui/title/Title.tsx";
import ConceptDetailForm from "./ui/concept-detail-form.tsx";

// 개념 상세 페이지
function ConceptDetailsPage() {
    const {id} =  useParams()


    const navigate = useNavigate()

    if(!id){
        alert("존재하지 않느 상세페이지입니다.")
        navigate("/quiz/list")
        return
    }
    return (
        <div className={"w-full"}>
            <Title>
                개념 상세
            </Title>
            <ConceptDetailForm conceptId={Number(id)}/>
        </div>
    );
}

export default ConceptDetailsPage;
