import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Dashboard = () => {
  return (
    <>
      <Header />
      <main className="container py-5">
        <h1 className="mb-4">Dashboard</h1>
        
        <div className="row">
          <div className="col-md-3 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Users</h5>
                <h2 className="card-text">1,254</h2>
                <p className="text-success">+5% from last week</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-3 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Revenue</h5>
                <h2 className="card-text">$15,632</h2>
                <p className="text-success">+12% from last month</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-3 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Orders</h5>
                <h2 className="card-text">243</h2>
                <p className="text-danger">-2% from yesterday</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-3 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Visits</h5>
                <h2 className="card-text">6,543</h2>
                <p className="text-success">+15% from last week</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="row mt-4">
          <div className="col-md-8 mb-4">
            <div className="card">
              <div className="card-header">
                Recent Activity
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    New user registered
                    <span className="badge bg-primary rounded-pill">Just now</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    New order received
                    <span className="badge bg-primary rounded-pill">5 mins ago</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Server rebooted
                    <span className="badge bg-primary rounded-pill">23 mins ago</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-header">
                Quick Actions
              </div>
              <div className="card-body">
                <div className="list-group">
                  <button type="button" className="list-group-item list-group-item-action">Create New User</button>
                  <button type="button" className="list-group-item list-group-item-action">View Reports</button>
                  <button type="button" className="list-group-item list-group-item-action">Update Settings</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
