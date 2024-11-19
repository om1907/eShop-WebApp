import Layout from '../../components/Layout/Layout'
import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const Products = () => {

  const [products, setProducts] = useState([])

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/get-products')
      setProducts(data.products);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  }

  useEffect(() => {
    getAllProducts();
  }, [])

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1 className='text-center'>All Products List</h1>
            <div className='d-flex flex-wrap'>
              {products?.map(p => (
                <Link to={`/dashboard/admin/product/${p.slug}`} key={p._id} className='product-link'>
                  <div className="card m-2 mt-2 p-2" style={{ width: '18rem', height: '100%', marginTop: '20px' }}>
                    <img src={`/api/v1/product/product-photo/${p?.photo?.uuid}`} className="card-img-top"
                      style={{
                        height: '200px', // Fixed height for all images
                        objectFit: 'cover', // Ensure images cover the area without distortion
                      }}
                      alt={p.name} />
                    <div className="card-body" style={{ height: 'calc(100% - 200px)', display: 'flex', flexDirection: 'column' }}>
                      <h5 className="card-title" style={{ flex: '1' }}>{p.name}</h5>
                      <p className="card-text" style={{ flex: '1' }}> {p.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Products