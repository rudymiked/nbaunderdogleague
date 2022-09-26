import React from 'react';
import { Card } from 'react-bootstrap';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import GetCurrentNBAStandings from '../services/data/GetCurrentNBAStandings';

interface ITeamPageProps {}

export interface ICurrentNBAStandings {
    teamName: string;
    teamCity: string;
    win: number;
    loss: number;
    playoffs: string;
}

interface ICurrentNBAStandingsResponse {
	data: ICurrentNBAStandings[];
}

export const Teams: React.FC = (props: ITeamPageProps) => {
	const [team, SetTeams] = React.useState<ICurrentNBAStandings[]>([]);

	React.useEffect(() => {
		GetCurrentNBAStandings().then((response: ICurrentNBAStandingsResponse) => {
			if (response?.data) {
				SetTeams(response.data);
			}
		}).catch((reason: any) => {
			//
		});
	}, []);

	const columns: ColumnDescription[] = [
		{
			dataField: 'teamName',
			text: 'Team'
		},
		{
			dataField: 'teamCity',
			text: 'City'
		},
		{
			dataField: 'win',
			text: 'Wins'
		},
		{
			dataField: 'loss',
			text: 'Loss'
		},
		{
			dataField: 'playoffs',
			text: 'Playoffs'
		}
	];

	return (
		<div className='page-body'>
			<Card style={{padding: '10px'}}>
				<Card.Title>{"Current NBA Standings"}</Card.Title>
				<Card.Body>
					<BootstrapTable keyField='teamName' data={ team } columns={ columns } />
				</Card.Body>
			</Card>
		</div>
	);
}