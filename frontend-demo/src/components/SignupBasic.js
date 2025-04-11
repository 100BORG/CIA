import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const SignupBasic = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Account created successfully!');
  };

  return (
    <main id="content" role="main" className="main">
      <div className="position-fixed top-0 end-0 start-0 bg-img-start" style={{ height: '32rem', backgroundImage: 'url(/assets/svg/components/card-6.svg)' }}>
        <div className="shape shape-bottom zi-1">
          <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1921 273">
            <polygon fill="#fff" points="0,273 1921,273 1921,0 "/>
          </svg>
        </div>
      </div>

      <div className="container py-5 py-sm-7">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-5">
            <div className="card card-lg mb-5">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="text-center">
                    <div className="mb-5">
                      <h1 className="display-5">Create your account</h1>
                      <p>Already have an account? <Link to="/login">Sign in here</Link></p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label" htmlFor="firstName">First name</label>
                    <input 
                      type="text" 
                      className="form-control form-control-lg" 
                      name="firstName" 
                      id="firstName" 
                      placeholder="Enter your first name" 
                      value={formData.firstName} 
                      onChange={handleChange}
                      required 
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label" htmlFor="lastName">Last name</label>
                    <input 
                      type="text" 
                      className="form-control form-control-lg" 
                      name="lastName" 
                      id="lastName" 
                      placeholder="Enter your last name" 
                      value={formData.lastName} 
                      onChange={handleChange}
                      required 
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label" htmlFor="email">Your email</label>
                    <input 
                      type="email" 
                      className="form-control form-control-lg" 
                      name="email" 
                      id="email" 
                      placeholder="email@site.com" 
                      value={formData.email} 
                      onChange={handleChange}
                      required 
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input 
                      type="password" 
                      className="form-control form-control-lg" 
                      name="password" 
                      id="password" 
                      placeholder="8+ characters required" 
                      value={formData.password} 
                      onChange={handleChange}
                      required 
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label" htmlFor="confirmPassword">Confirm password</label>
                    <input 
                      type="password" 
                      className="form-control form-control-lg" 
                      name="confirmPassword" 
                      id="confirmPassword" 
                      placeholder="Confirm your password" 
                      value={formData.confirmPassword} 
                      onChange={handleChange}
                      required 
                    />
                  </div>

                  <div className="form-check mb-4">
                    <input 
                      type="checkbox" 
                      className="form-check-input" 
                      id="termsAccepted" 
                      name="termsAccepted" 
                      checked={formData.termsAccepted} 
                      onChange={handleChange}
                      required 
                    />
                    <label className="form-check-label" htmlFor="termsAccepted">
                      I accept the <Link to="/terms">Terms and Conditions</Link>
                    </label>
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg">Create an account</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default SignupBasic;
