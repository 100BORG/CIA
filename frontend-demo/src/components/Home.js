import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="display-4 text-center">Welcome to Our Platform</h1>
          <p className="lead text-center">Discover our powerful tools and services</p>
        </Col>
      </Row>
      
      <Row>
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Documentation</Card.Title>
              <Card.Text>
                Explore comprehensive guides and documentation to help you get started.
              </Card.Text>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Dashboard</Card.Title>
              <Card.Text>
                Access your personal dashboard to manage your projects and settings.
              </Card.Text>
              <Button variant="primary">Go to Dashboard</Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Support</Card.Title>
              <Card.Text>
                Need help? Our support team is ready to assist you with any questions.
              </Card.Text>
              <Button variant="primary">Contact Support</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
