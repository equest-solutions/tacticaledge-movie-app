import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function DefaultLayout({ PageComponent }) {
  return (
    <Container fluid={true} className="p-0">
      <Row className="m-0">
        <Col lg={6} className="p-0">
          <PageComponent />
        </Col>
      </Row>
    </Container>
  );
}

export default DefaultLayout;
