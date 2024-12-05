import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import { envConfig } from '../../utils/envConfig';
import { toast } from 'react-toastify';
import axios from 'axios';

const Users = () => {

  const [users, setUsers] = useState([]);

  const handleDelete = async (id) => {
    const url = envConfig?.deleteUserUrl;
    try {
      const { data } = await axios.delete(`${url}/${id}`);
      if (data?.success) {
        toast.success('User deleted successfully');
        setTimeout(() => {
          getAllUsers();
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in handleDelete');
    }
  }

  const getAllUsers = async () => {
    const url = envConfig.getAllUsersUrl;
    try {
      const { data } = await axios.get(url);
      console.log(data);
      if (data?.success) {
        setUsers(data?.users);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in getAllUsers');
    }
  }

  useEffect(() => {
    getAllUsers();
  }, [])

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-6">
            <h1>All Users</h1>
            <div className='w-75'>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((u) => (
                    <>
                      <tr>
                        <td >{u.name}</td>
                        <td >{u.email}</td>
                        <td >{u.role}</td>
                        <td >
                          <button className='btn btn-primary ms-2'>Edit</button>
                          <button className='btn btn-danger ms-2'
                            onClick={() => handleDelete(u._id)}
                          >Delete</button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Users