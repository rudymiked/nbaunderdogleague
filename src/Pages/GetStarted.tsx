import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Scoreboard } from "../Components/Scoreboard/Scoreboard";
import { CURRENT_YEAR, NBA_END_DATE, NBA_START_DATE } from "../Utils/AppConstants";
import { JoinGroup } from "../Components/Profile/JoinGroup";
import { CreateGroup } from "../Components/Profile/CreateGroup";
import { GroupStandingsTable } from "../Components/Standings/GroupStandingsTable";

interface IGetStartedPageProps {}

export const GetStarted: React.FunctionComponent = (props: IGetStartedPageProps) => {
    const [refresh, SetRefresh] = React.useState<number>(0);

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <Scoreboard />
                </Col>
            </Row>
            {(new Date()).getTime() < NBA_START_DATE.getTime() && (new Date()).getTime() > NBA_END_DATE.getTime() ? ( // pre-season
                <Row style={{padding: '10px', minHeight: '300px'}}>
                    <Card style={{padding: '10px'}}>
                        <Card.Title className='card-title'>Welcome to {CURRENT_YEAR} NBA Underdogs!</Card.Title>
                        <Card.Body style={{overflow: 'auto'}}>
                            <Row>
                                <Col>
                                    <JoinGroup {...{
                                        refresh
                                    }} />
                                </Col>
                                <Col>
                                    <CreateGroup {...{refresh, SetRefresh}} />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Row>
            ) : ( // Season has begun
                <Row style={{padding: '10px'}} className="justify-content-md-center"> 
                    <Col md="auto">
                        <GroupStandingsTable /> 
                    </Col>
                </Row> 
            )}
        </Container>
    );
}