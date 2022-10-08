import React from 'react';
import { TeamSelector } from '../Components/Draft/TeamSelection/TeamSelector';
import { DraftProgress, IUserData } from '../Components/Draft/SidePanel/DraftProgress';

interface IDraftPageProps {}

export const Draft: React.FunctionComponent = (props: IDraftPageProps) => {
	const [ userDrafted, SetUserDrafted ] = React.useState<IUserData>();
	const [ draftStartTime, SetDraftStartTime ] = React.useState<number>(0);
	const [ draftEndTime, SetDraftEndTime ] = React.useState<number>(0);
	
	// clock
	const [currentDate, SetCurrentDate] = React.useState<Date>(new Date());

	const refreshClock = () => {
		SetCurrentDate(new Date());
	}

	React.useEffect(() => {
		const timerId = setInterval(refreshClock, 1000);
		return function cleanup() {
			clearInterval(timerId);
		}
	}, []);

	return (
		<>
			<DraftProgress {...{userDrafted, currentDate, draftStartTime, SetDraftStartTime, SetDraftEndTime}} />
			<TeamSelector {...{SetUserDrafted, currentDate, draftStartTime, draftEndTime}}/>
		</>
	);
}