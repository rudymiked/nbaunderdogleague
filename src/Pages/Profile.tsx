import { Guid } from 'guid-typescript';
import React from 'react';
import { Card } from 'react-bootstrap';
import { IEntity } from '../App';
import { YourGroups } from '../Components/Profile/YourGroups';
import { CreateGroup } from '../Components/Profile/CreateGroup';
import { JoinGroup } from '../Components/Profile/JoinGroup';
import { LoginEnum } from '../services/Stores/AppReducer';
import { RootContext } from '../services/Stores/RootStore';
import { SetupDraft } from '../Components/Profile/SetupDraft';
import { Container, Row, Col } from 'react-bootstrap';

interface ITeamPageProps {}

export interface IGroupData extends IEntity {
	id: Guid;
	owner: string;
	name: string;
	year: number;
}

export interface IGroupDataArrayResponse {
	data: IGroupData[];
}

export interface IGroupDataResponse {
	data: IGroupData;
}

export const FailedLogin = "Could not log you in. Please close your browser and try again.";
export const LoggingIn = "Logging in...";
export const somethingWentWrongText = "Something went wrong.";

const cardStyle: React.CSSProperties = {padding: '10px', overflow: 'auto', alignSelf: 'center' }

export const Profile: React.FC = (props: ITeamPageProps) => {
	const [cardTitle, SetCardTitle] = React.useState<string>("");
	const [refresh, SetRefresh] = React.useState<number>(0);

	const { state } = React.useContext(RootContext);

	React.useEffect(() => {
		if (state.AppStore.Email !== "") {
			SetCardTitle("Welcome, " + state.AppStore.Name);
		}
	}, [state]);

	return (
		<Card style={cardStyle}>
			<Card.Title>{cardTitle}</Card.Title>
			<Card.Body style={{overflow: 'auto'}}>
				{state.AppStore.LoginStatus === LoginEnum.Success ? (
					<Container>
						<Row>
							<h4>Groups</h4>
							<Col>
								<YourGroups />
							</Col>
							<Col>
								<JoinGroup />
							</Col>
							<Col>
								<CreateGroup />
							</Col>
						</Row>
						<hr />
						<Row>
							<Col>
								<SetupDraft />
							</Col>
						</Row>
					</Container>
				) : (
					state.AppStore.LoginStatus === LoginEnum.Fail ? (
					<span>{FailedLogin}</span>
					) : (
						<span>{LoggingIn}</span>
					)
				)}
			</Card.Body>
		</Card>
	);
}