import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './TeamSelector.css';
import { IGroupStandingsData } from '../../Pages/GroupStandings';
import BootstrapTable, { ColumnDescription, SelectRowProps } from 'react-bootstrap-table-next';

export interface ITeamSelectorProps {
	data: IGroupStandingsData[];
}

export const TeamSelector: React.FunctionComponent<ITeamSelectorProps> = (props: ITeamSelectorProps) => {
	const [ selectedTeam, SetSelectedTeam ] = React.useState<IGroupStandingsData>({
		governor: "",
		teamName: "",
		teamCity: "",
		projectedWin: 0,
		projectedLoss: 0,
		win: 0,
		loss: 0,
		playoffs: "",
		score: 0.0,
	});

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
		if (selectedTeam.teamName !== '') {
			console.log("Drafting: " + selectedTeam.teamName);
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
				<p>Selected Team: <b>{selectedTeam.teamCity} {selectedTeam.teamName}</b></p>
				<br />
				<BootstrapTable
					keyField='teamName'
					selectRow={selectRow} 
					sort={{ dataField: 'projectedWin', order: 'desc' }}
					defaultSortDirection='desc'
					data={ props.data }
					columns={ columns } />
			</Card.Body>
		</Card>
	);
}