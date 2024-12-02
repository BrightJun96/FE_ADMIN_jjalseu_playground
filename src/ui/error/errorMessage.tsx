
function ErrorMessage({message="데이터를 불러오는데 오류가 발생하였습니다.",error}:{error?:Error,message?:string}) {

    if(error){
        console.error("Error fetching :", error.message);
        alert(message);
    }

    return (
        <p>{message}</p>
    );
}

export default ErrorMessage;
