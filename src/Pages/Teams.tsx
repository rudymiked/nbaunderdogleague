import React from 'react';
import { Card } from 'react-bootstrap';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import GetCurrentNBAStandings from '../services/data/GetCurrentNBAStandings';
import { Error } from '../Components/Error/Error';
import { Loading } from '../Components/Shared/Loading';
import { sortCaretFunc } from '../Utils/Utils';

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
			} else {
				console.log(response);
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
			dataField: 'win',
			text: 'Wins',
			sort: true,
			sortCaret: sortCaretFunc,
		},
		{
			dataField: 'loss',
			text: 'Loss',
			sort: true,
			sortCaret: sortCaretFunc,
		},
		{
			dataField: 'playoffs',
			text: 'Playoffs',
			sort: true,
			sortCaret: sortCaretFunc,
		}
	];

	return (
		<div className='page-body'>
			<Card style={{padding: '10px'}}>
				<Card.Title>{Title}</Card.Title>
				<Card.Body style={{overflow: 'auto'}}>
					{!dataLoaded ? (
						<Loading />
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