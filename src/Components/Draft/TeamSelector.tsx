import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './TeamSelector.css';
import BootstrapTable, { ColumnDescription, SelectRowProps } from 'react-bootstrap-table-next';
import { Loading } from '../Shared/Loading';
import { Error } from '../Error/Error';
import GetTeamsTable from '../../services/data/GetTeams';
import { IEntity } from '../../App';

export interface ITeamSelectorProps {}

interface ITeamsTableData extends IEntity {
	name: string;
	city: string;
	projectedWin: number;
	projectedLoss: number;
}
interface ITeamsTableResponse {
	data: ITeamsTableData[];
}

export const TeamSelector: React.FunctionComponent<ITeamSelectorProps> = (props: ITeamSelectorProps) => {
	const [selectedTeam, SetSelectedTeam] = React.useState<ITeamsTableData>();
	const [data, SetData] = React.useState<ITeamsTableData[]>([]);
	const [dataLoaded, SetDataLoaded] = React.useState<Boolean>(false);
	const [dataFailedToLoad, SetDataFailedToLoad] = React.useState<Boolean>(false);

	React.useEffect(() => {
        GetTeamsTable().then((response: ITeamsTableResponse) => {
			if (response?.data) {
				SetDataLoaded(true);
				SetData(response?.data);
			}
		}).catch((reason: any) => {
            console.log(reason);
			SetDataLoaded(true);
			SetDataFailedToLoad(true);
		});
	}, []);

	const columns: ColumnDescription[] = [
		{
			dataField: 'name',
			text: 'Team'
		},
		{
			dataField: 'projectedWin',
			text: 'Projected Wins'
		},
		{
			dataField: 'projectedLoss',
			text: 'Projected Losses'
		}
	];

	const onSelect = (row: any, isSelected: boolean) => {
		SetSelectedTeam(row);
	};

    const selectRow: SelectRowProps<any> = {
        mode: 'radio',
        clickToSelect: true,
		onSelect: onSelect,
        style: { background: '#cf5c36' },
    };

	const handleDraftClicked = () => {
		// TODO Make this have state so the value is actually correct. Having a default blank/disabled is kind of a workaround
		if (selectedTeam?.name !== '') {
			console.log("Drafting: " + selectedTeam?.name);
			// TODO Make an API call
		}
	};

	return (
		<Card className='team-selector'>
			<Card.Title className='card-title'>Draft a team</Card.Title>
			<Card.Body style={{overflow: 'auto'}}>
				{/* {background: "#555555", borderColor:"#000000"}  */}
				<Button variant="danger" onClick={() => handleDraftClicked()}>
					Draft!
				</Button>
				<br />
				<br />
				<p>Team: <b>{selectedTeam?.city} {selectedTeam?.name}</b></p>
				<br />
				{!dataLoaded ? (
					<Loading />
				) : ( !dataFailedToLoad ? (
					<BootstrapTable
						keyField='name'
						selectRow={selectRow} 
						sort={{ dataField: 'projectedWin', order: 'desc' }}
						defaultSortDirection='desc'
						data={ data }
						columns={ columns } />
					) : (
						<Error />
					)
				)}
			</Card.Body>
		</Card>
	);
}