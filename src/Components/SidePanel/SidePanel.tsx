import React from 'react';
import { Card } from 'react-bootstrap';
import './SidePanel.css';
import BootstrapTable from 'react-bootstrap-table-next';
import { IUserData } from '../../Pages/Draft';

export interface ISidePanelProps {
	data: IUserData[];
}

export const SidePanel: React.FunctionComponent<ISidePanelProps> = (props: ISidePanelProps) => {
	const columns = [
		{
			dataField: 'email',
			text: 'Email'
		},
		{
			dataField: 'team',
			text: 'Team'
		}
	];

	return (
		<Card className='side-panel'>
			<Card.Title className='card-title'>Draft Progress</Card.Title>
			<Card.Body>
				<BootstrapTable keyField='email' data={ props.data } columns={ columns } />
			</Card.Body>
		</Card>
	);
}