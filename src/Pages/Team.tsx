import React from 'react';
import { Card } from 'react-bootstrap';

interface ITeamPageProps {}

export const Team: React.FC = (props: ITeamPageProps) => {
    return (
        <div className='PageBody'>
            <Card body>My Team</Card>
        </div>
    );
}