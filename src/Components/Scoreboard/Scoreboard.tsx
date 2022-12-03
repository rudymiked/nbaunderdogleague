import React from 'react';
import { Card, Container, Table, Row, Col } from 'react-bootstrap';
import { RootContext } from '../../services/Stores/RootStore';
import { IScore, ScoreCard, IScoreCardData } from './ScoreCard';
import './Scoreboard.css';

export interface IScoreboardProps {}

export const Scoreboard: React.FunctionComponent<IScoreboardProps> = (props: IScoreboardProps) => {
    const { state, dispatch } = React.useContext(RootContext);
    const [ scores, SetScores ] = React.useState<IScoreCardData[]>([]);

    React.useEffect(() => {
        const team1: IScore = {
            Governor: "CATlanta Hawks",
            Team: "Hawks",
            Score: 100,
            Logo: "https://upload.wikimedia.org/wikipedia/fr/e/ee/Hawks_2016.png",
        };

        const team2: IScore = {
            Governor: "TylerMurt",
            Team: "Pacers",
            Score: 90,
            Logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/c/cf/Pacers_de_l%27Indiana_logo.svg/1180px-Pacers_de_l%27Indiana_logo.svg.png",
        };

        const scoreCardDataArray: IScoreCardData[] = [];

        scoreCardDataArray.push({
            Winner: team1,
            Loser: team2,
        });
        scoreCardDataArray.push({
            Winner: team1,
            Loser: team2,
        });
        scoreCardDataArray.push({
            Winner: team1,
            Loser: team2,
        });
        scoreCardDataArray.push({
            Winner: team1,
            Loser: team2,
        });
        scoreCardDataArray.push({
            Winner: team1,
            Loser: team2,
        });

        SetScores(scoreCardDataArray);
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