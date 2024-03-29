import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { CURRENT_YEAR, NBA_END_DATE, NBA_START_DATE } from "../Utils/AppConstants";
import { JoinGroup } from "../Components/Profile/JoinGroup";

interface IJoinPageProps {
    groupId?: string;
}

export const Join: React.FunctionComponent<IJoinPageProps> = (props: IJoinPageProps) => {
	const [refresh, SetRefresh] = React.useState<number>(0);

    return (
        <Container style={{maxWidth: '100%'}}>
            <Row style={{padding: '10px', minHeight: '300px'}}>
            {(new Date()).getTime() < NBA_START_DATE.getTime() && (new Date()).getTime() > NBA_END_DATE.getTime() ? (
                <Card style={{padding: '10px'}}>
                    <Card.Title className='card-title'>Welcome to {CURRENT_YEAR} NBA fantasy!</Card.Title>
                    <Card.Body style={{overflow: 'auto'}}>
                        <Row>
                            <Col>
                                <JoinGroup {...{
                                    refresh
                                }} />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                ) : ( (new Date()).getTime() < NBA_START_DATE.getTime() ? (
                    <span>NBA Season has not begun. Please visit after {NBA_START_DATE.toDateString()}</span>
                    ) : (
                        <span>NBA Season has not ended. Please visit after {NBA_END_DATE.toDateString()}</span>
                    )
                )
            }
            </Row>
        </Container>
    );
}