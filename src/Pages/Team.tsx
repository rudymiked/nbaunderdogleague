import React from 'react';
import { Card } from 'react-bootstrap';

interface ITeamPageProps {}

export const Team: React.FC = (props: ITeamPageProps) => {
    return (
        <div className='PageBody'>
			<Card style={{padding: '10px'}}>
            	<Card.Title>My Team</Card.Title>
			</Card>
        </div>
    );
}