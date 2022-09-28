import React from 'react';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { ILeagueStandingData } from '../../Pages/LeagueStandings';

export interface ILeagueStandingsTableProps {
	data: ILeagueStandingData[];
}

export const LeagueStandingsTable: React.FunctionComponent<ILeagueStandingsTableProps> = (props: ILeagueStandingsTableProps) => {
	const columns: ColumnDescription[] = [
		{
			dataField: 'score',
			text: 'Score'
		},
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
		<BootstrapTable keyField='score' defaultSortDirection='desc' data={ props.data } columns={ columns } />
	);
}