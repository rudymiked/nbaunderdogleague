import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { IGroupData, IGroupDataArrayResponse } from '../../Pages/Profile';
import { JoinGroupAction } from '../../services/actions/PostRequests';
import { AppActionEnum, LoginEnum } from '../../services/Stores/AppReducer';
import { RootContext } from '../../services/Stores/RootStore';
import { CURRENT_YEAR, SOMETHING_WENT_WRONG, SUCCESS } from '../../Utils/AppConstants';
import { Loading } from '../Shared/Loading';
import { PleaseLogin } from '../Shared/PleaseLogin';
import { GetAllGroupsByYear, GetAllGroupsUserIsInByYear, GetUserData } from '../../services/data/GetRequests';
import { IUserData, IUserDataResponse } from './UserInformation';
import { Guid } from 'guid-typescript';

// Join a group that someone else has created for this season

interface IJoinGroupProps {
	refresh: number;
}

export interface IJoinGroupResponse {
	data: string;
}

const joinGroupText = "Join a group";

export const JoinGroup: React.FunctionComponent<IJoinGroupProps> = (props: IJoinGroupProps) => {
	const [requesting, SetRequesting] = React.useState<boolean>(false);
	const [requestResult, SetRequestResult] = React.useState<string>("");
	const [joinRequestResult, SetJoinRequestResult] = React.useState<string>("");
	const [dropdownText, SetDropdownText] = React.useState<string>(joinGroupText);
	const [selectedGroupId, SetSelectedGroupId] = React.useState<string>("");
	const [selectedGroupName, SetSelectedGroupName] = React.useState<string>("");
	const [groups, SetGroups] = React.useState<IGroupData[]>([]);
	const [dataLoaded, SetDataLoaded] = React.useState<boolean>(false);
	
	const { state, dispatch } = React.useContext(RootContext);

	React.useEffect(() => {
		loadGroups();
	}, [props.refresh]);

	React.useEffect(() => {
		if (state.AppStore.Email !== "") {
			loadGroups();
		} else {
			// user not logged in
		}
	}, []);
    
    const loadGroups = () => {
		let groupsUsersIsIn: Guid[];
		
		GetAllGroupsUserIsInByYear(state.AppStore.Email).then((response: IGroupDataArrayResponse) => {
			if (response?.data) {
				const usersGroups: IGroupData[] = response?.data;
				groupsUsersIsIn = usersGroups.map(x => x.id);
			}
		}).catch((reason: any) => {
			console.log(reason);
		}).finally(() => {
			GetAllGroupsByYear(CURRENT_YEAR).then((response: IGroupDataArrayResponse) => {
				if (response?.data) {
					const data = response.data;
					const groupsUsersIsNotIn: IGroupData[] = data.filter((group: IGroupData) => group.name && group.name.trim() !== "" && !groupsUsersIsIn.includes(group.id));
					SetGroups(groupsUsersIsNotIn);
				} else {
					// something went wrong
				}

				SetDataLoaded(true);
			}).catch((reason: any) => {
				SetDataLoaded(true);
			});
		});
	};

	const selectAGroup = (key: string, name: string) => {
		SetSelectedGroupId(key);
		SetSelectedGroupName(name);
		SetDropdownText(name);
	};

	const requestToJoinGroup = () => {
		SetRequesting(true);
		SetJoinRequestResult("Requesting...");

		JoinGroupAction(selectedGroupId, state.AppStore.Email).then((response: IJoinGroupResponse) => {
			if (response?.data !== undefined) {
				if (response?.data === "") {
					SetJoinRequestResult(SOMETHING_WENT_WRONG);
				} else {
					if (response?.data === SUCCESS) {
						SetJoinRequestResult("Successfully requested! Your admin will alert you when you've been approved.");
					} else {
						SetJoinRequestResult(response.data);
					}
					dispatch({
						type: AppActionEnum.UPDATE_GROUP,
						GroupId: selectedGroupId,
						GroupName: selectedGroupName,
					});
				}
			}
		}).catch((reason: any) => {
			SetJoinRequestResult(SOMETHING_WENT_WRONG);
		}).finally(() => {
			SetRequesting(false);
			SetDropdownText(joinGroupText);
		});
	};

	return (
		<div style={{ padding: "10px", display:"block" }}>
			{dataLoaded ? (
				<>
					{state.AppStore.LoginStatus === LoginEnum.Success ? (
						<div id="join-a-group-collapse-text">
							<Dropdown>
								<Dropdown.Toggle id="groups-dropdown">
									{dropdownText}
								</Dropdown.Toggle>
								<Dropdown.Menu>
									{groups.filter((val) => val?.name !== "").map(group => (
										<Dropdown.Item
											key={group.id.toString()}
											value={group.name}
											onClick={() => selectAGroup(group.id.toString(), group.name)}>
											{group.name}
										</Dropdown.Item>
									))}
								</Dropdown.Menu>
							</Dropdown>
							<br />

							{selectedGroupId !== "" &&
								<>
									<Button
										onClick={() => {
											requestToJoinGroup();
										}}
										disabled={requesting}
										aria-controls="join-a-group-request"
										variant={"dark"}>
										{"Request To Join Group"}
									</Button>
									<br />
									<span>{joinRequestResult}</span>
								</>
							}
						</div>
					) : (
						<PleaseLogin />
					)}
				</>
				) : (
				<div>
					<Loading />
				</div>
				)
			}
			<span>{requestResult}</span>
		</div>
	);
}