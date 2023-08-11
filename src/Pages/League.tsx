import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Scoreboard } from "../Components/Scoreboard/Scoreboard";
import { GroupStandingsTable } from "../Components/Standings/GroupStandingsTable";
import { RootContext } from "../services/Stores/RootStore";
import { useNavigate } from "react-router-dom";
import { JoinOrSwitchGroupsButton } from "../Components/Shared/JoinOrSwitchGroupsButton";

interface ILeaguePageProps {}

export const League: React.FunctionComponent = (props: ILeaguePageProps) => {
    const { state } = React.useContext(RootContext);
    const navigate = useNavigate();
    
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <Scoreboard />
                </Col>
            </Row>
            <Row style={{padding: '10px'}} className="justify-content-md-center"> 
                <Col md="auto">
                    <Card style={{padding: '10px', maxWidth: '95vw'}}>
                        <Card.Title className='card-title'><b>{state.AppStore.GroupName}</b> Standings</Card.Title>
                        <Card.Body style={{overflow: 'auto'}}>
                            <GroupStandingsTable />
                            <hr />
                            <JoinOrSwitchGroupsButton />
                        </Card.Body>
                    </Card>
                </Col>
            </Row> 
        </Container>
    );
}