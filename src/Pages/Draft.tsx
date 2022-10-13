import React from 'react';
import { TeamSelector } from '../Components/Draft/TeamSelection/TeamSelector';
import { DraftProgress, IUserData } from '../Components/Draft/SidePanel/DraftProgress';
import { Container, Row, Col } from 'react-bootstrap';
import { RootContext } from '../services/Stores/RootStore';

interface IDraftPageProps {}

export const Draft: React.FunctionComponent = (props: IDraftPageProps) => {
	const [ userDrafted, SetUserDrafted ] = React.useState<IUserData>();
	const [ draftStartTime, SetDraftStartTime ] = React.useState<number>(0);
	const [ draftEndTime, SetDraftEndTime ] = React.useState<number>(0);
	
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

	return (
		<>
			{state.AppStore.GroupId !== "" ? (
				<Container>
					<Row>
						<Col>
							<DraftProgress {...{userDrafted, currentDate, draftStartTime, draftEndTime, SetDraftStartTime, SetDraftEndTime}} />
						</Col>
						<Col>
							<TeamSelector {...{SetUserDrafted, currentDate, draftStartTime, draftEndTime}}/>
						</Col>
					</Row>
				</Container>
			) : (
				<p>Navigate to your profile to select one of your groups.</p>
			)}
		</>
	);
}