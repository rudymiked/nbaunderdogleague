import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

interface ITermsOfServiceProps {}

export const TermsOfService: React.FunctionComponent<ITermsOfServiceProps> = () => {
    return (
        <Container style={{ padding: "10px" }}>
            <Row className="justify-content-md-center">
                <Col lg={10}>
                    <Card style={{ padding: "12px" }}>
                        <Card.Title className='card-title'>Terms of Service</Card.Title>
                        <Card.Subtitle className="mb-3 text-muted">Last updated: March 17, 2026</Card.Subtitle>
                        <Card.Body>
                            <p>
                                By using nbaunderdogleague, you agree to these Terms of Service. If you do not agree,
                                do not use the site.
                            </p>

                            <h5>Use of Service</h5>
                            <ul>
                                <li>You must provide accurate account information.</li>
                                <li>You are responsible for activity under your account.</li>
                                <li>You agree not to misuse, disrupt, or reverse engineer the service.</li>
                            </ul>

                            <h5>Fantasy Data and Content</h5>
                            <ul>
                                <li>League standings and player data are provided for informational purposes.</li>
                                <li>We may update features or data sources at any time.</li>
                            </ul>

                            <h5>Account and Access</h5>
                            <p>
                                We may suspend or terminate accounts that violate these terms or threaten platform security.
                            </p>

                            <h5>Disclaimer</h5>
                            <p>
                                The service is provided "as is" without warranties of any kind, to the extent permitted by law.
                            </p>

                            <h5>Contact</h5>
                            <p>Questions about these terms can be sent to nbaunderdogleague@gmail.com.</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
