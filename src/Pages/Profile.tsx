import { Guid } from 'guid-typescript';
import React from 'react';
import { Card } from 'react-bootstrap';
import { IEntity } from '../App';
import { YourGroups } from '../Components/Groups/YourGroups';
import { CreateGroup } from '../Components/Groups/CreateGroup';
import { JoinGroup } from '../Components/Groups/JoinGroup';
import { LoginEnum } from '../services/Stores/AppReducer';
import { RootContext } from '../services/Stores/RootStore';

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

const cardStyle = {padding: '10px', width: '50vw', alignSelf: 'center'}

export const Profile: React.FC = (props: ITeamPageProps) => {
	const [cardTitle, SetCardTitle] = React.useState<string>("");

	const { state } = React.useContext(RootContext);

	React.useEffect(() =>{
		if (state.AppStore.Email !== "") {
			SetCardTitle("Welcome, " + state.AppStore.Name);
		}
	},[state])

	return (
		<div className='page-body'>
			<Card style={cardStyle}>
				<Card.Title>{cardTitle}</Card.Title>
				<Card.Body style={{overflow: 'auto'}}>
					{state.AppStore.LoginStatus === LoginEnum.Success ? (
						// !dataLoaded ? (
						// 	<Loading />
						// ) : ( !dataFailedToLoad ? (
								<div>
									<YourGroups />
									<hr />
									<JoinGroup />
									<hr />
									<CreateGroup />
								</div>
						// 	) : (
						// 		<Error />
						// 	)
						// )
					) : (
						state.AppStore.LoginStatus === LoginEnum.Fail ? (
						<span>{FailedLogin}</span>
						) : (
							<span>{LoggingIn}</span>
						)
					)}
				</Card.Body>
			</Card>
		</div>
	);
}