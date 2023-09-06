import React from 'react';
import { Card, Button } from 'react-bootstrap';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { Loading } from '../Shared/Loading';
import { SomethingWentWrong } from '../Error/SomethingWentWrong';
import { Guid } from 'guid-typescript';
import { IEntity } from '../../App';
import { RootContext } from '../../services/Stores/RootStore';
import { LoginEnum, AppActionEnum } from '../../services/Stores/AppReducer';
import { IGroupDataArrayResponse, IGroupData } from '../../Pages/Profile';
import { GetAllGroupsUserIsInByYear, GetDraftData, GetUserData } from '../../services/data/GetRequests';
import { PleaseLogin } from '../Shared/PleaseLogin';
import { IUserData, IUserDataResponse } from '../Profile/UserInformation';

export interface IDraftProgressProps {
	userDrafted: IUserData;
	currentDate: Date;
	draftStartTime: number;
	draftEndTime: number;
	SetDraftStartTime: React.Dispatch<React.SetStateAction<number>>;
	SetDraftEndTime: React.Dispatch<React.SetStateAction<number>>;
}

export interface IDraftData  extends IEntity {
	email: string;
	id: string;
	groupId: Guid;
	draftOrder: number;
	userStartTime: Date;
	userEndTime: Date;
}

export interface IDraftDataResponse {
	data: IDraftData[];
}
export interface IDraftProgressData {
	user: string;
	teamName: string;
	id: string;
	groupId: Guid;
	draftOrder: number;
	userStartTime: string;
	userEndTime: string;
	userStartTimeMS: number;
	userEndTimeMS: number;
}

const defaultDraft: IDraftProgressData[] = [{
	teamName: "",
	id: "",
	groupId: Guid.createEmpty(),
	draftOrder: 1,
	user: "",
	userStartTime: "",
	userEndTime: "",
	userStartTimeMS: 0,
	userEndTimeMS: 0,
}];

export const DraftProgress: React.FunctionComponent<IDraftProgressProps> = (props: IDraftProgressProps) => {
	const [draftData, SetDraftData] = React.useState<IDraftData[]>([]);
	const [userData, SetUsers] = React.useState<IUserData[]>([]);
	const [draftProgress, SetDraftProgress] = React.useState<IDraftProgressData[]>([]);
	const [draftDataLoaded, SetDraftDataLoaded] = React.useState<boolean>(false);
	const [userDataLoaded, SetUserDataLoaded] = React.useState<boolean>(false);
	const [dataFailedToLoad, SetDataFailedToLoad] = React.useState<boolean>(false);
	const [nextUpRowIndex, SetNextUpRowIndex] = React.useState<number>(0);

	const { state, dispatch } = React.useContext(RootContext);

	React.useEffect(() => {
		if (state.AppStore.LoginStatus === LoginEnum.Success) {
			if(updateGroup()) {
				refreshAllDraftData();
			}
		}
	}, []);

	React.useEffect(() => {
		if (props.userDrafted !== undefined && props.userDrafted?.team !== "") {
			updateFromDraft();
		}
	}, [props.userDrafted?.team]);

	React.useEffect(() => {
		if (draftDataLoaded && userDataLoaded) {
			// combine user and draft data
			combineUserAndDraftData();
		}
	}, [draftDataLoaded, userDataLoaded]);

	React.useEffect(() => {
		if (props.currentDate.getTime() > props.draftStartTime && props.currentDate.getTime() < props.draftEndTime) {
			if (props.currentDate.getMinutes() % 5 === 0 && props.currentDate.getSeconds() === 0) {
				refreshAllDraftData();
			}
		}
	}, [props.currentDate]);

	const refreshAllDraftData = () => {
		refreshDraft();
		refreshUsers();
	}

	const updateFromDraft = () => {
		const oldData: IDraftProgressData[] = draftProgress;
		const updatedDraftProgress: IDraftProgressData[] = [];

		const user: string = (props.userDrafted?.username !== null && props.userDrafted?.username !== undefined) ? props.userDrafted.username : props.userDrafted?.email.split("@")[0];

		for(const d of oldData) {
			updatedDraftProgress.push({
				teamName: user === d.user ? props.userDrafted?.team : d.teamName,
				id: d.id,
				groupId: d.groupId,
				draftOrder: d.draftOrder,
				user: d.user,
				userStartTime: d.userStartTime,
				userEndTime: d.userEndTime,
				userStartTimeMS: d.userStartTimeMS,
				userEndTimeMS: d.userEndTimeMS,
			});
		}

		SetDraftProgress(updatedDraftProgress);
	}

	const combineUserAndDraftData = () => {
		const combinedData: IDraftProgressData[] = [];

		draftData.forEach(d => {
			const userInfo: IUserData = userData.filter((u: IUserData) => u.email === d.email)[0];
			// first to draft, to collect draft start datetime
			if (d.draftOrder === 1) {
				props.SetDraftStartTime(new Date(d.userStartTime).getTime());
			}
			
			if (d.draftOrder === draftData.length) {
				props.SetDraftEndTime(new Date(d.userEndTime).getTime());
			}

			const userStartTimeMS = new Date(new Date(d.userEndTime).toLocaleString()).getTime();
			const userEndTimeMS = new Date(new Date(d.userEndTime).toLocaleString()).getTime();

			combinedData.push({
				user: userInfo.username ?? d.email.split("@")[0],
				teamName: userInfo.team,
				id: d.id,
				groupId: d.groupId,
				draftOrder: d.draftOrder,
				userStartTime: new Date(d.userStartTime).toLocaleTimeString(),
				userEndTime: new Date(d.userEndTime).toLocaleTimeString(),
				userStartTimeMS: userStartTimeMS, // collect time in milliseconds for later comparison
				userEndTimeMS: userEndTimeMS,
			});
		});

		SetDraftProgress(combinedData);
	}

	const updateGroup = (): boolean => {
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
							
							return true;
						}
					} else {
						return false;
						// user is not in any groups
					}
				}
			}).catch((reason) => {
				console.log(reason);
				SetDataFailedToLoad(true);
			});
		} else {
			// if group has already been loaded, but user chooses to change the group.
			return false;
		}
	}

	const refreshDraft = () => {
		if (state.AppStore.GroupId !== "") {
			SetDraftDataLoaded(false);
			GetDraftData(state.AppStore.GroupId).then((response: IDraftDataResponse) => {
				if (response?.data) {
					const data = response?.data;
					SetDraftDataLoaded(true);
					SetDraftData(data.sort((a: IDraftData, b: IDraftData) => (a.draftOrder > b.draftOrder) ? 1 : -1));
				} else {
					// something went wrong
				}
			}).catch((reason: any) => {
				SetDraftDataLoaded(true);
				SetDataFailedToLoad(true);
			});
		}
	}

	const refreshUsers = () => {
		if (state.AppStore.GroupId !== "") {
			SetUserDataLoaded(false);
			GetUserData(state.AppStore.GroupId).then((response: IUserDataResponse) => {
				if (response?.data) {
					const data = response?.data;
					SetUserDataLoaded(true);
					SetUsers(data);
				}
			}).catch((reason: any) => {
				SetUserDataLoaded(true);
				SetDataFailedToLoad(true);
			});
		}
	}

	const columns: ColumnDescription[] = [
		{
			dataField: 'draftOrder',
			text: 'Order'
		},
		{
			dataField: 'user',
			text: 'User'
		},
		{
			dataField: 'userStartTime',
			text: 'Start Draft Time'
		},
		{
			dataField: 'userEndTime',
			text: 'End Draft Time'
		},
		{
			dataField: 'teamName',
			text: 'Team'
		},
	];

	React.useEffect(() => {
		if (props.currentDate.getTime() < props.draftEndTime) {
			if (draftDataLoaded && userDataLoaded)  {
				if (draftProgress.length > 0 && nextUpRowIndex < draftProgress.length) {
					if (props.currentDate.getTime() > props.draftStartTime) { // the draft has started
						if (draftProgress[nextUpRowIndex].userEndTimeMS > props.currentDate.getTime()) { // user's time is up
							if (!draftProgress[nextUpRowIndex].teamName || draftProgress[nextUpRowIndex].teamName === "") { // user has not drafted
								// 	This users turn
							} else { // user has drafted
								SetNextUpRowIndex((nextUpRowIndex) => nextUpRowIndex + 1);
							}
						} else {
							SetNextUpRowIndex((nextUpRowIndex) => nextUpRowIndex + 1);
						}
					}
				}
			}
		} else {
			//the draft is over
		}
	}, [props.currentDate])

	const rowStyle = (row: IDraftProgressData, rowIndex: number) => {
		const style: React.CSSProperties = {};

		if (nextUpRowIndex === rowIndex && props.currentDate.getTime() > props.draftStartTime && props.currentDate.getTime() < props.draftEndTime) { 
			style.fontWeight = "bold";
			style.backgroundColor = '#F78387';
		} else if (row.user === state.AppStore.Email.split("@")[0] || row.user === state.AppStore.Username) {
			style.backgroundColor = '#c8e6c9';
		}

		return style;
	};

	return (
		<Card>
			<Card.Title className='card-title'>Draft Progress</Card.Title>
			<Card.Body style={{overflow: 'auto'}}>
				{state.AppStore.LoginStatus !== LoginEnum.Success ? (
					<div>
						<PleaseLogin />
					</div>
					) : (state.AppStore.GroupId !== "" ? (
							(!draftDataLoaded ? (
								<Loading />
								) : (!dataFailedToLoad ? (
										(draftProgress.length === 0 ? (
												<p>Draft has not been setup</p>
											) : (
												<>
													<p>{props.currentDate.toLocaleTimeString()}</p>
													<Button 							
														variant="warning" 
														disabled={props.currentDate.getTime() > props.draftEndTime}
														onClick={() => refreshAllDraftData()}>
														{"Refresh"}
													</Button>
													<br />
													<br />
													<BootstrapTable
														keyField='draftOrder'
														data={draftProgress}
														columns={columns} 
														rowStyle={rowStyle} />
												</>
											)
										)
									) : (
										<SomethingWentWrong />
									)
								)
							)
						) : (<p>Please select a group in your profile</p>)
					)
				}
			</Card.Body>
		</Card>
	);
}