import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Scoreboard } from "../Components/Scoreboard/Scoreboard";
import { GroupStandings } from "./GroupStandings";

interface IHomePageProps {}

export const Home: React.FunctionComponent = (props: IHomePageProps) => {

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <Scoreboard />
                </Col>
            </Row>
            <Row className="justify-content-md-center"> 
                <Col md="auto">
                    <GroupStandings /> 
                </Col>
            </Row>
        </Container>
    );
}