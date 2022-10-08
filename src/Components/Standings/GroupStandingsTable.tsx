import React from 'react';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { IGroupStandingsData } from '../../Pages/GroupStandings';
import { RootContext } from '../../services/Stores/RootStore';
import { sortCaretFunc } from '../../Utils/Utils';

export interface IGroupStandingsTableProps {
	data: IGroupStandingsData[];
}

export const GroupStandingsTable: React.FunctionComponent<IGroupStandingsTableProps> = (props: IGroupStandingsTableProps) => {
	const { state, dispatch } = React.useContext(RootContext);

	const columns: ColumnDescription[] = [
		{
			dataField: 'score',
			text: 'Score',
			sort: true,
			sortCaret: sortCaretFunc,
		},
		{
			dataField: 'governor',
			text: 'Governor',
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
			text: 'Win',
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
			dataField: 'projectedWin',
			text: 'Projected Wins',
			sort: true,
			sortCaret: sortCaretFunc,
		},
		{
			dataField: 'projectedLoss',
			text: 'Projected Losses',
			sort: true,
			sortCaret: sortCaretFunc,
		}
	];

	const rowStyle = (row: IGroupStandingsData, rowIndex: number) => {
		const style: React.CSSProperties = {};
		
		if (row.governor === state.AppStore.Email) {
			style.backgroundColor = '#c8e6c9';
		}
		
		return style;
	};

	return (
		<BootstrapTable 
			keyField='teamName'
			defaultSorted={[
				{
					dataField: 'name',
					order: 'desc' 
				}]}
			data={ props.data } 
			columns={ columns }
			rowStyle={rowStyle} />
	);
}