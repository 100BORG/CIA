import React from 'react';

const LaunchComingSoon = () => {
  return (
    <div className="container text-center">
      <h1>Coming Soon</h1>
      <p>
        Subscribe to get the latest updates, products, and freebies.
      </p>
      <form method="POST" action="https://htmlstream.com/api/subscribe">
        <input type="email" name="email" placeholder="Enter your email" required />
        <button type="submit" className="btn btn-primary">Subscribe</button>
      </form>
    </div>
  );
};

export default LaunchComingSoon;
