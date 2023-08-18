import React from 'react';
import { Card } from 'react-bootstrap';
import { PlayerStatsTable } from '../Components/Stats/PlayerStatsTable';

interface IPlayersPageProps {}

export interface IPlayerStats {}

const Title = "Player Statistics";

export const Players: React.FC<IPlayersPageProps> = (props: IPlayersPageProps) => {
	return (
		<div style={{padding: '15px'}}>
			<Card style={{padding: '10px', maxWidth: '95vw'}}>
				<Card.Title className='card-title'>{Title}</Card.Title>
				<Card.Body style={{overflow: 'auto'}}>
					<PlayerStatsTable />
				</Card.Body>
			</Card>
		</div>
	);
}