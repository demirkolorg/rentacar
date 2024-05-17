import React, { useState, useEffect } from 'react';
import { Table, Button, Select, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState(['user', 'admin']);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      message.error('Kullanıcılar yüklenirken hata oluştu');
    }
  };

  const updateRole = async (userId, role) => {
    try {
      await axios.put(`/api/users/${userId}/role`, { role });
      message.success('Rol güncellendi');
      fetchUsers();
    } catch (error) {
      message.error('Rol güncellenirken hata oluştu');
    }
  };

  const columns = [
    { title: 'Kullanıcı Adı', dataIndex: 'username', key: 'username' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Rol',
      key: 'role',
      render: (text, record) => (
        <Select defaultValue={record.role} onChange={value => updateRole(record._id, value)}>
          {roles.map(role => (
            <Option key={role} value={role}>
              {role}
            </Option>
          ))}
        </Select>
      )
    }
  ];

  return (
    <div>
      <h1>Admin Paneli</h1>
      <Table columns={columns} dataSource={users} rowKey="_id" />
    </div>
  );
};

export default Admin;
