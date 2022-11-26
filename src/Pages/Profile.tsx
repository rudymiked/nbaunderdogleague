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
import { GetAllGroups } from '../services/data/GetRequests';
import { Archive } from '../Components/Profile/Archive';

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
		<div>
			{state.AppStore.LoginStatus === LoginEnum.Success ? (
				<Container>
					<Row>
						<Col>
							<Row>
								<Card style={{padding: '10px'}}>
									<Card.Title className='card-title'>Welcome, {state.AppStore.Name}</Card.Title>
									<Card.Body style={{overflow: 'auto'}}>
										<Button
											href={"/.auth/logout?post_logout_redirect_uri=/index.html"}
											aria-controls="logout">
											{"Logout"}
										</Button>
										<UserInformation />
									</Card.Body>
								</Card>
							</Row>
							<Row style={{paddingTop: '10px'}}>
								<Card style={{padding: '10px'}}>
									<Card.Title className='card-title'>Past Teams</Card.Title>
									<Card.Body style={{overflow: 'auto'}}>
										<Archive />
									</Card.Body>
								</Card>
							</Row>
						</Col>
						<Col>
							<Card style={{padding: '10px'}}>
								<Card.Title className='card-title'>Group Management</Card.Title>
								<Card.Body style={{overflow: 'auto'}}>
									<Row>
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
										<Col>
											<GroupManagement {...{ownedGroups, dataLoaded}}/>
										</Col>
									</Row>
								</Card.Body>
							</Card>
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
		</div>
	);
}
