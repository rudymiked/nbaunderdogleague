import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { IGroupData, IGroupDataArrayResponse, somethingWentWrongText } from '../../Pages/Profile';
import JoinGroupAction from '../../services/actions/JoinGroupAction';
import GetAllGroups from '../../services/data/GetGroups';
import { AppActionEnum } from '../../services/Stores/AppReducer';
import { RootContext } from '../../services/Stores/RootStore';
import { Loading } from '../Shared/Loading';

// Join a group that someone else has created for this season

interface IJoinGroupProps {

}

export interface IJoinGroupResponse {
	data: string;
}

const joinGroupText = "Join a group";

export const JoinGroup: React.FunctionComponent<IJoinGroupProps> = (props: IJoinGroupProps) => {
	const [groups, SetGroups] = React.useState<IGroupData[]>([]);
	const [dataLoaded, SetDataLoaded] = React.useState<boolean>(false);
	const [requesting, SetRequesting] = React.useState<boolean>(false);
	const [requestResult, SetRequestResult] = React.useState<string>("");
	const [joinRequestResult, SetJoinRequestResult] = React.useState<string>("");
	const [dropdownText, SetDropdownText] = React.useState<string>(joinGroupText);
	const [selectedGroupId, SetSelectedGroupId] = React.useState<string>("");
	const [selectedGroupName, SetSelectedGroupName] = React.useState<string>("");

	const { state, dispatch } = React.useContext(RootContext);

	React.useEffect(() => {
		if (state.AppStore.Email !== "") {
			GetAllGroups(false, state.AppStore.Email).then((response: IGroupDataArrayResponse) => {
				if (response?.data) {
					SetGroups(response.data.filter((group: IGroupData) => group.name && group.name !== ""));
				} else {
					SetRequestResult(somethingWentWrongText);
				}

				SetDataLoaded(true);
			}).catch((reason: any) => {
				SetDataLoaded(true);
				SetRequestResult(somethingWentWrongText);
			});
		} else {
			// user not logged in
		}
	}, [state]);

	const selectAGroup = (key: string, name: string) => {
		SetSelectedGroupId(key);
		SetSelectedGroupName(name);
		SetDropdownText(name);
	};

	const requestToJoinGroup = () => {
		JoinGroupAction(selectedGroupId, state.AppStore.Email).then((response: IJoinGroupResponse) => {
			if (response?.data !== undefined) {
				if (response?.data === "") {
					SetJoinRequestResult(somethingWentWrongText);
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
			SetJoinRequestResult(somethingWentWrongText);
		});
	};

	return (
		<div style={{ padding: "10px", display:"block" }}>
			{dataLoaded ? (
				//groups.length !== 0 ? (
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
									aria-controls="join-a-group-request">
									{"Request To Join Group"}
								</Button>
								<br />
								<span>{joinRequestResult}</span>
							</>
						}
					</div>
				) : (
					<div>
						<p>No more groups to join!</p>
					</div>
				)
				// ) : (
				// <div>
				// 	<Loading />
				// </div>
				// )
			}
			<span>{requestResult}</span>
		</div>
	);
}