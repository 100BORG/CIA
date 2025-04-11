import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header id="js-header" className="u-header u-header--static">
      <div className="u-header__section u-header__section--light">
        <div className="container">
          <nav className="navbar navbar-expand-lg px-0">
            <Link to="/" className="navbar-brand">
              <img src="/assets/img/logo-mini.png" width="45" alt="Logo" />
            </Link>
            <button className="navbar-toggler navbar-toggler-right btn g-brd-gray-light-v4"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navBar"
                    aria-controls="navBar"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
              <span className="g-font-size-default">
                <i className="icon-menu g-pos-rel g-top-1 mr-1"></i> Menu
              </span>
            </button>
            <div className="collapse navbar-collapse g-pt-10 g-pt-0--lg" id="navBar">
              <ul className="navbar-nav ml-auto text-uppercase g-font-weight-600 u-main-nav-v2">
                <li className="nav-item g-mx-2--md g-mx-5--xl">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item g-mx-2--md g-mx-5--xl">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item g-mx-2--md g-mx-5--xl">
                  <Link className="nav-link" to="/contact">Contact</Link>
                </li>
                <li className="nav-item g-mx-2--md g-mx-5--xl">
                  <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
