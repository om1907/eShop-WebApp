import React from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'

const CreateProduct = () => {
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu/>
          </div>
          <div className="col-md-6">
            <h1>CreateProduct</h1>
          </div>
        </div>
        </div>
    </Layout>
  )
}

export default CreateProduct