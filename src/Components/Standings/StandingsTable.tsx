import React from 'react';
import { IStandingData } from "../../Pages/Standings";
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';

export interface IStandingsTableProps {
	data: IStandingData[];
}

export const StandingsTable: React.FunctionComponent<IStandingsTableProps> = (props: IStandingsTableProps) => {
	const columns: ColumnDescription[] = [
		{
			dataField: 'governor',
			text: 'Governor'
		},
		{
			dataField: 'teamName',
			text: 'Team'
		},
		{
			dataField: 'win',
			text: 'Win'
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
	];

	// TODO Use this to make rows clickable. Accept lambda via props so it's only clickable on draft page?
	/*const rowEvents = {
		onClick: (e, row, rowIndex) => {
			console.log(`clicked on row with index: ${rowIndex}`);
		}
	}

	// Add to BootstrapTable
	rowEvents={ rowEvents }*/

	return (
		<BootstrapTable keyField='teamFullName' data={ props.data } columns={ columns } />
	);
}