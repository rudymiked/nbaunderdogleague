import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Scoreboard } from "../Components/Scoreboard/Scoreboard";
import { TeamsTable } from "../Components/Stats/TeamsTable";
import { GroupStandingsTable } from "../Components/Standings/GroupStandingsTable";
import { RootContext } from "../services/Stores/RootStore";
import { JoinOrSwitchGroupsButton } from "../Components/Shared/JoinOrSwitchGroupsButton";
import { PlayerStatsTable } from "../Components/Stats/PlayerStatsTable";
import { LinkButton } from "../Components/Shared/LinkButton";
import { PleaseLogin } from "../Components/Shared/PleaseLogin";
import { LoginEnum } from "../services/Stores/AppReducer";
import { GetMeFromAPI } from "../services/data/GetRequests";
import { useNavigate } from "react-router-dom";

interface IHomePageProps {}

const TeamStandingsTitle: string = "NBA Standings";
const PLayerStatsTitle: string = "Players";
const GroupStandingsTitle: string = "Standings";
const PlayFantasyTitle: string = "Play Fantasy";

export const Home: React.FunctionComponent = (props: IHomePageProps) => {
    const { state, dispatch } = React.useContext(RootContext);

    const navigate = useNavigate();

    // React.useEffect(() => {
    //     if (state.AppStore.LoginStatus === LoginEnum.Success) {
    //         GetMeFromAPI().then((response: any) => {
    //             console.log(response);
    //         }).catch((reason: any) => {
    //             console.log(reason);
    //         });
    //     }
	// }, [state.AppStore.LoginStatus]);
    
    return (
        <Container style={{maxWidth: '100vw'}}>
            <Row className="justify-content-md-center">
                <Col style={{padding: '5px'}} md="auto">
                    <Scoreboard />
                </Col>
            </Row>
            <Row style={{padding: '5px'}} className="justify-content-md-center"> 
                {state.AppStore.LoginStatus === LoginEnum.Success ? (
                    <Col style={{padding: '5px'}} md="auto">
                        <Card style={{padding: '5px', maxWidth: '100vw'}}>
                            <Card.Title className='card-title'>{state.AppStore.GroupName ? `${state.AppStore.GroupName} ${GroupStandingsTitle}` : GroupStandingsTitle}</Card.Title>
                            <Card.Body style={{overflow: 'auto'}}>
                                <GroupStandingsTable abbreviated={true} />
                            </Card.Body>
                            <Card.Footer>
                                <Button
                                    onClick={() => navigate("/league")}
                                    aria-controls="league"
                                    variant={"dark"}>
                                    {state.AppStore.GroupName}
                                </Button>
                                <hr />
                                <JoinOrSwitchGroupsButton />
                            </Card.Footer>
                        </Card>
                    </Col>
                ) : (
                    <Col style={{padding: '5px'}} md="auto">
                        <Card style={{padding: '5px', maxWidth: '100vw'}}>
                            <Card.Title className='card-title'>{PlayFantasyTitle}</Card.Title>
                            <Card.Body style={{overflow: 'auto'}}>
                                <PleaseLogin />
                            </Card.Body>
                        </Card>
                    </Col>
                )}
                <Col style={{padding: '5px'}} md="auto">
                    <Card style={{padding: '5px', maxWidth: '100vw'}}>
                        <Card.Title className='card-title'>{TeamStandingsTitle}</Card.Title>
                        <Card.Body style={{overflow: 'auto'}}>
                            <TeamsTable rowsDisplayed={10} />
                        </Card.Body>
                        <Card.Footer>
                            <LinkButton text={"See More"} url={"/teams"} />
                        </Card.Footer>
                    </Card>
                </Col>
                <Col style={{padding: '5px'}} md="auto">
                    <Card style={{padding: '5px', maxWidth: '100vw'}}>
                        <Card.Title className='card-title'>{PLayerStatsTitle}</Card.Title>
                        <Card.Body style={{overflow: 'auto'}}>
                            <PlayerStatsTable rowsDisplayed={10} />
                        </Card.Body>
                        <Card.Footer>
                            <LinkButton text={"See More"} url={"/players"} />
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}