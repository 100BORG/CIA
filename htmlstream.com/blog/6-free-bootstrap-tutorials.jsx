import React from 'react';

const FreeBootstrapTutorials = () => {
  return (
    <div>
      <head>
        <meta name="description" content="Get familiar easily with one of the best frontend framework" />
        <meta name="keywords" itemProp="keywords" content="Get familiar easily with one of the best frontend framework" />
        <meta property="og:title" content="6 Free Bootstrap Tutorials" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="6-free-bootstrap-tutorials.html" />
        <meta property="og:image" content="../uploads/blog/thumbnails/5f32f4d404d869950601802b1e2aa3e7.jpg" />
        <meta property="og:site_name" content="6 Free Bootstrap Tutorials" />
        <meta property="og:description" content="Get familiar easily with one of the best frontend framework" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="6 Free Bootstrap Tutorials" />
        <meta name="twitter:description" content="Get familiar easily with one of the best frontend framework" />
        <meta name="twitter:image" content="../uploads/blog/thumbnails/5f32f4d404d869950601802b1e2aa3e7.jpg" />
      </head>
      <header id="js-header" className="u-header u-header--static">
        <div className="u-header__section u-header__section--light">
          <div className="container">
            <nav className="navbar navbar-expand-lg px-0">
              {/* Logo */}
              <a href="../index.html" className="navbar-brand">
                <img src="../assets/img/logo-mini.png" width="45" alt="Htmlstream Logo" />
              </a>
              {/* End Logo */}
            </nav>
          </div>
        </div>
      </header>
      {/* End Header */}
      <main className="g-bg-secondary">
        <section className="g-pt-40 g-pb-80">
          <div className="container">
            <article className="g-bg-white rounded g-pa-30 g-px-40--lg g-mb-30">
              <header className="g-width-60x--lg mx-auto g-mb-40">
                <div className="text-center">
                  <div className="g-mb-10">
                    <a className="btn btn-xs u-btn-outline-darkpurple g-mr-5 g-mb-10 g-mb-0--lg" href="#!">
                      Bootstrap 4
                    </a>
                    <a className="btn btn-xs u-btn-outline-indigo g-mr-5 g-mb-10 g-mb-0--lg" href="#!">
                      Code
                    </a>
                  </div>
                  <h1 className="h2 g-font-weight-300 g-mb-5">
                    <a className="u-link-v5 g-color-main g-color-primary--hover" href="#!">
                      6 Free Bootstrap Tutorials
                    </a>
                  </h1>
                  <p className="text-muted">Get familiar easily with one of the best frontend framework</p>
                </div>
              </header>
              <div className="row justify-content-center g-mb-40">
                <div className="col-12 col-lg-10">
                  <figure className="text-center g-mb-25">
                    <img
                      className="img-fluid u-shadow-v25 rounded g-mb-10"
                      src="https://htmlstream.com/uploads/blog/5f32f4d404d869950601802b1e2aa3e7.jpg"
                      alt="6 Free Bootstrap Tutorials"
                    />
                    <figcaption className="figure-caption">6 Free Bootstrap Tutorials</figcaption>
                  </figure>
                </div>
              </div>
              <div className="g-line-height-2">
                <p>
                  <span style={{ fontWeight: 400 }}>
                    It’s not a secret that Bootstrap is a handy framework which saves a web designer from headaches such
                    as taking care of website responsiveness, customisation of website elements, usage of Javascript
                    plugins and others.
                  </span>
                </p>
              </div>
            </article>
            {/* Social Shares */}
            <div className="addthis_inline_share_toolbox"></div>
            {/* End Social Shares */}
          </div>
        </section>
        {/* End Article */}
        <hr className="g-brd-gray-light-v4 g-mt-20 g-my-50" />
        {/* Similar Articles */}
        <section className="g-pt-40 g-pb-80">
          <div className="container">
            <header className="text-center g-mb-40">
              <h2 className="g-font-weight-300">Similar Articles</h2>
              <p className="g-font-size-16 g-color-accent">Discover more interesting Articles by Htmlstream</p>
            </header>
            <div className="row">
            </div>
          </div>
        </section>
        {/* End Similar Articles */}
      </main>
      {/* Subscribe */}
      <section
        className="g-bg-pos-center g-bg-no-repeat g-brd-y g-brd-gray-light-v4 g-py-50 g-py-100--lg"
        style={{ backgroundImage: 'url(../assets/img/programming-logos-colorful.png)' }}
      >
        <div className="container text-center">
          <h2 className="h4 g-font-weight-300 g-mb-30">
            Subscribe to get the latest Updates, Products and Freebies
          </h2>
          <div className="g-max-width-600 mx-auto">
            <form method="POST" action="https://htmlstream.com/api/subscribe" acceptCharset="UTF-8" id="subscribe">
              <input name="_token" type="hidden" value="C7YJHSHFw9wQHbnKoUfLlfM5qC3LlmkFHJLw9VI7" />
              <div className="input-group u-shadow-v22 rounded subscribe-wrap">
                <input
                  type="email"
                  className="form-control g-brd-gray-light-v4 g-brd-primary--focus g-brd-right-0 g-py-14 g-px-15"
                  name="email"
                  required
                  placeholder="Enter you email address"
                  aria-label="Enter you email address"
                />
                <span className="input-group-append">
                  <button className="btn btn-primary g-py-14 g-px-25 g-rounded-left-0" type="submit">
                    Subscribe
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* End Subscribe */}
      {/* Footer */}
      <footer className="g-bg-white g-pt-30 g-pb-15">
        <div className="container">
        </div>
      </footer>
      {/* End Footer */}
    </div>
  );
};

export default FreeBootstrapTutorials;
