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
import { ArchiveSummary } from '../Components/Profile/ArchiveSummary';
import { ADMIN_EMAIL, CURRENT_YEAR, FAILED_LOGIN, LOGGING_IN, NBAEndDate, NBAStartDate } from '../Utils/AppConstants';

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

export const Profile: React.FC = (props: ITeamPageProps) => {
	const [refresh, SetRefresh] = React.useState<number>(0);
	const [ownedGroups, SetOwnedGroups] = React.useState<IGroupData[]>([]);
	const [groups, SetGroups] = React.useState<IGroupData[]>([]);
	const [dataLoaded, SetDataLoaded] = React.useState<boolean>(false);

	const { state } = React.useContext(RootContext);

	React.useEffect(() => {
		if (state.AppStore.Email !== "") {
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
				SetOwnedGroups(data.filter((group: IGroupData) => group.name && group.name !== "" && (group.owner === state.AppStore.Email || state.AppStore.Email === ADMIN_EMAIL)));
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
				<Container style={{maxWidth: '95vw'}}>
					{(new Date()).getTime() < NBAStartDate.getTime() && (new Date()).getTime() > NBAEndDate.getTime() &&
					<Row style={{padding: '10px', minHeight: '300px'}}>
						<Card style={{padding: '10px'}}>
							<Card.Title className='card-title'>Welcome to {CURRENT_YEAR} NBA fantasy!</Card.Title>
							<Card.Body style={{overflow: 'auto'}}>
								<Row>
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
							</Card.Body>
						</Card>
					</Row>
					}
					<Row>
						<Col style={{padding: '10px'}}>
							<Row style={{padding: '10px'}}>
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
							<Row style={{padding: '10px'}}>
								<Card style={{padding: '10px'}}>
									<Card.Title className='card-title'>Past Teams</Card.Title>
									<Card.Body style={{overflow: 'auto'}}>
										<ArchiveSummary />
									</Card.Body>
								</Card>
							</Row>
						</Col>
						<Col style={{padding: '10px'}}>
							<Row style={{padding: '10px'}}>
								<Card style={{padding: '10px'}}>
									<Card.Title className='card-title'>Group Management</Card.Title>
									<Card.Body style={{overflow: 'auto'}}>
										<Row style={{padding: '10px'}}>
											<Col>
												<YourGroups {...{refresh, SetRefresh}} />
											</Col>
										</Row>
										<Row>
											<Col>
												<GroupManagement {...{ownedGroups, dataLoaded}}/>
											</Col>
										</Row>
									</Card.Body>
								</Card>
							</Row>
						</Col>
					</Row>
				</Container>
			) : (
				state.AppStore.LoginStatus === LoginEnum.Fail ? (
				<span>{FAILED_LOGIN}</span>
				) : (
					<span>{LOGGING_IN}</span>
				)
			)}
		</div>
	);
}
