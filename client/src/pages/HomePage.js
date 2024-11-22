import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { envConfig } from '../utils/envConfig';


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  //get all products
  const getAllProducts = async () => {
    const url = envConfig.getAllProductsUrl;
    try {
      const { data } = await axios.get(url);
      // console.log(data);
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in getAllProducts in Homepage');
    }
  }

  const getFilteredProducts = async () => {
    const url = envConfig.productFiltersUrl;
    try {
      const { data } = await axios.post(url, { checked, radio });
      // console.log(data);
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in getFilteredProducts in Homepage');
    }
  }

  useEffect(() => {
    if (!checked.lenght || !radio.length) {
      getAllProducts();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) {
      getFilteredProducts();
    }
    // eslint-disable-next-line
  }, [checked, radio]);

  //get all category
  const getAllCategory = async () => {
    const url = envConfig.getAllCategoriesUrl;
    try {
      const { data } = await axios.get(url);
      console.log(data);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in get all category in Homepage');
    }
  }

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter(c => c !== id);
    }
    setChecked(all);
  }

  const handleRadio = (value) => {
    setRadio(value);
  }

  return (
    <Layout title={'All Products - Best Offers'}>
      <div className='row mt-3'>
        <div className='col-md-3'>
          <h4 className='text-center p-6'>Filter By Category</h4>
          <div className='d-flex flex-column p-3'>
            {categories?.map((c) => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className='text-center'>Filter By Price</h4>
          <Radio.Group onChange={(e) => handleRadio(e.target.value)}>
            <div className='d-flex flex-column p-3'>
              {Prices.map((r) => (
                <Radio key={r._id} value={r.array}>
                  {r.name}
                </Radio>
              ))}
            </div>
          </Radio.Group>
          <div className='mt-3'>
            <Button className='btn btn-danger w-100' onClick={() => window.location.reload()}>
              Reset Filters
            </Button>
          </div>
        </div>
        <div className="col-md-8">
          <h1 className='text-center p-6'>All Products</h1>
          <div className="row">
            {products?.map((p) => (
              <div className="col-md-4 mb-4" key={p._id}>
                <Link to={`/dashboard/product/${p.slug}`} className="product-link">
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
                        <Button className="btn btn-secondary">Add to Cart</Button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
