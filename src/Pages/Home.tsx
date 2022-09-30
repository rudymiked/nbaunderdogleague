import { Guid } from 'guid-typescript';
import React from 'react';
import { Card } from 'react-bootstrap';
import { IEntity } from '../App';
import { Error } from '../Components/Error/Error';
import { ChooseGroup } from '../Components/Groups/ChooseGroup';
import { CreateGroup } from '../Components/Groups/CreateGroup';
import { JoinGroup } from '../Components/Groups/JoinGroup';
import { Loading } from '../Components/Shared/Loading';
import GetGroups from '../services/data/GetGroups';
import { LoginEnum } from '../services/Stores/AppReducer';
import { RootContext } from '../services/Stores/RootStore';

interface ITeamPageProps {}

interface IGroupData extends IEntity {
	Id: Guid;
	Owner: string;
	Name: string;
	Year: number;
}

interface IGroupDataResponse {
	data: IGroupData[];
}

export const FailedLogin = "Logging in...";
export const LoggingIn = "Logging in...";

export const Home: React.FC = (props: ITeamPageProps) => {
	const [groups, SetGroups] = React.useState<IGroupData[]>([]);
	const [dataFailedToLoad, SetDataFailedToLoad] = React.useState<Boolean>(false);
	const [dataLoaded, SetDataLoaded] = React.useState<boolean>(false);

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

	return (
		<div className='page-body'>
			<Card style={{padding: '10px'}}>
				<Card.Title>{state.AppStore.Name}</Card.Title>
				<Card.Body style={{overflow: 'auto'}}>
					{state.AppStore.LoginStatus === LoginEnum.Success ? (
						!dataLoaded ? (
							<Loading />
						) : ( !dataFailedToLoad ? (
								<div>
									<ChooseGroup />
									<JoinGroup />
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
		</div>
	);
}