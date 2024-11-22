import React from 'react'
import Layout from '../components/Layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from 'react-icons/bi'
import './Contact.css'; // Custom CSS for Contact page

const Contact = () => {
  return (
    <Layout title={'Contact Us - eCommerce App'}>
      <div className="contact-container">
        <div className="contact-image col-md-6">
          <img
            src="/images/contactus.jpeg" // Replace with your image path
            alt="Contact Us"
            className="contact-img"
          />
        </div>
        <div className="contact-info col-md-6">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-description">
            Have any questions or inquiries? Feel free to reach out to us! Our support team is available 24/7 to assist you with your needs.
          </p>

          <div className="contact-details">
            <p className="contact-detail">
              <BiMailSend className="contact-icon" /> Email: <a href="mailto:www.help@ecommerceapp.com">www.help@ecommerceapp.com</a>
            </p>
            <p className="contact-detail">
              <BiPhoneCall className="contact-icon" /> Phone: <a href="tel:+0123456789">012-3456789</a>
            </p>
            <p className="contact-detail">
              <BiSupport className="contact-icon" /> Toll-Free: <a href="tel:+18000000000">1800-0000-0000</a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
