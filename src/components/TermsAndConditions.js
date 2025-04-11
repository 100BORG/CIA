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
            <div className="u-shadow-v22 g-bg-white g-pa-20 g-pa-40--lg g-mt-minus-100 rounded g-mb-40">
              <h3 className="g-mb-20">General Terms</h3>
              <p>By accessing and placing an order with Htmlstream, you confirm that you are in agreement with and bound by the terms and conditions contained in the Terms Of Use outlined below. These terms apply to the entire website and any email or other type of communication between you and Htmlstream.</p>
              
              <p>Under no circumstances shall Htmlstream team be liable for any direct, indirect, special, incidental or consequential damages, including, but not limited to, loss of data or profit, arising out of the use, or the inability to use, the materials on this site, even if Htmlstream team or an authorized representative has been advised of the possibility of such damages.</p>
              
              <p>Htmlstream will not be responsible for any outcome that may occur during the course of usage of our resources. We reserve the rights to change prices and revise the resources usage policy in any moment.</p>
              
              <h3 className="g-mb-20">Products</h3>
              <p>All products and services are delivered by Htmlstream electronically and you can access your downloads from your profile page.</p>
              
              <h3 className="g-mb-20">Termination</h3>
              <p>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
              
              <p>All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>
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

export default TermsAndConditions;
