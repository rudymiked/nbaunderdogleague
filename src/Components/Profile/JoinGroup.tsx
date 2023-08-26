import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { IGroupData, IGroupDataArrayResponse } from '../../Pages/Profile';
import { JoinGroupAction } from '../../services/actions/PostRequests';
import { AppActionEnum, LoginEnum } from '../../services/Stores/AppReducer';
import { RootContext } from '../../services/Stores/RootStore';
import { CURRENT_YEAR, SOMETHING_WENT_WRONG } from '../../Utils/AppConstants';
import { Loading } from '../Shared/Loading';
import { PleaseLogin } from '../Shared/PleaseLogin';
import { GetAllGroupsByYear } from '../../services/data/GetRequests';

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
	}, [state]);
    
    const loadGroups = () => {
		GetAllGroupsByYear(CURRENT_YEAR).then((response: IGroupDataArrayResponse) => {
			if (response?.data) {
				const data = response.data;
				SetGroups(data.filter((group: IGroupData) => group.name && group.name !== ""));
			} else {
				// something went wrong
			}

			SetDataLoaded(true);
		}).catch((reason: any) => {
			SetDataLoaded(true);
		});
	};

	const selectAGroup = (key: string, name: string) => {
		SetSelectedGroupId(key);
		SetSelectedGroupName(name);
		SetDropdownText(name);
	};

	const requestToJoinGroup = () => {
		JoinGroupAction(selectedGroupId, state.AppStore.Email).then((response: IJoinGroupResponse) => {
			if (response?.data !== undefined) {
				if (response?.data === "") {
					SetJoinRequestResult(SOMETHING_WENT_WRONG);
				} else {
					SetJoinRequestResult(response.data + " Please navigate to the Draft to see your draft start time.");

					dispatch({
						type: AppActionEnum.UPDATE_GROUP,
						GroupId: selectedGroupId,
						GroupName: selectedGroupName,
					});
				}
			}
		}).catch((reason: any) => {
			SetJoinRequestResult(SOMETHING_WENT_WRONG);
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
											SetRequesting(true);
											SetJoinRequestResult("Requesting...");
											requestToJoinGroup();
											SetRequesting(false);
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