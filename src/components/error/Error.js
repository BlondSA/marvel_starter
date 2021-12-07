import errorImg from "./error.gif";

const ErrorMessage = () => {
    return <img src={errorImg} alt="Error" style={{height: "260px", align: "center", margin: "0 auto"}} />;
};

export default ErrorMessage;
