import React from 'react';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { IArchiveStandingsData } from '../../Pages/ArchiveStandings';
import { RootContext } from '../../services/Stores/RootStore';
import { sortCaretFunc } from '../../Utils/Utils';

export interface IArchiveTableProps {
	data: IArchiveStandingsData[];
}

export const ArchiveTable: React.FunctionComponent<IArchiveTableProps> = (props: IArchiveTableProps) => {
	const { state, dispatch } = React.useContext(RootContext);

	const columns: ColumnDescription[] = [
		{
			dataField: 'standing',
			text: 'Standing',
			sort: true,
			sortCaret: sortCaretFunc,
			style: (cell, row, rowIndex, colIndex) => {
				switch (row.standing) {
					case 1: 
						return { backgroundColor: '#ECD122' }
					case 2: 
						return { backgroundColor: '#C0C0C0' }
					case 3: 		
                        return { backgroundColor: '#cd7f32' }		
					default: 
						return { }
				}
			}
		},
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
			dataField: 'wins',
			text: 'Wins',
			sort: true,
			sortCaret: sortCaretFunc,
		},
		{
			dataField: 'losses',
			text: 'Losses',
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

	const rowStyle = (row: IArchiveStandingsData, rowIndex: number) => {
		const style: React.CSSProperties = {};
		
		if (row.email === state.AppStore.Email) {
			style.fontWeight = 'bold';
		}

		return style;
	};

	return (
		<BootstrapTable 
			keyField='governor'
			defaultSorted={[
				{
					dataField: 'standing',
					order: 'asc' 
				}]}
			data={ props.data } 
			columns={ columns }
			rowStyle={rowStyle} 
		/>
	);
}