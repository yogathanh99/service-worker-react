import React, { useEffect, useState } from 'react';
import { Alert, Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import './App.css';

const { Column } = Table;

function App() {
  const [users, setUsers] = useState([]);
  const [isOnline, setOnline] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          'https://jsonplaceholder.typicode.com/users',
        );
        setUsers(data);
        localStorage.setItem('users', JSON.stringify(data));
        setOnline(true);
      } catch (error) {
        setOnline(false);
        const users = localStorage.getItem('users');
        setUsers(JSON.parse(users));
      }
    })();
  }, []);
  return (
    <div>
      <div>
        {!isOnline ? (
          <Alert
            message='You are in offline mode or some issues with connection'
            type='warning'
          />
        ) : null}
      </div>
      {users.length > 0 ? (
        <Table dataSource={users} rowKey={(user) => user.id} pagination={false}>
          <Column title='Name' dataIndex='name' align='center' />
          <Column title='Username' dataIndex='username' align='center' />
          <Column title='Email' dataIndex='email' align='center' />
          <Column title='Phone' dataIndex='phone' align='center' />
        </Table>
      ) : (
        <LoadingOutlined />
      )}
    </div>
  );
}

export default App;
