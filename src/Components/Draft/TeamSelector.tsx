import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './TeamSelector.css';
import { IGroupStandingsData, IGroupStandingsDataResponse } from '../../Pages/GroupStandings';
import BootstrapTable, { ColumnDescription, SelectRowProps } from 'react-bootstrap-table-next';
import GetGroupStandingsData from '../../services/data/GetGroupStandingsData';
import { Loading } from '../Shared/Loading';
import { Error } from '../Error/Error';

export interface ITeamSelectorProps {}

export const TeamSelector: React.FunctionComponent<ITeamSelectorProps> = (props: ITeamSelectorProps) => {
	const [selectedTeam, SetSelectedTeam] = React.useState<IGroupStandingsData>();
	const [data, SetData] = React.useState<IGroupStandingsData[]>([]);
	const [dataLoaded, SetDataLoaded] = React.useState<Boolean>(false);
	const [dataFailedToLoad, SetDataFailedToLoad] = React.useState<Boolean>(false);

	React.useEffect(() => {
        GetGroupStandingsData().then((response: IGroupStandingsDataResponse) => {
			if (response?.data) {
				console.log(response.data);
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
			dataField: 'teamName',
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
		if (selectedTeam?.teamName !== '') {
			console.log("Drafting: " + selectedTeam?.teamName);
			// TODO Make an API call
		}
	};

	return (
		<Card className='team-selector'>
			<Card.Title className='card-title'>Draft a team</Card.Title>
			<Card.Body style={{overflow: 'auto'}}>
				<Button onClick={() => handleDraftClicked()} style={ {background: "#555555", borderColor:"#000000"} }>
					Draft!
				</Button>
				<br />
				<br />
				<p>Selected Team: <b>{selectedTeam?.teamCity} {selectedTeam?.teamName}</b></p>
				<br />
				{!dataLoaded ? (
					<Loading />
				) : ( !dataFailedToLoad ? (
					<BootstrapTable
						keyField='teamName'
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