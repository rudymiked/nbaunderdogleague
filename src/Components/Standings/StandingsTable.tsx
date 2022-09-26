import React from 'react';
import { IStandingData } from "../../Pages/Standings";
import BootstrapTable from 'react-bootstrap-table-next';

export interface IStandingsTableProps {
	data: IStandingData[];
}

export const StandingsTable: React.FunctionComponent<IStandingsTableProps> = (props: IStandingsTableProps) => {
	const columns = [
		{
			dataField: 'teamFullName',
			text: 'Team'
		},
		{
			dataField: 'win',
			text: 'Win'
		},
		{
			dataField: 'loss',
			text: 'Loss'
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