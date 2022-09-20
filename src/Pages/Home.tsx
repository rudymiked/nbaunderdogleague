import React from 'react';
import { Card } from 'react-bootstrap';
import { HttpService } from '../services/Http/HttpService';

interface IHomePageProps {}
export const Home: React.FunctionComponent = (props: IHomePageProps) => {

    return (
        <div className='PageBody'>
            <Card style={{padding: '10px'}}>
                <Card.Title>{"Home"}</Card.Title>
                <Card.Body>
                    Welcome Nerds
                </Card.Body>
            </Card>
        </div>
    );
}