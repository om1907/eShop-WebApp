import React from "react";
import Layout from "./../components/Layout/Layout";
import './Policy.css'; // Assuming you create a Policy.css file for styles

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="privacy-policy-container">
        <div className="col-md-6 privacy-policy-image">
          <img
            src="/images/privacy-policy.jpeg"  // Replace with your image path
            alt="Privacy Policy"
            className="privacy-policy-img"
          />
        </div>
        <div className="col-md-6 privacy-policy-content">
          <h2 className="policy-title">Privacy Policy</h2>

          <p className="policy-text">
            At e-Bazaar, we value your privacy. This policy outlines how we collect, use, and protect your personal data.
          </p>

          <h4 className="policy-section-title">1. Information We Collect</h4>
          <p className="policy-text">
            We collect personal information such as name, email, shipping and billing addresses, and payment details when you make a purchase or sign up for our services.
          </p>

          <h4 className="policy-section-title">2. How We Use Your Information</h4>
          <p className="policy-text">
            We use your information to process orders, provide customer support, and send updates about our services and products.
          </p>

          <h4 className="policy-section-title">3. Data Protection</h4>
          <p className="policy-text">
            We implement industry-standard security measures to protect your data during transactions and storage.
          </p>

          <h4 className="policy-section-title">4. Sharing of Your Information</h4>
          <p className="policy-text">
            We do not sell your personal data. We may share it with trusted partners to facilitate shipping, payment processing, or legal compliance.
          </p>

          <h4 className="policy-section-title">5. Your Rights</h4>
          <p className="policy-text">
            You can request access to or deletion of your personal data by contacting us directly.
          </p>

          <h4 className="policy-section-title">6. Changes to This Policy</h4>
          <p className="policy-text">
            We may update this policy from time to time. Any changes will be posted on this page.
          </p>

          <h4 className="policy-section-title">7. Contact Us</h4>
          <p className="policy-text">
            If you have any questions about this policy, please contact us at omkar.pandey@ebazaar.com.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
