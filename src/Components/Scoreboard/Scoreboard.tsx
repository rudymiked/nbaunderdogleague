import React from 'react';
import { Card, Container, Table, Row, Col } from 'react-bootstrap';
import { RootContext } from '../../services/Stores/RootStore';
import { IScore, ScoreCard, IScoreCardData } from './ScoreCard';
import './Scoreboard.css';
import { GetNBAScoreboard } from '../../services/data/GetRequests';

export interface IScoreboardProps {}

interface IScoreboardResponse {
    data: IScoreboardData[];
}
interface IScoreboardData {
    homeGovernor: string;
    homeLogo: string;
    homeTeam: string;
    homeScore: number;
    visitorsGovernor: string;
    visitorsLogo: string;
    visitorsTeam: string;
    visitorsScore: number;
} 

export const Scoreboard: React.FunctionComponent<IScoreboardProps> = (props: IScoreboardProps) => {
    const { state, dispatch } = React.useContext(RootContext);
    const [ scores, SetScores ] = React.useState<IScoreCardData[]>([]);

    React.useEffect(() => {
        GetNBAScoreboard(state.AppStore.GroupId).then((response: IScoreboardResponse) => {
            const data: IScoreboardData[] = response?.data;
            const scoreCardDataArray: IScoreCardData[] = [];

            for(const d of data) {
                const home: IScore = {
                    Governor: d.homeGovernor,
                    Team: d.homeTeam,
                    Score: d.homeScore,
                    Logo: d.homeLogo
                };

                const visitor: IScore = {
                    Governor: d.visitorsGovernor,
                    Team: d.visitorsTeam,
                    Score: d.visitorsScore,
                    Logo: d.visitorsLogo
                };

                scoreCardDataArray.push({
                    Home: home,
                    Visitor: visitor
                });
            }

            SetScores(scoreCardDataArray);
        }).catch((reason: any) =>{
            SetScores([]);
        });
    }, [])

    return (
        <Container style={{ padding: '5px', maxWidth: '95vw'}}>
            <Row className="scoreboardRow" style={{ flexWrap: 'nowrap' }}>
                {scores.map((score: IScoreCardData, index) => (
                    <Col key={index}>
                        <Card style={{ padding: '2px' }}>
                            <ScoreCard 
                                key={index} 
                                ScoreCardData={score} 
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}