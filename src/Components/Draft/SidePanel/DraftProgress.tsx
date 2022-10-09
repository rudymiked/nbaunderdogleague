import React from 'react';
import { Card } from 'react-bootstrap';
import './DraftProgress.css';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import GetUserData from '../../../services/data/GetUserData';
import { Loading } from '../../Shared/Loading';
import { Error } from '../../Error/Error';
import { Guid } from 'guid-typescript';
import { IEntity } from '../../../App';
import GetDraftData from '../../../services/data/GetDraftData';
import { RootContext } from '../../../services/Stores/RootStore';
import { LoginEnum, AppActionEnum } from '../../../services/Stores/AppReducer';
import GetAllUsersGroups from '../../../services/data/GetAllUsersGroups';
import { IGroupDataArrayResponse, somethingWentWrongText, IGroupData } from '../../../Pages/Profile';

export interface IDraftProgressProps {
	userDrafted: IUserData;
	currentDate: Date;
	draftStartTime: number;
	SetDraftStartTime: React.Dispatch<React.SetStateAction<Number>>;
	SetDraftEndTime: React.Dispatch<React.SetStateAction<Number>>;
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

export interface IUserData  extends IEntity {
	email: string;
	team: string;
	groupId: Guid;
}

export interface IDraftProgressData {
	user: string;
	team: string;
	id: string;
	groupId: Guid;
	draftOrder: number;
	userStartTime: string;
	userEndTime: string;
	userStartTimeMS: number;
	userEndTimeMS: number;
}

export interface IUserDataResponse {
	data: IUserData[];
}

const defaultDraft: IDraftProgressData[] = [{
	team: "",
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
	const [draftProgress, SetDraftProgress] = React.useState<IDraftProgressData[]>(defaultDraft);
	const [draftDataLoaded, SetDraftDataLoaded] = React.useState<Boolean>(false);
	const [userDataLoaded, SetUserDataLoaded] = React.useState<Boolean>(false);
	const [dataFailedToLoad, SetDataFailedToLoad] = React.useState<Boolean>(false);
	const [draftStartDateTime, SetDraftStartDateTime] = React.useState<string>("");
	const [nextUpRowIndex, SetNextUpRowIndex] = React.useState<number>(0);

	const { state, dispatch } = React.useContext(RootContext);

	React.useEffect(() => {
		if (state.AppStore.LoginStatus === LoginEnum.Success) {
			updateGroup();
			refreshDraft();
			refreshUsers();
		}
	}, [state]);


	React.useEffect(() => {
		if (props.userDrafted?.team !== "") {
			updateFromDraft(props.userDrafted?.team);
		}
	}, [props.userDrafted?.team]);

	React.useEffect(() => {
		if (draftDataLoaded && userDataLoaded) {
			// combine user and draft data
			console.log("Updating Draft Progress");
			combineUserAndDraftData();
		}
	}, [draftDataLoaded, userDataLoaded]);

	React.useEffect(() => {
		if (props.currentDate.getTime() > props.draftStartTime) {
			if (props.currentDate.getMinutes() % 5 === 0 && props.currentDate.getSeconds() === 0) {
				refreshDraft();
				refreshUsers();
			}
		}
	},[props.currentDate]);

	const updateFromDraft = (team: string) => {
		const oldData: IDraftProgressData[] = draftProgress;
		const updatedDraftProgress: IDraftProgressData[] = [];

		for(const d of oldData) {
			updatedDraftProgress.push({
				team: props.userDrafted?.email.split("@")[0] === d.user ? props.userDrafted?.team : d.team,
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
		let draftEndTime: number = 0;

		draftData.forEach(d => {
			const userInfo: IUserData = userData.filter((u: IUserData) => u.email === d.email)[0];
			// first to draft, to collect draft start datetime
			if (d.draftOrder === 1) {
				SetDraftStartDateTime(new Date(d.userStartTime).toLocaleString());
				props.SetDraftStartTime(new Date(d.userStartTime).getTime());
			}

			combinedData.push({
				user: d.email.split("@")[0],
				team: userInfo.team,
				id: d.id,
				groupId: d.groupId,
				draftOrder: d.draftOrder,
				userStartTime: new Date(d.userStartTime).toLocaleTimeString(),
				userEndTime: new Date(d.userEndTime).toLocaleTimeString(),
				userStartTimeMS: new Date(d.userStartTime).getTime(), // collect time in milliseconds for later comparison
				userEndTimeMS: new Date(d.userEndTime).getTime(),
			});
			
			draftEndTime = Math.max(draftEndTime, new Date(d.userEndTime).getTime());
		});

		props.SetDraftEndTime(draftEndTime);
		SetDraftProgress(combinedData);
	}

	const updateGroup = () => {
		if (state.AppStore.GroupId === "") {
			// group ID has not been set
			// need to load groups and set first index for standings
			// also need to set group ID in context

			GetAllUsersGroups(state.AppStore.Email).then((response: IGroupDataArrayResponse) => {
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
						} else {
							console.log(somethingWentWrongText);
						}
					} else {
						// user is not in any groups
					}
				}
			}).catch((reason) => {
				SetDataFailedToLoad(true);
			});
		} else {
			// if group has already been loaded, but user chooses to change the group.
		}
	}

	const refreshDraft = () => {
		if (state.AppStore.GroupId !== "") {
			SetDataFailedToLoad(false);
			GetDraftData(state.AppStore.GroupId).then((response: IDraftDataResponse) => {
				if (response?.data) {
					const data = response?.data;
					SetDraftDataLoaded(true);
					SetDraftData(data.sort((a: IDraftData, b: IDraftData) => (a.draftOrder > b.draftOrder) ? 1 : -1));
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
			dataField: 'team',
			text: 'Team'
		},
	];

	const rowStyle = (row: IDraftProgressData, rowIndex: number) => {
		const style: React.CSSProperties = {};
		
		if (row.user === state.AppStore.Email.split("@")[0]) {
			style.backgroundColor = '#c8e6c9';
		}

		const now: Date = new Date();
		let userIsUp = false;

		if (row.userEndTimeMS > now.getTime()) { // user's time is up
			if (!row.team || row.team === "") { // user has not drafted
				if (nextUpRowIndex === rowIndex) { // next row up to draft
					userIsUp = true;
				}
			} else { // user has drafted
				SetNextUpRowIndex(rowIndex + 1);
			}
		} else {
			SetNextUpRowIndex(rowIndex + 1);
		}

		if (userIsUp) { 
			style.fontWeight = "bold";
			style.backgroundColor = '#F78387';
		}

		return style;
	};

	return (
		<Card>
			<Card.Title className='card-title'>Draft Progress</Card.Title>
			<Card.Body style={{overflow: 'auto'}}>
				{state.AppStore.LoginStatus !== LoginEnum.Success ? (
					<div>
						<a href="/">Please Login</a>
					</div>
					) : (!draftDataLoaded ? (
							<Loading />
						) : ( !dataFailedToLoad ? (
							<>
								<p>{props.currentDate.toLocaleTimeString()}</p>
								<BootstrapTable
									keyField='draftOrder'
									data={draftProgress}
									columns={columns} 
									rowStyle={rowStyle} />
							</>
							) : (
								<Error />
							)
						)
					)
				}
			</Card.Body>
		</Card>
	);
}