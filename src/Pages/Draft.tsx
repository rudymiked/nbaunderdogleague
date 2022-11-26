import React from 'react';
import { TeamSelector } from '../Components/Draft/TeamSelector';
import { DraftProgress, IUserData } from '../Components/Draft/DraftProgress';
import { Container, Row, Col } from 'react-bootstrap';
import { RootContext } from '../services/Stores/RootStore';
import { DraftResults } from '../Components/Draft/DraftResults';
import { NBAStartDate } from '../Utils/AppConstants';

interface IDraftPageProps {}

export const Draft: React.FunctionComponent = (props: IDraftPageProps) => {
	const [userDrafted, SetUserDrafted] = React.useState<IUserData>();
	const [draftStartTime, SetDraftStartTime] = React.useState<number>(0);
	const [draftEndTime, SetDraftEndTime] = React.useState<number>(0);
	const [showDraft, SetShowDraft] = React.useState<boolean>(true);
	
	const { state, dispatch } = React.useContext(RootContext);

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

	React.useEffect(() => {
		// show results of previous draft if date is before October or after the NBA start date
		// this is a hack and needs to be updated XXX
		const now: Date = new Date();

		if (now.getMonth() < 10 || now > NBAStartDate) {
			SetShowDraft(false);
		}
	}, []);

	return (
		<>
			{state.AppStore.GroupId !== "" ? (
				<Container>
					{showDraft ? (
						<Row>
							<Col>
								<DraftProgress {...{userDrafted, currentDate, draftStartTime, draftEndTime, SetDraftStartTime, SetDraftEndTime}} />
							</Col>
							<Col>
								<TeamSelector {...{SetUserDrafted, currentDate, draftStartTime, draftEndTime}}/>
							</Col>
						</Row>
					) : (
						<Row>
							<DraftResults />
						</Row>
					)}
				</Container>
			) : (
				<p>Navigate to your profile to select one of your groups.</p>
			)}
		</>
	);
}