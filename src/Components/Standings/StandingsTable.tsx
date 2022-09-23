import React from 'react';
import { IStandings } from "../../Pages/Standings";
import BootstrapTable from 'react-bootstrap-table-next';

export interface IStandingTableProps {
	data: IStandings[];
}

export const StandingsTable: React.FunctionComponent<IStandingTableProps> = (props: IStandingTableProps) => {
	const columns = [
		{
			dataField: 'TeamFullName',
			text: 'Team'
		},
		{
			dataField: 'Win',
			text: 'Win'
		},
		{
			dataField: 'Loss',
			text: 'Loss'
		}
	];

	return (
		<BootstrapTable keyField='TeamFullName' data={ props.data } columns={ columns } />
	);
}