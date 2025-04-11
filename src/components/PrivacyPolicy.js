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
            <div className="u-shadow-v22 g-bg-white g-pa-20 g-pa-40--lg g-mt-minus-100 rounded g-mb-40">
              <h3 className="g-mb-20">Our Privacy Policy</h3>
              <p>Htmlstream does not share personal information of any kind with anyone. We will not sell or rent your name or personal information to any third party. We DO NOT sell, rent or provide outside access to our mailing list or any data we store. Any data that a user stores via our facilities is wholly owned by that user or business. At any time a user or business is free to take their data and leave, or to simply delete their data from our facilities.</p>
              <p>Htmlstream only collects such personal information that is necessary for you to access and use our services. This personal information includes, but is not limited to, first and last name, email address and other personal information necessary to generate proper legal documents.</p>
              <p>Htmlstream may release personal information if Htmlstream is required to by law, search warrant, subpoena, court order or fraud investigation. We may also use personal information in a manner that does not identify you specifically nor allow you to be contacted but does identify certain criteria about our Site's users in general (such as we may inform third parties about the number of registered users, number of unique visitors, and the pages most frequently browsed).</p>
              <h3 className="g-mb-20">Privacy Changes</h3>
              <p>If we change our privacy policy we will post those changes on this page. Registered users will be sent an email that outlines changes made to the privacy policy.</p>
            </div>

            <div className="text-center">
              <p>Have questions or suggestions? <Link className="text-nowrap" to="/contact-us">Contact Us</Link></p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
