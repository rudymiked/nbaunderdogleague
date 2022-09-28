import React from 'react';
import { Card } from 'react-bootstrap';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import GetCurrentNBAStandings from '../services/data/GetCurrentNBAStandings';
import { Error } from '../Components/Error/Error';

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

const loadingDataText: string = "Loading Data...";
const Title = "Current NBA Standings";

export const Teams: React.FC = (props: ITeamPageProps) => {
	const [team, SetTeams] = React.useState<ICurrentNBAStandings[]>([]);
	const [dataFailedToLoad, SetDataFailedToLoad] = React.useState<Boolean>(false);
	const [dataLoaded, SetDataLoaded] = React.useState<boolean>(false);

	React.useEffect(() => {
		GetCurrentNBAStandings().then((response: ICurrentNBAStandingsResponse) => {
			if (response?.data) {
				SetDataLoaded(true);
				SetTeams(response.data);
			}
		}).catch((reason: any) => {
			SetDataLoaded(true);
			SetDataFailedToLoad(true);
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
				<Card.Title>{Title}</Card.Title>
				<Card.Body>
					{!dataLoaded ? (
						<div>
							<p>{loadingDataText}</p>
						</div>
					) : ( !dataFailedToLoad ? (
							<BootstrapTable keyField='teamName' data={ team } columns={ columns } />
						) : (
							<Error />
						)
					)}
				</Card.Body>
			</Card>
		</div>
	);
}