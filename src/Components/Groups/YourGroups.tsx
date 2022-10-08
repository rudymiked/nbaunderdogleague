import React from 'react';
import {  Dropdown } from 'react-bootstrap';
import { IGroupData, IGroupDataArrayResponse, somethingWentWrongText } from '../../Pages/Profile';
import GetAllUsersGroups from '../../services/data/GetAllUsersGroups';
import { AppActionEnum } from '../../services/Stores/AppReducer';
import { RootContext } from '../../services/Stores/RootStore';
import { Loading } from '../Shared/Loading';

// choose one of your groups

interface IYourGroupsProps {

}

const yourGroupsText = "Your groups";
const groupChangedText = "Group Changed!";

export const YourGroups: React.FunctionComponent<IYourGroupsProps> = (props: IYourGroupsProps) => {
	const [groups, SetGroups] = React.useState<IGroupData[]>([]);
	const [dataLoaded, SetDataLoaded] = React.useState<boolean>(false);
	const [requestResult, SetRequestResult] = React.useState<string>("");
	const [dropdownText, SetDropdownText] = React.useState<string>(yourGroupsText);
	const [showChangeDropdown, SetShowChangeDropdown] = React.useState<boolean>(false);

	const { state, dispatch } = React.useContext(RootContext);

	React.useEffect(() => {
		if (state.AppStore.Email !== "") {
			GetAllUsersGroups(state.AppStore.Email).then((response: IGroupDataArrayResponse) => {
				if (response?.data) {
					SetGroups(response.data.filter((group: IGroupData) => group.name && group.name !== ""));
				} else {
					SetRequestResult(somethingWentWrongText);
				}

				SetDataLoaded(true);
			}).catch((reason: any) => {
				SetRequestResult(somethingWentWrongText);
				SetDataLoaded(true);
			});
		} else {
			// user not logged in
		}
	}, [state]);

	const selectAGroup = (key: string, name: string) => {
		SetDropdownText(name);

		dispatch({
			type: AppActionEnum.UPDATE_GROUP,
			GroupId: key,
			GroupName: name,
		});

		SetShowChangeDropdown(true);
	};

	return (
		<div style={{padding: "10px", display:"block"}}>
			{dataLoaded ? (
				groups.length !== 0 ? (
					<div id="your-groups-collapse-text">
					<Dropdown>
						<Dropdown.Toggle variant="dark" id="groups-dropdown">
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
					<span hidden={!showChangeDropdown}>{groupChangedText}</span>
					<hr />
					</div>
					) : (
						<div>
							<span>You aren't in any groups, join or create one!</span>
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