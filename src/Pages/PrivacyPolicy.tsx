import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

interface IPrivacyPolicyProps {}

export const PrivacyPolicy: React.FunctionComponent<IPrivacyPolicyProps> = () => {
    return (
        <Container style={{ padding: "10px" }}>
            <Row className="justify-content-md-center">
                <Col lg={10}>
                    <Card style={{ padding: "12px" }}>
                        <Card.Title className='card-title'>Privacy Policy</Card.Title>
                        <Card.Subtitle className="mb-3 text-muted">Last updated: March 17, 2026</Card.Subtitle>
                        <Card.Body>
                            <p>
                                This Privacy Policy describes how nbaunderdogleague collects, uses, and protects your
                                information when you use this website.
                            </p>
                            <h5>Information We Collect</h5>
                            <ul>
                                <li>Account information such as name and email address.</li>
                                <li>Usage data such as browser type, pages viewed, and session activity.</li>
                                <li>Technical information such as IP address and device metadata.</li>
                            </ul>

                            <h5>How We Use Information</h5>
                            <ul>
                                <li>To provide and improve fantasy league features.</li>
                                <li>To authenticate users and protect account security.</li>
                                <li>To communicate important updates and service notifications.</li>
                            </ul>

                            <h5>Data Sharing</h5>
                            <p>
                                We do not sell personal information. We may share limited information with service providers
                                that help operate the application, and when required by law.
                            </p>

                            <h5>Data Retention</h5>
                            <p>
                                We retain personal information only as long as necessary for service operations, compliance,
                                and security.
                            </p>

                            <h5>Your Choices</h5>
                            <p>
                                You may request access, correction, or deletion of your personal information by contacting us
                                at nbaunderdogleague@gmail.com.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
