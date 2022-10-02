import { Guid } from 'guid-typescript';
import React from 'react';
import { Card, Stack } from 'react-bootstrap';
import { IEntity } from '../App';
import { Error } from '../Components/Error/Error';
import { YourGroups } from '../Components/Groups/YourGroups';
import { CreateGroup } from '../Components/Groups/CreateGroup';
import { JoinGroup } from '../Components/Groups/JoinGroup';
import { Loading } from '../Components/Shared/Loading';
import GetGroups from '../services/data/GetGroups';
import { LoginEnum } from '../services/Stores/AppReducer';
import { RootContext } from '../services/Stores/RootStore';

interface ITeamPageProps {}

export interface IGroupData extends IEntity {
	id: Guid;
	owner: string;
	name: string;
	year: number;
}

export interface IGroupDataResponse {
	data: IGroupData[];
}

export const FailedLogin = "Logging in...";
export const LoggingIn = "Logging in...";
export const somethingWentWrongText = "Something went wrong.";

const cardStyle = {padding: '10px', width: '50vw', alignSelf: 'center'}

export const Home: React.FC = (props: ITeamPageProps) => {
	const [groups, SetGroups] = React.useState<IGroupData[]>([]);
	const [dataFailedToLoad, SetDataFailedToLoad] = React.useState<Boolean>(false);
	const [dataLoaded, SetDataLoaded] = React.useState<boolean>(false);
	const [cardTitle, SetCardTitle] = React.useState<string>("");

	const { state } = React.useContext(RootContext);

	React.useEffect(() => {
		GetGroups().then((response: IGroupDataResponse) => {
			if (response?.data) {
				SetDataLoaded(true);
				SetGroups(response.data);
			}
		}).catch((reason: any) => {
			SetDataLoaded(true);
			SetDataFailedToLoad(true);
		});
	}, []);

	React.useEffect(() =>{
		if (state.AppStore.Email !== "") {
			SetCardTitle("Welcome, " + state.AppStore.Name);
		}
	},[state])

	return (
		<div className='page-body'>
			{/* <Stack gap={3}> */}
				<Card style={cardStyle}>
					<Card.Title>{cardTitle}</Card.Title>
					<Card.Body style={{overflow: 'auto'}}>
						{state.AppStore.LoginStatus === LoginEnum.Success ? (
							!dataLoaded ? (
								<Loading />
							) : ( !dataFailedToLoad ? (
									<div>
										<YourGroups />
										<hr />
										<JoinGroup />
										<hr />
										<CreateGroup />
									</div>
								) : (
									<Error />
								)
							)
						) : (state.AppStore.LoginStatus === LoginEnum.Fail ? (
							<span>{FailedLogin}</span>
							) : (
								<span>{LoggingIn}</span>
							)
						)}
					</Card.Body>
				</Card>
				{/* <Card style={cardStyle}>
					<Card.Title>{"Join Group"}</Card.Title>
					<Card.Body style={{overflow: 'auto'}}>
						{state.AppStore.LoginStatus === LoginEnum.Success ? (
							!dataLoaded ? (
								<Loading />
							) : ( !dataFailedToLoad ? (
									<div>
										<JoinGroup />
									</div>
								) : (
									<Error />
								)
							)
						) : (state.AppStore.LoginStatus === LoginEnum.Fail ? (
							<span>{FailedLogin}</span>
							) : (
								<span>{LoggingIn}</span>
							)
						)}
					</Card.Body>
				</Card>
				<Card style={cardStyle}>
					<Card.Title>{"Create Group"}</Card.Title>
					<Card.Body style={{overflow: 'auto'}}>
						{state.AppStore.LoginStatus === LoginEnum.Success ? (
							!dataLoaded ? (
								<Loading />
							) : ( !dataFailedToLoad ? (
									<div>
										<CreateGroup />
									</div>
								) : (
									<Error />
								)
							)
						) : (state.AppStore.LoginStatus === LoginEnum.Fail ? (
							<span>{FailedLogin}</span>
							) : (
								<span>{LoggingIn}</span>
							)
						)}
					</Card.Body>
				</Card> */}
			{/* </Stack> */}
		</div>
	);
}