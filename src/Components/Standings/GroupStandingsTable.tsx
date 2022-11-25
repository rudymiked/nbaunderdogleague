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
			style: (cell, row, rowIndex, colIndex) => {
				// color scale for points
				const score: number = row.score
				switch (true) {
					case score < .5: 
						return { backgroundColor: '#D92828' }
					case score < .75: 
						return { backgroundColor: '#D94628' }
					case score < 1: 
						return { backgroundColor: '#F67B43' }
					case score < 1.25: 
						return { backgroundColor: '#F6E743' }
					case score < 1.5: 
						return { backgroundColor: '#D9F643' }
					case score < 2: 
						return { backgroundColor: '#77F643' }					
					default: 
						return { backgroundColor: '#43F657' }
				}
			}
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
		
		if (row.email === state.AppStore.Email) {
			style.fontWeight = 'bold';
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