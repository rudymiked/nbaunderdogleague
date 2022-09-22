import React from 'react';
import { Card } from 'react-bootstrap';

interface IDraftPageProps {}
export const Draft: React.FunctionComponent = (props: IDraftPageProps) => {

    return (
        <div className='PageBody'>
            <Card style={{padding: '10px'}}>
                <Card.Title>{"Draft"}</Card.Title>
                <Card.Body>
                    You're up in the draft.
                    Choose your team:
                </Card.Body>
            </Card>
        </div>
    );
}