import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useNavigate, useParams } from 'react-router-dom'
import { Select } from 'antd'
import { envConfig } from '../../utils/envConfig'

const { Option } = Select;

const UpdateProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [uuid, setUuid] = useState('');
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [photo, setPhoto] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shipping, setShipping] = useState('');

    //get single product
    const getSingleProduct = async () => {
        const url = envConfig.getSingleProductUrl;
        try {
            const { data } = await axios.get(`${url}/${params.slug}`);
            console.log(data);
            setName(data?.product?.name);
            setDescription(data?.product?.description);
            setPrice(data?.product?.price);
            setQuantity(data?.product?.quantity);
            setCategory(data?.product?.category?._id);
            setShipping(data?.product?.shipping);
            setUuid(data?.product?.photo?.uuid);
            setId(data?.product?._id);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    useEffect(() => {
        getSingleProduct();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const url = envConfig.updateProductUrl;
        try {
            const productData = new FormData();
            productData.append('name', name);
            productData.append('category', category);
            photo && productData.append('photo', photo);
            productData.append('description', description);
            productData.append('price', price);
            productData.append('quantity', quantity);
            console.log(name, category, photo, description, price, quantity,id); //for testing   

            const { data } = await axios.put(`${url}/${id}`, productData);
            if (data?.success) {
                toast.success('Product Updated Successfully');
                setTimeout(() => {
                    navigate('/dashboard/admin/products');
                }, 1500);
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    const handleDelete = async () => {
        const url = envConfig.deleteProductUrl;
        try {
            let answer = window.prompt('Are you sure you want to delete this product?');
            if (!answer) return;
            const { data } = await axios.delete(`${url}/${id}`);
            if (data?.success) {
                toast.success('Product Deleted Successfully');
                setTimeout(() => {
                    navigate('/dashboard/admin/products');
                }, 1500);
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }


    //get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/categories');
            console.log(data);
            if (data.success) {
                setCategories(data?.category);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong getting categories')
        }
    }

    useEffect(() => {
        getAllCategory();
    }, []);

    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-6">
                        <h1>Update Products</h1>
                        <div className='m-1 w-75'>
                            <Select
                                bordered={false}
                                placeholder='Select a category'
                                size='large'
                                showSearch
                                className='form-select mb-3'
                                value={category}
                                onChange={(value) => {
                                    setCategory(value);
                                }}
                            >
                                {categories?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                            <div className='mb-3'>
                                <label htmlFor='upload-images' className='btn btn-outline-secondary col-md-12'>
                                    {photo ? photo.name : 'Upload Images'}
                                    <input
                                        type='file'
                                        id='upload-images'
                                        name='photo'
                                        accept='image/*'
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className='mb-3'>
                                {photo ? (
                                    <div className='text-center'>
                                        <img src={URL.createObjectURL(photo)} alt='product' height={'200px'} className='img img-responsive' />
                                    </div>
                                ) : (
                                    <div className='text-center'>
                                        <img src={`/api/v1/product/product-photo/${uuid}`} alt='product' height={'200px'} className='img img-responsive' />
                                    </div>
                                )}
                            </div>
                            <div className='mb-3'>
                                <input
                                    type='text'
                                    value={name}
                                    placeholder='Product name '
                                    className='form-control'
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <textarea
                                    type='text'
                                    value={description}
                                    placeholder='Product description'
                                    className='form-control'
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <input
                                    type='Number'
                                    value={price}
                                    placeholder='Product price '
                                    className='form-control'
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <input
                                    type='Number'
                                    value={quantity}
                                    placeholder='Product quantity '
                                    className='form-control'
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <Select
                                    bordered={false}
                                    placeholder='Select a shipping'
                                    size='large'
                                    showSearch
                                    className='form-select mb-3'
                                    value={shipping ? 'Yes' : 'No'}
                                    onChange={(value) => {
                                        setShipping(value);
                                    }}
                                >
                                    <Option value='yes'>Yes</Option>
                                    <Option value='no'>No</Option>
                                </Select>
                            </div>
                            <div className='m-3 d-flex justify-content-between'>
                                <div className='m-2'>
                                    <button
                                    className='btn btn-primary'
                                    onClick={handleUpdate}
                                >Update Product</button>
                                </div>
                                <div className=' m-2'>
                                    <button
                                        className='btn btn-danger'
                                    onClick={handleDelete}
                                >Delete Product</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct