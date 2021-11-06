import { Button } from "antd";
import { CloudDownloadOutlined } from "@ant-design/icons";
import "./fetch-button.css";

const FetchButton = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      type="secondary"
      shape="circle"
      icon={<CloudDownloadOutlined />}
      size="large"
    />
  );
};

export default FetchButton;
