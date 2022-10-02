import React from 'react';
import {  Dropdown } from 'react-bootstrap';
import { IGroupData, IGroupDataArrayResponse, somethingWentWrongText } from '../../Pages/Profile';
import GetAllUsersGroups from '../../services/data/GetAllUsersGroups';
import { RootContext } from '../../services/Stores/RootStore';
import { Loading } from '../Shared/Loading';

// choose one of your groups

const yourGroupsText = "Your groups";

export const YourGroups: React.FunctionComponent = () => {
	const [groups, SetGroups] = React.useState<IGroupData[]>([]);
	const [dataLoaded, SetDataLoaded] = React.useState<boolean>(false);
	const [requestResult, SetRequestResult] = React.useState<string>("");

	const { state, dispatch } = React.useContext(RootContext);

	React.useEffect(() => {
		if (state.AppStore.Email !== "") {
			GetAllUsersGroups(state.AppStore.Email).then((response: IGroupDataArrayResponse) => {
				if (response?.data) {
					console.log(response.data);
					SetGroups(response.data.filter((group: IGroupData) => group.name && group.name !== ""));
				} else {
					SetRequestResult(somethingWentWrongText); 
				}
				
				SetDataLoaded(true);
			}).catch((reason: any) => {
				SetRequestResult(somethingWentWrongText);
				SetDataLoaded(true);
				console.log(reason);
			});
		} else {
			// user not logged in
		}
	},[state]);

	const selectAGroup = (e) => {
		console.log(e);
	};

	return (
		<div style={{padding: "10px", display:"block"}}>
			{dataLoaded ? (
				groups.length !== 0 ? (
					<div id="your-groups-collapse-text">
					<Dropdown>
						<Dropdown.Toggle variant="dark" id="groups-dropdown">
							{yourGroupsText}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{groups.filter((val) => val?.name !== "").map(group => (
								<Dropdown.Item 
									key={group.id.toString()} 
									value={group.name}>
									{group.name}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
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
			{/* </Collapse> */}
		</div>
	);
}