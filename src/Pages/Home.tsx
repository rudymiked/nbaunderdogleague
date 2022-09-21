import React from 'react';
import { Card } from 'react-bootstrap';

interface IHomePageProps {}
export const Home: React.FunctionComponent = (props: IHomePageProps) => {

    return (
        <div className='PageBody'>
            <Card style={{padding: '10px'}}>
                <Card.Title>{"Home"}</Card.Title>
                <Card.Body>
                    It's Basketball Season
                </Card.Body>
            </Card>
        </div>
    );
}