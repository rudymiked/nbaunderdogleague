import { Guid } from 'guid-typescript';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { IEntity } from '../App';
import { YourGroups } from '../Components/Profile/YourGroups';
import { AppActionEnum, LoginEnum } from '../services/Stores/AppReducer';
import { RootContext } from '../services/Stores/RootStore';
import { Container, Row, Col } from 'react-bootstrap';
import { UserInformation } from '../Components/Profile/UserInformation';
import { GroupManagement } from '../Components/Groups/GroupManagement';
import { ArchiveSummary } from '../Components/Profile/ArchiveSummary';
import { PleaseLogin } from '../Components/Shared/PleaseLogin';
import { CreateGroup } from '../Components/Profile/CreateGroup';
import { JoinGroup } from '../Components/Profile/JoinGroup';

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

	const { state, dispatch } = React.useContext(RootContext);

	const resetContext = () => {
		dispatch({
			type: AppActionEnum.RESET_CONTEXT,
		});
	}

	return (
		<div>
			{state.AppStore.LoginStatus === LoginEnum.Success ? (
				<Container style={{maxWidth: '95vw'}}>
					<Row>
						<Col style={{padding: '10px'}}>
							<Row style={{padding: '10px'}}>
								<Card style={{padding: '10px'}}>
									<Card.Title className='card-title'>Welcome, {state.AppStore.Name}</Card.Title>
									<Card.Body style={{overflow: 'auto'}}>
										<Button
											href={"/.auth/logout?post_logout_redirect_uri=/"}
											aria-controls="logout"
											onClick={() => {resetContext()}}
											variant={"dark"}>
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
												<YourGroups 
													refresh={refresh} 
													SetRefresh={SetRefresh}
												/>
											</Col>
										</Row>
										<Row>
											<Col>
												<GroupManagement />
											</Col>
										</Row>
										<Row>
											<Col>
												<JoinGroup 
													refresh={refresh}
												/>
											</Col>
										</Row>
										<Row>
											<Col>
												<CreateGroup 
													refresh={refresh} 
													SetRefresh={SetRefresh} 
												/>
											</Col>
										</Row>
									</Card.Body>
								</Card>
							</Row>
						</Col>
					</Row>
				</Container>
			) : (
				<PleaseLogin />
			)}
		</div>
	);
}
