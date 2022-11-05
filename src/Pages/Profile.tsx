import { Guid } from 'guid-typescript';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { IEntity } from '../App';
import { YourGroups } from '../Components/Profile/YourGroups';
import { CreateGroup } from '../Components/Profile/CreateGroup';
import { JoinGroup } from '../Components/Profile/JoinGroup';
import { LoginEnum } from '../services/Stores/AppReducer';
import { RootContext } from '../services/Stores/RootStore';
import { Container, Row, Col } from 'react-bootstrap';
import { UserInformation } from '../Components/Profile/UserInformation';
import { GroupManagement } from '../Components/Groups/GroupManagement';
import GetAllGroups from '../services/data/GetGroups';

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
const adminEmail: string = "rudymiked@gmail.com";

const cardStyle: React.CSSProperties = {padding: '10px', overflow: 'auto', alignSelf: 'center' }

export const Profile: React.FC = (props: ITeamPageProps) => {
	const [cardTitle, SetCardTitle] = React.useState<string>("");
	const [refresh, SetRefresh] = React.useState<number>(0);
	const [ownedGroups, SetOwnedGroups] = React.useState<IGroupData[]>([]);
	const [groups, SetGroups] = React.useState<IGroupData[]>([]);
	const [dataLoaded, SetDataLoaded] = React.useState<boolean>(false);

	const { state } = React.useContext(RootContext);

	React.useEffect(() => {
		if (state.AppStore.Email !== "") {
			SetCardTitle("Welcome, " + state.AppStore.Name);

			loadGroups();

		} else {
			// user not logged in
		}
	}, [state]);


	const loadGroups = () => {
		GetAllGroups(true, state.AppStore.Email).then((response: IGroupDataArrayResponse) => {
			if (response?.data) {
				const data = response.data;
				SetGroups(response.data.filter((group: IGroupData) => group.name && group.name !== ""));
				SetOwnedGroups(data.filter((group: IGroupData) => group.name && group.name !== "" && (group.owner === state.AppStore.Email || state.AppStore.Email === adminEmail)));
			} else {
				// something went wrong
			}

			SetDataLoaded(true);
		}).catch((reason: any) => {
			SetDataLoaded(true);
		});
	};

	return (
		<Card style={cardStyle}>
			<Card.Title>{cardTitle}</Card.Title>
			<Card.Body style={{overflow: 'auto'}}>
				{state.AppStore.LoginStatus === LoginEnum.Success ? (
					<Container>
						{state.AppStore.LoginStatus === LoginEnum.Success ??
						<Row>
							<Col>
							
								<Button
									href={"/.auth/logout?post_logout_redirect_uri=/index.html"}
									aria-controls="logout">
									{"Logout"}
								</Button>
							
							</Col>
						</Row>
						}
						<Row>
							<Col>
								<UserInformation />
							</Col>
						</Row>
						<Row>
							<h4>Groups</h4>
							<Col>
								<YourGroups {...{refresh, SetRefresh}} />
							</Col>
							<Col>
								<JoinGroup {...{
									refresh,
									SetRefresh,
									groups,
									dataLoaded,
									loadGroups
								}} />
							</Col>
							<Col>
								<CreateGroup {...{refresh, SetRefresh}} />
							</Col>
						</Row>
						<hr />
						<Row>
							<Col>
								<GroupManagement {...{ownedGroups, dataLoaded}}/>
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