import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { IGroupData, IGroupDataArrayResponse, somethingWentWrongText } from '../../Pages/Profile';
import GetAllGroups from '../../services/data/GetGroups';
import { RootContext } from '../../services/Stores/RootStore';

// Join a group that someone else has created for this season

const joinGroupText = "Join a group";

export const JoinGroup: React.FunctionComponent = () => {
	const [groups, SetGroups] = React.useState<IGroupData[]>([])
	const [open, SetOpen] = React.useState<boolean>(false);
	const [requestResult, SetRequestResult] = React.useState<string>("");
	const [dropdownText, SetDropdownText] = React.useState<string>(joinGroupText);
	const [selectedGroupId, SetSelectedGroupId] = React.useState<string>("");

	const { state, dispatch } = React.useContext(RootContext);

	React.useEffect(() => {
		if (state.AppStore.Email !== "") {
			GetAllGroups(false, state.AppStore.Email).then((response: IGroupDataArrayResponse) => {
				if (response?.data) {
					console.log(response.data);
					SetGroups(response.data.filter((group: IGroupData) => group.name && group.name !== ""));
				} else {
					SetRequestResult(somethingWentWrongText); 
				}
			}).catch((reason: any) => {
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
		console.log(key);
		//console.log(e.target.__reactProps$3bee1z43xvm.value);
	};

	const requestToJoinGroup = () => {
		//call api to join group
	};

	return (
		<div style={{padding: "10px", display:"block"}}>
			{groups.length !== 0 ? (
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
				</div>
				) : (
				<div>
					<span>There are no groups to join, create one!</span>
				</div>
				)
			}

			<br />
			
			{selectedGroupId !== "" && 
				<Button
					onClick={() => requestToJoinGroup}
					aria-controls="join-a-group-request"
					aria-expanded={open}>
					{"Request To Join Group"}
				</Button>
			}
		</div>
	);
}