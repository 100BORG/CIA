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
            <polygon fill="#fff" points="0,273 1921,273 1921,0 " />
          </svg>
        </div>
      </div>

      <div className="container py-5 py-sm-7">
        <Link className="d-flex justify-content-center mb-5" to="/">
          <img className="zi-2" src="/assets/svg/logos/logo.svg" alt="Logo" style={{ width: '8rem' }} />
        </Link>

        <div className="mx-auto" style={{ maxWidth: '30rem' }}>
          <div className="card card-lg mb-5">
            <div className="card-body">
              <form className="js-validate needs-validation" noValidate onSubmit={handleSubmit}>
                <div className="text-center">
                  <div className="mb-5">
                    <h1 className="display-5">Create your account</h1>
                    <p>Already have an account? <Link className="link" to="/login">Sign in here</Link></p>
                  </div>

                  <div className="d-grid mb-4">
                    <a className="btn btn-white btn-lg" href="#">
                      <span className="d-flex justify-content-center align-items-center">
                        <img className="avatar avatar-xss me-2" src="/assets/svg/brands/google-icon.svg" alt="Google" />
                        Sign up with Google
                      </span>
                    </a>
                  </div>

                  <span className="divider-center text-muted mb-4">OR</span>
                </div>

                <label className="form-label" htmlFor="fullNameSrEmail">Full name</label>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="mb-4">
                      <input 
                        type="text" 
                        className="form-control form-control-lg" 
                        name="firstName" 
                        id="fullNameSrEmail" 
                        placeholder="First name" 
                        required 
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                      <span className="invalid-feedback">Please enter your first name.</span>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="mb-4">
                      <input 
                        type="text" 
                        className="form-control form-control-lg" 
                        name="lastName"
                        placeholder="Last name" 
                        required 
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                      <span className="invalid-feedback">Please enter your last name.</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label" htmlFor="signupSrEmail">Your email</label>
                  <input 
                    type="email" 
                    className="form-control form-control-lg" 
                    name="email" 
                    id="signupSrEmail" 
                    placeholder="email@example.com" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <span className="invalid-feedback">Please enter a valid email address.</span>
                </div>

                <div className="mb-4">
                  <label className="form-label" htmlFor="signupSrPassword">Password</label>
                  <div className="input-group">
                    <input 
                      type="password" 
                      className="form-control form-control-lg" 
                      name="password" 
                      id="signupSrPassword" 
                      placeholder="8+ characters required" 
                      required 
                      minLength="8" 
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <span className="invalid-feedback">Your password is invalid. Please try again.</span>
                </div>

                <div className="mb-4">
                  <label className="form-label" htmlFor="signupSrConfirmPassword">Confirm password</label>
                  <div className="input-group">
                    <input 
                      type="password" 
                      className="form-control form-control-lg" 
                      name="confirmPassword" 
                      id="signupSrConfirmPassword" 
                      placeholder="8+ characters required" 
                      required 
                      minLength="8" 
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <span className="invalid-feedback">Password does not match the confirm password.</span>
                </div>

                <div className="form-check mb-4">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="termsCheckbox" 
                    name="termsAccepted"
                    required 
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="termsCheckbox">
                    I accept the <Link to="/terms-and-conditions">Terms and Conditions</Link>
                  </label>
                  <span className="invalid-feedback">Please accept our Terms and Conditions.</span>
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary btn-lg">Create an account</button>
                  <button type="button" className="btn btn-link">
                    or Start your 30-day trial <i className="bi-chevron-right"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="position-relative text-center zi-1">
            <small className="text-cap text-body mb-4">Trusted by the world's best teams</small>

            <div className="w-85 mx-auto">
              <div className="row justify-content-between">
                <div className="col">
                  <img className="img-fluid" src="/assets/svg/brands/gitlab-gray.svg" alt="Logo" />
                </div>
                <div className="col">
                  <img className="img-fluid" src="/assets/svg/brands/fitbit-gray.svg" alt="Logo" />
                </div>
                <div className="col">
                  <img className="img-fluid" src="/assets/svg/brands/flow-xo-gray.svg" alt="Logo" />
                </div>
                <div className="col">
                  <img className="img-fluid" src="/assets/svg/brands/layar-gray.svg" alt="Logo" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignupBasic;
