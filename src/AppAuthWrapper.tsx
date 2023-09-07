import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { AppNav } from './Components/Shared/AppNav';
import { ArchiveStandings } from './Pages/ArchiveStandings';
import { Draft } from './Pages/Draft';
import { Home } from './Pages/Home';
import { IGroupData, IGroupDataArrayResponse, Profile } from './Pages/Profile';
import { PublicPolicy } from './Pages/PublicPolicy';
import { Teams } from './Pages/Teams';
import { GetAllGroupsUserIsInByYear, GetAuthInformation } from './services/data/GetRequests';
import { AppActionEnum, LoginEnum } from './services/Stores/AppReducer';
import { RootContext } from './services/Stores/RootStore';
import { SOMETHING_WENT_WRONG } from './Utils/AppConstants';
import { Join } from './Pages/Join';
import { League } from './Pages/League';
import { GetStarted } from './Pages/GetStarted';
import { Players } from './Pages/Players';

interface IAuthProps {};

export const AppAuthWrapper: React.FunctionComponent<IAuthProps> = (props: IAuthProps) => {
	const { state, dispatch } = React.useContext(RootContext);
	const { groupId } = useParams();

	React.useEffect(() => {
		if (state.AppStore.LoginStatus === LoginEnum.Success) {
			// need to update group information in state if the user refreshes the page (F5)
			updateGroup();
		}
	}, [state.AppStore.LoginStatus]);

	const updateGroup = () => {
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
						} else {
							console.log(SOMETHING_WENT_WRONG);
						}
					} else {
						// user is not in any groups
					}
				}
			}).catch((reason) => {
				console.log(reason);
			});
		}
	}

	return (
		<>
			<AppNav />
			<main id="main" tabIndex={-1} className='page-body'>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/league" element={<League />} />
					<Route path="/teams" element={<Teams />} />
					<Route path="/players" element={<Players />} />
					<Route path="/draft" element={<Draft />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/publicPolicy" element={<PublicPolicy />} />
					<Route path="/archive" element={<ArchiveStandings />} />
					<Route path="/join" element={<Join />} />
					<Route path="/join(/:groupId)" element={<Join groupId={groupId} />} />
					<Route path="/getstarted" element={<GetStarted />} />
				</Routes>
			</main>
		</>
	);
}