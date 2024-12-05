import React from 'react'
import Layout from '../components/Layout/Layout'
import './About.css'; // Assuming you want to create a custom CSS file

const About = () => {
  return (
    <Layout title={'About Us - Ecommerce App'}>
      <div className="about-us-container">
        <div className="about-image col-md-6">
          <img
            src="/images/about.jpeg" // Replace with your image path
            alt="About Us"
            className="about-img"
          />
        </div>
        <div className="about-content col-md-6">
          <h2 className="about-title">About Us</h2>
          <p className="about-description">
            Welcome to e-Bazaar, your one-stop shop for all things [Product Category - e.g., electronics, fashion, home goods]! Our mission is to provide high-quality products at affordable prices while delivering exceptional customer service. Since [Year of Establishment], we have been committed to bringing you the best in online shopping, offering a wide range of products carefully curated to meet your needs.
          </p>

          <h4 className="about-section-title">Our Vision</h4>
          <p className="about-description">
            At e-Bazaar, we envision creating a seamless online shopping experience where customers can easily find the products they love. Our goal is to continuously improve and innovate, ensuring that our customers' expectations are met or exceeded every time they shop with us.
          </p>

          <h4 className="about-section-title">Why Choose Us?</h4>
          <ul className="about-list">
            <li>Wide selection of high-quality products</li>
            <li>Affordable pricing and frequent promotions</li>
            <li>Fast, reliable shipping</li>
            <li>Customer-first service with easy returns and exchanges</li>
            <li>Secure shopping experience</li>
          </ul>

          <h4 className="about-section-title">Contact Us</h4>
          <p className="about-description">
            Have any questions or want to learn more about us? Feel free to contact our customer service team at omkar.pandey@ebazaar.com or through our contact page. We're here to help and ensure your shopping experience is smooth and enjoyable!
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default About
