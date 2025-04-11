import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const LaunchComingSoon = () => {
  return (
    <>
      <main className="text-center py-5">
        <div className="container">
          <h1 className="display-1">Coming Soon</h1>
          <p className="lead">We're working hard to bring you something amazing. Stay tuned!</p>
          <div className="countdown my-5">
            <div className="row">
              <div className="col-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-3">
                    <h2 className="display-4">00</h2>
                    <p>Days</p>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-3">
                    <h2 className="display-4">00</h2>
                    <p>Hours</p>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-3">
                    <h2 className="display-4">00</h2>
                    <p>Minutes</p>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-3">
                    <h2 className="display-4">00</h2>
                    <p>Seconds</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LaunchComingSoon;
