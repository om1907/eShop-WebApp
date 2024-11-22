import Layout from '../../components/Layout/Layout'
import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

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
          <div className="col-md-8">
          <h1 className='text-center p-6'>All Products</h1>
          <div className="row">
            {products?.map((p) => (
              <div className="col-md-4 mb-4" key={p._id}>
                <Link to={`/dashboard/admin/product/${p.slug}`} className="product-link">
                  <div className="card h-100">
                    <img
                      src={`/api/v1/product/product-photo/${p?.photo?.uuid}`}
                      className="card-img-top"
                      style={{
                        height: "200px", // Fixed height for all images
                        objectFit: "cover", // Ensure images cover the area without distortion
                      }}
                      alt={p.name}
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description.substring(0, 30)}</p>
                      <p className="card-text">$ {p.price}</p>
                      <div className="mt-1 d-flex justify-content-between">
                        <Button className="btn btn-primary">More Details</Button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </Layout>
  )
}

export default Products