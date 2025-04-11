import React, { useState } from 'react';
import Footer from './Footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    alert('Thank you for your message. We will get back to you soon!');
  };

  return (
    <>
      <main className="g-bg-secondary">
        <section className="g-bg-pos-center g-bg-no-repeat g-bg-gray-dark-v1 g-py-100" style={{ backgroundImage: "url('assets/img/programming-logos.png')" }}>
          <div className="container text-center g-color-white">
            <header className="g-mb-30">
              <h1 className="g-font-weight-300">Contact Us</h1>
              <p className="g-color-white-opacity-0_8 g-font-size-16">Get in touch with our team.</p>
            </header>
          </div>
        </section>

        <section className="g-py-50">
          <div className="container">
            <div className="u-shadow-v22 g-bg-white g-pa-20 g-pa-40--lg g-mt-minus-100 rounded g-mb-40">
              <div className="row">
                <div className="col-md-6">
                  <div className="g-mb-40">
                    <h2 className="h3">Get in Touch</h2>
                    <p>We'd love to hear from you. Please fill out the form and we'll get back to you as soon as possible.</p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="form-label" htmlFor="name">Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name="name" 
                        placeholder="John Doe" 
                        required 
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label" htmlFor="email">Email</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        name="email" 
                        placeholder="johndoe@example.com" 
                        required 
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label" htmlFor="message">Message</label>
                      <textarea 
                        className="form-control" 
                        id="message" 
                        name="message" 
                        rows="6" 
                        placeholder="Your message here..." 
                        required 
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary">Send Message</button>
                  </form>
                </div>

                <div className="col-md-6 d-flex align-items-center">
                  <div className="g-ml-40--lg">
                    <div className="g-mb-20">
                      <h3 className="h5">Email</h3>
                      <a href="mailto:info@example.com">info@example.com</a>
                    </div>

                    <div className="g-mb-20">
                      <h3 className="h5">Address</h3>
                      <p>123 Business Avenue<br />Seattle, WA 98999</p>
                    </div>

                    <div className="g-mb-20">
                      <h3 className="h5">Social</h3>
                      <ul className="list-inline">
                        <li className="list-inline-item g-mx-2">
                          <a className="btn btn-sm btn-icon btn-soft-dark rounded-circle" href="https://github.com/htmlstreamofficial" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-github"></i>
                          </a>
                        </li>
                        <li className="list-inline-item g-mx-2">
                          <a className="btn btn-sm btn-icon btn-soft-dark rounded-circle" href="https://twitter.com/htmlstream" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                          </a>
                        </li>
                      </ul>
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

export default ContactUs;
