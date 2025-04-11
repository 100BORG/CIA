import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import ContactUs from './components/ContactUs';
import SignupBasic from './components/SignupBasic';
import FrontPage from './components/FrontPage';
import FrontDashboard from './components/FrontDashboard';
import SpacePage from './components/SpacePage';
import LaunchComingSoon from './components/LaunchComingSoon';
import DocsUIKit from './components/DocsUIKit';

// Simple loading component
const Loading = () => <div className="d-flex justify-content-center m-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;

// Simple error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Component error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="container mt-5 text-center">
        <h2>Something went wrong.</h2>
        <p>We couldn't load this page. Please try refreshing or contact support if the issue persists.</p>
      </div>;
    }

    return this.props.children; 
  }
}

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/terms-and-conditions" component={TermsAndConditions} />
            <Route path="/contact-us" component={ContactUs} />
            <Route path="/signup" component={SignupBasic} />
            <Route path="/front" component={FrontPage} />
            <Route path="/front-dashboard" component={FrontDashboard} />
            <Route path="/space" component={SpacePage} />
            <Route path="/coming-soon" component={LaunchComingSoon} />
            <Route path="/docs-ui-kit" component={DocsUIKit} />
            {/* Add a fallback route for 404 pages */}
            <Route path="*">
              <Redirect to="/coming-soon" />
            </Route>
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
