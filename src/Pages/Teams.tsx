import React from 'react';
import { Card } from 'react-bootstrap';
import { TeamsTable } from '../Components/Stats/TeamsTable';

interface ITeamPageProps {}

export interface ITeamStats {
    teamId: number;
    teamName: string;
    teamCity: string;
	conference: string;
	standing: number;
    wins: number;
    losses: number;
	ratio: number;
	streak: number;
    clinchedPlayoffBirth: string;
}

const Title = "Current NBA Standings";

export const Teams: React.FC = (props: ITeamPageProps) => {
	return (
		<div style={{padding: '15px'}}>
			<Card style={{padding: '10px', maxWidth: '95vw'}}>
				<Card.Title className='card-title'>{Title}</Card.Title>
				<Card.Body style={{overflow: 'auto'}}>
					<TeamsTable />
				</Card.Body>
			</Card>
		</div>
	);
}