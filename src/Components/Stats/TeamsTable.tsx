import React from 'react';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { sortCaretFunc } from '../../Utils/Utils';
import { GetTeamStats } from '../../services/data/GetRequests';
import { Loading } from '../Shared/Loading';
import { SomethingWentWrong } from '../Error/SomethingWentWrong';

interface ITeamsTableProps {}

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

export const TeamsTable: React.FC = (props: ITeamsTableProps) => {
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
		}
	];

	return (
		<>
			{!dataLoaded ? (
				<Loading />
			) : ( !dataFailedToLoad ? (
					<BootstrapTable 
						keyField='teamName' 
						data={ teams }
						columns={ columns } 
					/>
				) : (
					<SomethingWentWrong />
				)
			)}
		</>
	);
}