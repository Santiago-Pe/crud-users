import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const PageFaildFetch = () => {
  const navigate = useNavigate();
  const backHome = () => {
    navigate("/");
  };
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Button type="primary" onClick={backHome}>
          Back Home
        </Button>
      }
    />
  );
};
export default PageFaildFetch;
