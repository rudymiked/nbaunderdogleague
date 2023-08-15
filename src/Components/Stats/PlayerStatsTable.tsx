import React from 'react';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { sortCaretFunc } from '../../Utils/Utils';
import { GetPlayerStats } from '../../services/data/GetRequests';
import { Loading } from '../Shared/Loading';
import { SomethingWentWrong } from '../Error/SomethingWentWrong';

interface IPlayerStatsTableProps {
	rowsDisplayed?: number
}

export interface IPlayerStats {
	playerName: string;
	seasonPlusMinus: number;
}

interface IIPlayerStatsResponse {
	data: IPlayerStats[];
}

export const PlayerStatsTable: React.FC<IPlayerStatsTableProps> = (props: IPlayerStatsTableProps) => {
	const [players, SetPlayers] = React.useState<IPlayerStats[]>([]);
	const [dataFailedToLoad, SetDataFailedToLoad] = React.useState<boolean>(false);
	const [dataLoaded, SetDataLoaded] = React.useState<boolean>(false);

	React.useEffect(() => {
		GetPlayerStats().then((response: IIPlayerStatsResponse) => {
			if (response?.data) {
				SetDataLoaded(true);
				SetPlayers(response.data.sort((a, b) => (a.seasonPlusMinus > b.seasonPlusMinus ? -1 : 1)));
			}
		}).catch((reason: any) => {
			SetDataLoaded(true);
			SetDataFailedToLoad(true);
		});
	}, []);

	const columns: ColumnDescription[] = [
		{
			dataField: 'playerName',
			text: 'Name',
			sort: true,
			sortCaret: sortCaretFunc,
		},
		{
			dataField: 'seasonPlusMinus',
			text: '+/-',
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
						keyField='playerName' 
						data={ props.rowsDisplayed && props.rowsDisplayed !== 0 ? players.slice(0, props.rowsDisplayed) : players }
						columns={ columns }
					/>
				) : (
					<SomethingWentWrong />
				)
			)}
		</>
	);
}