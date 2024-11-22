import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import {  Modal } from 'antd';
import { envConfig } from '../../utils/envConfig';


const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState('');

  const handleDelete = async (id) => {
    const url = envConfig.deleteCategoryUrl + id;
    try {
      const { data } = await axios.delete(url);
      console.log(data);
      toast.success(`Category is deleted`);
      getAllCategories();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const url = envConfig.updateCategoryUrl + selected._id;
    try {
      const res = await axios.put(url, { name: updatedName });
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        setSelected(null);
        setUpdatedName('');
        setVisible(false);
        getAllCategories();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = envConfig.createCategoryUrl;
    try {
      const res = await axios.post(url, { name });
      console.log(res);
      if (res.data.success) {
        toast.success(`${name} category created successfully`);
        getAllCategories();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  }

  const getAllCategories = async () => {
    const url = envConfig.getAllCategoriesUrl;
    try {
      const { data } = await axios.get(url);
      console.log(data);
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Categories</h1>
            <div className='p-3 w-50'>
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className='w-75'>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button className='btn btn-primary ms-2'
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >Edit</button>
                          <button className='btn btn-danger ms-2'
                            onClick={() =>
                              handleDelete(c._id)}
                          >Delete</button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                handleSubmit={handleUpdateSubmit}
                value={updatedName}
                setValue={setUpdatedName}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory