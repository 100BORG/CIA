import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="g-bg-white g-pt-30 g-pb-15">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-lg g-mt-30 g-mt-0--lg g-mb-20 g-mb-0--lg">
            <small className="d-block g-font-size-default g-mb-10">© {new Date().getFullYear()} All Rights Reserved.</small>

            <ul className="u-list-inline">
              <li className="list-inline-item g-mr-15">
                <a target="_blank" title="Github" href="https://github.com/htmlstreamofficial" rel="noopener noreferrer">
                  <i className="fa fa-github g-color-black"></i>
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg text-lg-right">
            <ul className="u-list-inline">
              <li className="list-inline-item g-mr-15">
                <Link className="g-color-main g-color-primary--hover" to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li className="list-inline-item g-mr-15">
                <Link className="g-color-main g-color-primary--hover" to="/terms-and-conditions">Terms of Use</Link>
              </li>
              <li className="list-inline-item g-mr-15">
                <Link className="g-color-main g-color-primary--hover" to="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
