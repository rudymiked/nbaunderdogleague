import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Error } from '../Components/Error/Error';
import { ScoreCard } from '../Components/Scoreboard/ScoreCard';
import { Loading } from '../Components/Shared/Loading';
import { GroupStandingsTable } from '../Components/Standings/GroupStandingsTable';
import { GetAllGroupsUserIsInByYear, GetGroupStandingsData } from '../services/data/GetRequests';
import { AppActionEnum } from '../services/Stores/AppReducer';
import { RootContext } from '../services/Stores/RootStore';
import { IGroupData, IGroupDataArrayResponse } from './Profile';

export interface IGroupStandingsData {
    governor: string;
    email: string;
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

export const GroupStandings: React.FunctionComponent<IStandingsPageProps> = (props: IStandingsPageProps) => {
	const [data, SetData] = React.useState<IGroupStandingsData[]>([]);
	const [dataFailedToLoad, SetDataFailedToLoad] = React.useState<boolean>(false);
	const [dataLoaded, SetDataLoaded] = React.useState<boolean>(false);
	const [noGroups, SetNoGroups] = React.useState<boolean>(false);
	const [groupId, SetGroupId] = React.useState<string>("");

	const { state, dispatch } = React.useContext(RootContext);

	const navigate = useNavigate();

	React.useEffect(() => {
		if (state.AppStore.Email !== "") {
			// user has logged in

			// is a user in (a) group(s)?
			// if so, show standings of first group queried.
			// give option to switch groups
			updateGroup();
		}
	}, [state]);

	const updateGroup = () => {
		if (state.AppStore.GroupId === "" && state.AppStore.Email !== "") {
			// group ID has not been set
			// need to load groups and set first index for standings
			// also need to set group ID in context
			
			GetAllGroupsUserIsInByYear(state.AppStore.Email).then((response: IGroupDataArrayResponse) => {
				if (response?.data) {
					const data = response.data;
					if (data.length > 0) {
						const firstGroup: IGroupData = data.find((group: IGroupData) => group.name && group.name !== "")!;

						if (firstGroup?.id.toString() !== "") {
							dispatch({
								type: AppActionEnum.UPDATE_GROUP,
								GroupId: firstGroup.id!,
								GroupName: firstGroup.name!,
							});
						}
					} else {
						// user is not in any groups
						SetNoGroups(true);
					}

					SetDataLoaded(true);
				}
			}).catch((reason) => {
				SetDataLoaded(true);
				SetDataFailedToLoad(true);
			});
		} else {
			// if group has already been loaded, but user chooses to change the group.
			SetGroupId(state.AppStore.GroupId);
		}
	}

	React.useEffect(() => {
		if (groupId !== "") {
			SetNoGroups(false);

			GetGroupStandingsData(groupId).then((response: IGroupStandingsDataResponse) => {
				if (response?.data) {
					const data = response.data;
					SetDataLoaded(true);
					SetData(data);
				} else {
					// no standings data
				}
			}).catch((reason: any) => {
				SetDataLoaded(true);
				SetDataFailedToLoad(true);
			});
		}
	},	[groupId]);

	return (
		<Card style={{padding: '10px', maxWidth: '95vw'}}>
			<Card.Title className='card-title'><b>{state.AppStore.GroupName}</b> Standings</Card.Title>
			<Card.Body style={{overflow: 'auto'}}>
				{!dataLoaded ? (
						<Loading />
					) : (!dataFailedToLoad ? (
							<div hidden={noGroups}>
								<div hidden={data.length === 0}>
									<GroupStandingsTable data={data} />
								</div>
							</div>
						) : (
							<Error />
						)
					)
				}
				<hr />
				<div>
					<span>{"Don't see your group?"}</span>
					<br /><br />
					<Button
						onClick={() => navigate("/profile")}
						aria-controls="navigate-to-profile">
						{"Join or Switch Groups"}
					</Button>
				</div>
			</Card.Body>
		</Card>
	);
}
