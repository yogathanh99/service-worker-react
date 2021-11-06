import React, { useEffect, useState } from "react";
import { message, Alert, Table, Empty } from "antd";
import axios from "axios";
import Header from "./components/header";
import FetchButton from "./components/fetch-button";
import "./App.css";

const { Column } = Table;

function App() {
  const [users, setUsers] = useState([]);
  const [isOnline, setOnline] = useState(true);

  const _handleCFetch = async () => {
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(data);
      localStorage.setItem("users", JSON.stringify(data));
      setOnline(true);
      message.success("Fetch Successful", [0.5]);
    } catch (error) {
      setOnline(false);
      const users = localStorage.getItem("users");
      setUsers(JSON.parse(users));
      message.success("Fetch Successful", [0.5]);
    }
  };

  useEffect(() => {
    const users = localStorage.getItem("users");
    if (users) {
      setUsers(JSON.parse(users));
      message.success("Fetch Successful", [0.5]);
    }
  }, []);

  return (
    <div>
      <Header />
      <>
        {!isOnline ? (
          <Alert
            message="You are in offline mode or some issues with connection"
            type="warning"
          />
        ) : null}
      </>
      <span className="wrapper-download-button">
        <FetchButton onClick={_handleCFetch} />
      </span>
      {users.length > 0 ? (
        <Table dataSource={users} rowKey={(user) => user.id} pagination={false}>
          <Column title="Name" dataIndex="name" align="center" />
          <Column title="Username" dataIndex="username" align="center" />
          <Column title="Email" dataIndex="email" align="center" />
          <Column title="Phone" dataIndex="phone" align="center" />
        </Table>
      ) : (
        <div className="wrapper-empty">
          <Empty />
        </div>
      )}
    </div>
  );
}

export default App;
