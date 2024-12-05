import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'

const Profile = () => {
  return (
    <Layout title={`Dashboard - User Profile`}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3"><UserMenu/></div>
          <div className="col-md-9 p-3">
            <h3>Profile</h3>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile