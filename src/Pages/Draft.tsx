import React from 'react';
import { TeamSelector } from '../Components/Draft/TeamSelector';
import { DraftProgress } from '../Components/SidePanel/DraftProgress';

interface IDraftPageProps {}

export const Draft: React.FunctionComponent = (props: IDraftPageProps) => {
	return (
		<div className='page-body'>
			<DraftProgress />
			<TeamSelector />
		</div>
	);
}