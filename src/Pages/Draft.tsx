import React from 'react';
import { TeamSelector } from '../Components/Draft/TeamSelector';
import { SidePanel } from '../Components/SidePanel/SidePanel';

interface IDraftPageProps {}

export const Draft: React.FunctionComponent = (props: IDraftPageProps) => {
	return (
		<div className='page-body'>
			<SidePanel />
			<TeamSelector />
		</div>
	);
}