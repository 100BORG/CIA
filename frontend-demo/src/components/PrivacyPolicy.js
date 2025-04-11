import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const PrivacyPolicy = () => {
  return (
    <>
      <main className="g-bg-secondary">
        <section className="g-bg-pos-center g-bg-no-repeat g-bg-gray-dark-v1 g-py-100" style={{ backgroundImage: "url('assets/img/programming-logos.png')" }}>
          <div className="container text-center g-color-white">
            <header className="g-mb-30">
              <h1 className="g-font-weight-300">Privacy Policy</h1>
              <p className="g-color-white-opacity-0_8 g-font-size-16">Our commitment to your privacy.</p>
            </header>
            <div className="g-mb-30">
              <Link className="btn u-btn-outline-primary" to="/"><span className="g-mr-3">←</span> Go Home Page</Link>
            </div>
          </div>
        </section>
        <section className="g-py-50">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="mb-5">
                  <h2>Introduction</h2>
                  <p>This privacy policy outlines how we collect, use, and protect your information when you use our services.</p>
                </div>
                <div className="mb-5">
                  <h2>Information Collection</h2>
                  <p>We collect personal information such as name, email, and usage data to provide our services.</p>
                </div>
                <div className="mb-5">
                  <h2>How We Use Your Information</h2>
                  <p>We use your information to provide and improve our services, communicate with you, and ensure security.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
