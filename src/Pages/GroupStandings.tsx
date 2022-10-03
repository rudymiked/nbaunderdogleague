import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Error } from '../Components/Error/Error';
import { YourGroups } from '../Components/Groups/YourGroups';
import { Loading } from '../Components/Shared/Loading';
import { GroupStandingsTable } from '../Components/Standings/GroupStandingsTable';
import GetAllUsersGroups from '../services/data/GetAllUsersGroups';
import GetGroupStandingsData from '../services/data/GetGroupStandingsData';
import { AppActionEnum } from '../services/Stores/AppReducer';
import { RootContext } from '../services/Stores/RootStore';
import { IGroupData, IGroupDataArrayResponse } from './Profile';

export interface IGroupStandingsData {
    governor: string;
    teamName: string;
    teamCity: string;
    projectedWin: number;
    projectedLoss: number;
    win: number;
    loss: number;
	score: number;
    playoffs: string;
}

export interface IGroupStandingsDataResponse {
	data: IGroupStandingsData[];
}

interface IStandingsPageProps {}

const Title = "Group Standings";
const PleaseSelectGroup = "Please select a group.";

export const GroupStandings: React.FunctionComponent<IStandingsPageProps> = (props: IStandingsPageProps) => {
	const [data, SetData] = React.useState<IGroupStandingsData[]>([]);
	const [dataFailedToLoad, SetDataFailedToLoad] = React.useState<Boolean>(false);
	const [dataLoaded, SetDataLoaded] = React.useState<boolean>(false);
	const [noGroup, SetNoGroup] = React.useState<boolean>(false);
	const [groupId, SetGroupId] = React.useState<string>("");

	const { state, dispatch } = React.useContext(RootContext);

	const navigate = useNavigate();

	React.useEffect(() => {
		console.log(state.AppStore);
		if (state.AppStore.Email !== "") {
			// user has logged in

			// is a user in (a) group(s)?
			// if so, show standings of first group queried.
			// give option to switch groups

			if (state.AppStore.GroupId === "") {
				// group ID has not been set
				// need to load groups and set first index for standings
				// also need to set group ID in context

				GetAllUsersGroups(state.AppStore.Email).then((response: IGroupDataArrayResponse) => {
					if (response?.data) {
						const firstGroupId: string = response.data.filter((group: IGroupData) => group.name && group.name !== "")[0]?.id.toString();
						
						dispatch({
							type: AppActionEnum.UPDATE_GROUP,
							GroupId: firstGroupId,
						});
					}
					}).catch((reason) =>{
						console.log(reason);
					});
			} else {
				console.log("new group");
				SetGroupId(state.AppStore.GroupId);
				// group already chosen
			}
		} else {
			SetNoGroup(true);
		}	
	}, [dispatch, state]);

	React.useEffect(() => {
		if (groupId !== "") {
			SetNoGroup(false);
			GetGroupStandingsData(groupId).then((response: IGroupStandingsDataResponse) => {
				if (response?.data) {
					console.log(response.data);
					SetDataLoaded(true);
					SetData(response?.data);
				}
			}).catch((reason: any) => {
				console.log(reason);
				SetDataLoaded(true);
				SetDataFailedToLoad(true);
			});
		}
	},	[groupId])

	return (
		<div className='page-body'>
			<Card style={{padding: '10px'}}>
				<Card.Title className='card-title'>{Title}</Card.Title>
				<Card.Body style={{overflow: 'auto'}}>
					{noGroup ? (
						<div>
							<span>{PleaseSelectGroup}</span>
							<br /><br />
							<YourGroups />
						</div>
					) : (!dataLoaded ? (
							<Loading />
						) : (!dataFailedToLoad ? (
								<GroupStandingsTable data={data} />
							) : (
								<Error />
							)
						)
					)}

					<div>
						<span>{"Don't see your group?"}</span>
						<br /><br />
						<Button
							onClick={() => navigate("/profile")}
							aria-controls="navigate-to-profile">
							{"Join a Group"}
						</Button>
					</div>
				</Card.Body>
			</Card>
		</div>
	);
}