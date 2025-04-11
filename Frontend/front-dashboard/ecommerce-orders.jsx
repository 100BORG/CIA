import React from "react";

const EcommerceOrders = () => {
  return (
    <body className="has-navbar-vertical-aside navbar-vertical-aside-show-xl footer-offset">
      <aside className="js-navbar-vertical-aside navbar navbar-vertical-aside navbar-vertical navbar-vertical-fixed navbar-expand-xl navbar-bordered bg-white">
        <div className="navbar-vertical-container">
          <div className="navbar-vertical-footer-offset">
            <div className="navbar-vertical-content">
              <div id="navbarVerticalMenu" className="nav nav-pills nav-vertical card-navbar-nav">
                <div id="navbarVerticalMenuPagesMenu">
                  <div className="nav-item">
                    <div
                      id="navbarVerticalMenuAuthentication"
                      className="nav-collapse collapse"
                      data-bs-parent="#navbarVerticalMenu"
                    >
                      <div id="navbarVerticalMenuAuthenticationMenu">
                        <div className="nav-item">
                          <a
                            className="nav-link dropdown-toggle"
                            href="#navbarVerticalMenuAuthenticationSignupMenu"
                            role="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarVerticalMenuAuthenticationSignupMenu"
                            aria-expanded="false"
                            aria-controls="navbarVerticalMenuAuthenticationSignupMenu"
                          >
                            Sign Up
                          </a>
                          <div
                            id="navbarVerticalMenuAuthenticationSignupMenu"
                            className="nav-collapse collapse"
                            data-bs-parent="#navbarVerticalMenuAuthenticationMenu"
                          >
                            <a className="nav-link" href="authentication-signup-basic.html">
                              Basic
                            </a>
                            <a className="nav-link" href="authentication-signup-cover.html">
                              Cover
                            </a>
                          </div>
                        </div>
                        <div className="nav-item">
                          <a
                            className="nav-link dropdown-toggle"
                            href="#navbarVerticalMenuAuthenticationResetPasswordMenu"
                            role="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarVerticalMenuAuthenticationResetPasswordMenu"
                            aria-expanded="false"
                            aria-controls="navbarVerticalMenuAuthenticationResetPasswordMenu"
                          >
                            Reset Password
                          </a>
                          <div
                            id="navbarVerticalMenuAuthenticationResetPasswordMenu"
                            className="nav-collapse collapse"
                            data-bs-parent="#navbarVerticalMenuAuthenticationMenu"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </body>
  );
};

export default EcommerceOrders;
