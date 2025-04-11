import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <Header />
      <main className="container py-5">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="card border-0 shadow">
              <div className="card-body p-5">
                <h1 className="mb-4">Contact Us</h1>
                <p className="mb-5">Have questions or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.</p>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="subject" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea 
                      className="form-control" 
                      id="message" 
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="btn btn-primary">Send Message</button>
                </form>
              </div>
            </div>
            
            <div className="mt-5">
              <div className="row">
                <div className="col-md-4 mb-4">
                  <div className="card h-100 text-center">
                    <div className="card-body">
                      <i className="fa fa-map-marker fa-3x mb-3 text-primary" aria-hidden="true"></i>
                      <h5 className="card-title">Our Location</h5>
                      <p className="card-text">123 Innovation Street, Tech City, 12345</p>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4 mb-4">
                  <div className="card h-100 text-center">
                    <div className="card-body">
                      <i className="fa fa-phone fa-3x mb-3 text-primary" aria-hidden="true"></i>
                      <h5 className="card-title">Call Us</h5>
                      <p className="card-text">+1 (123) 456-7890</p>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4 mb-4">
                  <div className="card h-100 text-center">
                    <div className="card-body">
                      <i className="fa fa-envelope fa-3x mb-3 text-primary" aria-hidden="true"></i>
                      <h5 className="card-title">Email Us</h5>
                      <p className="card-text">info@example.com</p>
                    </div>
                  </div>
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

export default ContactUs;
