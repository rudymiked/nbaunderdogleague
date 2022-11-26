import React from 'react';
import { Card } from 'react-bootstrap';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { Error } from '../Components/Error/Error';
import { Loading } from '../Components/Shared/Loading';
import { GetTeamStats } from '../services/data/GetRequests';
import { sortCaretFunc } from '../Utils/Utils';

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

interface ITeamStatsResponse {
	data: ITeamStats[];
}

const Title = "Current NBA Standings";

export const Teams: React.FC = (props: ITeamPageProps) => {
	const [teams, SetTeams] = React.useState<ITeamStats[]>([]);
	const [dataFailedToLoad, SetDataFailedToLoad] = React.useState<boolean>(false);
	const [dataLoaded, SetDataLoaded] = React.useState<boolean>(false);

	React.useEffect(() => {
		GetTeamStats().then((response: ITeamStatsResponse) => {
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
			dataField: 'teamCity',
			text: 'City',
			sort: true,
			sortCaret: sortCaretFunc,
		},
		{
			dataField: 'teamName',
			text: 'Team',
			sort: true,
			sortCaret: sortCaretFunc,
		},
		{
			dataField: 'wins',
			text: 'Win',
			sort: true,
			sortCaret: sortCaretFunc,
		},
		{
			dataField: 'losses',
			text: 'Loss',
			sort: true,
			sortCaret: sortCaretFunc,
		},
		{
			dataField: 'clinchedPlayoffBirth',
			text: 'Playoffs',
			sort: true,
			sortCaret: sortCaretFunc,
		}
	];

	return (
		<Card style={{padding: '10px', maxWidth: '95vw'}}>
			<Card.Title className='card-title'>{Title}</Card.Title>
			<Card.Body style={{overflow: 'auto'}}>
				{!dataLoaded ? (
					<Loading />
				) : ( !dataFailedToLoad ? (
						<BootstrapTable 
							keyField='teamName' 
							data={ teams }
							columns={ columns } 
						/>
					) : (
						<Error />
					)
				)}
			</Card.Body>
		</Card>
	);
}