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
              <ul className="navbar-nav g-font-size-default mr-auto">
                <li className="nav-item g-mx-15--lg">
                  <Link to="/" className="nav-link g-color-primary--hover px-0">Dashboard</Link>
                </li>
                <li className="nav-item g-mx-15--lg">
                  <Link to="/front" className="nav-link g-color-primary--hover px-0">Front</Link>
                </li>
                <li className="nav-item g-mx-15--lg">
                  <Link to="/front-dashboard" className="nav-link g-color-primary--hover px-0">Front Dashboard</Link>
                </li>
                <li className="nav-item g-mx-15--lg">
                  <Link to="/space" className="nav-link g-color-primary--hover px-0">Space</Link>
                </li>
                <li className="nav-item g-mx-15--lg">
                  <Link to="/docs-ui-kit" className="nav-link g-color-primary--hover px-0">UI Kit</Link>
                </li>
              </ul>

              <ul className="u-list-inline ml-auto">
                <li className="list-inline-item g-ml-0 mx-3 d-none d-sm-inline-block">
                  <Link to="/login">Login</Link>
                </li>
                <li className="list-inline-item g-ml-0">
                  <Link className="btn u-btn-primary" to="/signup">Sign Up Free</Link>
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
