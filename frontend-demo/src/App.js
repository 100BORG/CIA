import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import components (these will be created in subsequent steps)
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const PrivacyPolicy = React.lazy(() => import('./components/PrivacyPolicy'));
const TermsAndConditions = React.lazy(() => import('./components/TermsAndConditions'));
const ContactUs = React.lazy(() => import('./components/ContactUs'));
const SignupBasic = React.lazy(() => import('./components/SignupBasic'));
const FrontPage = React.lazy(() => import('./components/FrontPage'));
const FrontDashboard = React.lazy(() => import('./components/FrontDashboard'));
const SpacePage = React.lazy(() => import('./components/SpacePage'));
const LaunchComingSoon = React.lazy(() => import('./components/LaunchComingSoon'));
const DocsUIKit = React.lazy(() => import('./components/DocsUIKit'));

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
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/signup" element={<SignupBasic />} />
            <Route path="/front-dashboard" element={<FrontDashboard />} />
            <Route path="/space" element={<SpacePage />} />
            <Route path="/coming-soon" element={<LaunchComingSoon />} />
            <Route path="/docs" element={<DocsUIKit />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
