import React from 'react';
import { TeamSelector } from '../Components/Draft/TeamSelector';
import { DraftProgress, IUserData } from '../Components/SidePanel/DraftProgress';

interface IDraftPageProps {}

export const Draft: React.FunctionComponent = (props: IDraftPageProps) => {
	const [ userDrafted, SetUserDrafted ] = React.useState<IUserData>();
	
	return (
		<>
			<DraftProgress {...{userDrafted}} />
			<TeamSelector {...{SetUserDrafted}}/>
		</>
	);
}