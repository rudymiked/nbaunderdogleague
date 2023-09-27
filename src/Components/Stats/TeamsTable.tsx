import React from 'react';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { sortCaretFunc } from '../../Utils/Utils';
import { GetTeamStats } from '../../services/data/GetRequests';
import { Loading } from '../Shared/Loading';
import { SomethingWentWrong } from '../Error/SomethingWentWrong';

export interface ITeamsTableProps {
	rowsDisplayed?: number;
	abbreviated? : boolean;
}

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
	projectedWin: number;
	projectedLoss: number;
}

interface ITeamStatsResponse {
	data: ITeamStats[];
}

// data:	east: https://www.espn.com.au/nba/insider/insider/story/_/id/38236536/nba-predictions-2023-24-win-loss-records-boston-celtics-new-york-knicks-every-eastern-conference-team
// 			west: https://www.espn.com/nba/insider/story/_/id/38242869/win-loss-records-denver-nuggets-los-angeles-lakers-every-western-conference-team

export const TeamsTable: React.FC<ITeamsTableProps> = (props: ITeamsTableProps) => {
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
		},
		{
			dataField: 'playoffWins',
			text: 'Playoff Ws',
			sort: true,
			sortCaret: sortCaretFunc,
		},
		{
			dataField: 'score',
			text: 'Score',
			sort: true,
			sortCaret: sortCaretFunc,
		},
		{
			dataField: 'projectedWin',
			text: 'Projected W',
			sort: true,
			sortCaret: sortCaretFunc,
		},
		{
			dataField: 'projectedLoss',
			text: 'projected L',
			sort: true,
			sortCaret: sortCaretFunc,
		}
	];

	const abbreviatedColumns: ColumnDescription[] = [
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
			dataField: 'score',
			text: 'Score',
			sort: true,
			sortCaret: sortCaretFunc,
		}
	];

	return (
		<>
			{!dataLoaded ? (
				<Loading />
			) : ( !dataFailedToLoad ? (
					<BootstrapTable 
						keyField='teamName' 
						data={ props.rowsDisplayed && props.rowsDisplayed !== 0 ? teams.slice(0, props.rowsDisplayed) : teams }
						columns={ props.abbreviated ? abbreviatedColumns : columns } 
					/>
				) : (
					<SomethingWentWrong />
				)
			)}
		</>
	);
}