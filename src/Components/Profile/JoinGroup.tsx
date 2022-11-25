import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { IGroupData, somethingWentWrongText } from '../../Pages/Profile';
import { JoinGroupAction } from '../../services/actions/PostRequests';
import { AppActionEnum } from '../../services/Stores/AppReducer';
import { RootContext } from '../../services/Stores/RootStore';
import { Loading } from '../Shared/Loading';

// Join a group that someone else has created for this season

interface IJoinGroupProps {
	refresh: number;
	SetRefresh: React.Dispatch<React.SetStateAction<number>>;
	groups: IGroupData[];
	dataLoaded: boolean;
	loadGroups: () => void;
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

	const { state, dispatch } = React.useContext(RootContext);

	React.useEffect(() => {
		props.loadGroups();
	}, [props.refresh]);

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
			{props.dataLoaded ? (
				//groups.length !== 0 ? (
					<div id="join-a-group-collapse-text">
						<Dropdown>
							<Dropdown.Toggle id="groups-dropdown">
								{dropdownText}
							</Dropdown.Toggle>
							<Dropdown.Menu>
								{props.groups.filter((val) => val?.name !== "").map(group => (
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
					<Loading />
				</div>
				)
			}
			<span>{requestResult}</span>
		</div>
	);
}