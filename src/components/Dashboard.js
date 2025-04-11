import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Dashboard = () => {
  return (
    <>
      <Header />
      <main className="g-bg-secondary">
        <section className="g-bg-pos-center g-bg-no-repeat g-bg-gray-dark-v1 g-py-100" style={{ backgroundImage: "url('assets/img/programming-logos.png')" }}>
          <div className="container text-center g-color-white">
            <header className="g-mb-30">
              <h1 className="g-font-weight-300">Dashboard</h1>
              <p className="g-color-white-opacity-0_8 g-font-size-16">Welcome to our application.</p>
            </header>
          </div>
        </section>

        <section className="g-py-50">
          <div className="container">
            <div className="u-shadow-v22 g-bg-white g-pa-20 g-pa-40--lg g-mt-minus-100 rounded g-mb-40">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h3 className="g-mb-20">Welcome to the Dashboard</h3>
                  <p className="g-mb-30">This is your application home page.</p>
                  
                  <div className="row justify-content-center">
                    <div className="col-md-3 mb-4">
                      <div className="card h-100 shadow-sm">
                        <div className="card-body text-center">
                          <i className="fa fa-file-text-o fa-3x mb-3"></i>
                          <h5>Documentation</h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 mb-4">
                      <div className="card h-100 shadow-sm">
                        <div className="card-body text-center">
                          <i className="fa fa-cog fa-3x mb-3"></i>
                          <h5>Settings</h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 mb-4">
                      <div className="card h-100 shadow-sm">
                        <div className="card-body text-center">
                          <i className="fa fa-user fa-3x mb-3"></i>
                          <h5>Profile</h5>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default Dashboard;
