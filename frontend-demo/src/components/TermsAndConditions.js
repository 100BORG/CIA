import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const TermsAndConditions = () => {
  return (
    <>
      <main className="g-bg-secondary">
        <section className="g-bg-pos-center g-bg-no-repeat g-bg-gray-dark-v1 g-py-100" style={{ backgroundImage: "url('assets/img/programming-logos.png')" }}>
          <div className="container text-center g-color-white">
            <header className="g-mb-30">
              <h1 className="g-font-weight-300">Terms and Conditions</h1>
              <p className="g-color-white-opacity-0_8 g-font-size-16">Please read our terms of use.</p>
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
                  <h2>Acceptance of Terms</h2>
                  <p>By accessing or using our services, you agree to be bound by these Terms and Conditions.</p>
                </div>
                <div className="mb-5">
                  <h2>Use of Services</h2>
                  <p>You agree to use our services only for lawful purposes and in accordance with these Terms.</p>
                </div>
                <div className="mb-5">
                  <h2>Intellectual Property</h2>
                  <p>All content, features, and functionality are owned by us and are protected by copyright and other laws.</p>
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

export default TermsAndConditions;
