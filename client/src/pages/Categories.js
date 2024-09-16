import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'

const Categories = () => {
  return (
    <Layout>
      <div className="container" style={{ marginTop: '100px' }}>
        <div className="row container">
          <div className="col-md-4 mt-5 mb-3 gx-3 gy-3">
            <div className="card">
              <Link className="btn cat-btn"></Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Categories
