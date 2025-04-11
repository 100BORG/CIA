import React from 'react';
import Header from './Header';
import Footer from './Footer';

const DocsUIKit = () => {
  return (
    <>
      <Header />
      <main className="container py-5">
        <h1>UI Kit Documentation</h1>
        <p>This is a placeholder for the UI Kit Documentation page.</p>
        
        <div className="row mt-5">
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Typography</h5>
                <p className="card-text">Documentation for typography styles and usage.</p>
                <a href="#" className="btn btn-primary">View Details</a>
              </div>
            </div>
          </div>
          
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Components</h5>
                <p className="card-text">Documentation for all available UI components.</p>
                <a href="#" className="btn btn-primary">View Details</a>
              </div>
            </div>
          </div>
          
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Layouts</h5>
                <p className="card-text">Documentation for page layouts and grid system.</p>
                <a href="#" className="btn btn-primary">View Details</a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DocsUIKit;
