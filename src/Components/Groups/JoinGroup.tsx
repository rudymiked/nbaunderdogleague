import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { IGroupData, IGroupDataArrayResponse, somethingWentWrongText } from '../../Pages/Profile';
import JoinGroupAction from '../../services/actions/JoinGroupAction';
import GetAllGroups from '../../services/data/GetGroups';
import { RootContext } from '../../services/Stores/RootStore';
import { Loading } from '../Shared/Loading';

// Join a group that someone else has created for this season

export interface IJoinGroupResponse {
	data: string;
}

const joinGroupText = "Join a group";

export const JoinGroup: React.FunctionComponent = () => {
	const [groups, SetGroups] = React.useState<IGroupData[]>([]);
	const [dataLoaded, SetDataLoaded] = React.useState<boolean>(false);
	const [requestResult, SetRequestResult] = React.useState<string>("");
	const [joinRequestResult, SetJoinRequestResult] = React.useState<string>("");
	const [dropdownText, SetDropdownText] = React.useState<string>(joinGroupText);
	const [selectedGroupId, SetSelectedGroupId] = React.useState<string>("");

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
				console.log(reason);
			});
		} else {
			// user not logged in
		}
	}, [state]);

	const selectAGroup = (key: string, name: string) => {
		SetSelectedGroupId(key);
		SetDropdownText(name);
	};

	const requestToJoinGroup = () => {
		JoinGroupAction(selectedGroupId, state.AppStore.Email).then((response: IJoinGroupResponse) => {
			if (response?.data !== undefined) {
				console.log(response);
				SetJoinRequestResult(response.data);
			}
		}).catch((reason: any) => {
			console.log(reason);
			SetJoinRequestResult(somethingWentWrongText);
		});
	};

	return (
		<div style={{padding: "10px", display:"block"}}>
			{dataLoaded ? (
				groups.length !== 0 ? (
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
										SetJoinRequestResult("Requesting...");
										requestToJoinGroup();
									}}
									aria-controls="join-a-group-request">
									{"Request To Join Group"}
								</Button>
								<br />
								<span>{joinRequestResult}</span>
							</>
						}
					<hr />
					</div>
				) : (
					<div>
					</div>
				)
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