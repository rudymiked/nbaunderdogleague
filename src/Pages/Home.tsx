import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Scoreboard } from "../Components/Scoreboard/Scoreboard";
import { TeamsTable } from "../Components/Stats/TeamsTable";
import { GroupStandingsTable } from "../Components/Standings/GroupStandingsTable";
import { RootContext } from "../services/Stores/RootStore";
import { JoinOrSwitchGroupsButton } from "../Components/Shared/JoinOrSwitchGroupsButton";
import { PlayerStatsTable } from "../Components/Stats/PlayerStatsTable";
import { LinkButton } from "../Components/Shared/LinkButton";
import { PleaseLogin } from "../Components/Shared/PleaseLogin";
import { LoginEnum } from "../services/Stores/AppReducer";

interface IHomePageProps {}

const TeamStandingsTitle: string = "NBA Standings";
const PLayerStatsTitle: string = "Players";
const GroupStandingsTitle: string = "Standings";
const PlayFantasyTitle: string = "Play Fantasy";

export const Home: React.FunctionComponent = (props: IHomePageProps) => {
    const { state, dispatch } = React.useContext(RootContext);
    
    return (
        <Container style={{maxWidth: '90vw'}}>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <Scoreboard />
                </Col>
            </Row>
            <Row style={{padding: '10px'}} className="justify-content-md-center"> 
                {state.AppStore.LoginStatus === LoginEnum.Success ? (
                    <Col style={{padding: '10px'}} md="auto">
                        <Card style={{padding: '10px', maxWidth: '95vw'}}>
                            <Card.Title className='card-title'>{state.AppStore.GroupName ? `${state.AppStore.GroupName} ${GroupStandingsTitle}` : GroupStandingsTitle}</Card.Title>
                            <Card.Body style={{overflow: 'auto'}}>
                                <GroupStandingsTable />
                                <hr />
                                <JoinOrSwitchGroupsButton />
                            </Card.Body>
                        </Card>
                    </Col>
                ) : (
                    <Col style={{padding: '10px'}} md="auto">
                        <Card style={{padding: '10px', maxWidth: '95vw'}}>
                            <Card.Title className='card-title'>{PlayFantasyTitle}</Card.Title>
                            <Card.Body style={{overflow: 'auto'}}>
                                <PleaseLogin />
                            </Card.Body>
                        </Card>
                    </Col>
                )}
                <Col style={{padding: '10px'}} md="auto">
                    <Card style={{padding: '10px', maxWidth: '95vw'}}>
                        <Card.Title className='card-title'>{TeamStandingsTitle}</Card.Title>
                        <Card.Body style={{overflow: 'auto'}}>
                            <TeamsTable />
                            <hr />
                            <LinkButton text={"See More"} url={"/teams"} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col style={{padding: '10px'}} md="auto">
                    <Card style={{padding: '10px', maxWidth: '95vw'}}>
                        <Card.Title className='card-title'>{PLayerStatsTitle}</Card.Title>
                        <Card.Body style={{overflow: 'auto'}}>
                            <PlayerStatsTable rowsDisplayed={30} />
                            <hr />
                            <LinkButton text={"See More"} url={"/players"} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}