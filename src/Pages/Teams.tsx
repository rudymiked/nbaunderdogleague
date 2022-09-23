import React from 'react';
import { Card } from 'react-bootstrap';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import GetTeamData from '../services/data/GetTeamData';

interface ITeamPageProps {}

export interface ITeamData {
	teamId: number;
	teamCity: string;
	teamName: string;
	win: number;
	projectedWin: number;
	loss: number;
	projectedLoss: number;
	playoffs: string;
}

interface ITeamDataResponse {
	data: [ ITeamData ];
}

export const Teams: React.FC = (props: ITeamPageProps) => {
	const [team, SetTeams] = React.useState<ITeamData[]>([]);

	React.useEffect(() => {
		GetTeamData().then((response: ITeamDataResponse) => {
			if (response?.data) {
				const teamData: ITeamData[] = response.data;
				SetTeams(teamData);
			}
		}).catch((reason: any) => {
			console.error(reason);
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
			dataField: 'projectedWin',
			text: 'Projected Wins'
		},
		{
			dataField: 'projectedLoss',
			text: 'Projected Losses'
		}
		,
		{
			dataField: 'playoffs',
			text: 'Playoffs'
		}
	];

	return (
		<div className='PageBody'>
			<Card style={{padding: '10px'}}>
				<Card.Title>{"Teams"}</Card.Title>
				<Card body>
					<BootstrapTable keyField='teamName' data={ team } columns={ columns } />
				</Card>
			</Card>
		</div>
	);
}