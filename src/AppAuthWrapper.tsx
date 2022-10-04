import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppNav } from './Components/Shared/AppNav';
import { Loading } from './Components/Shared/Loading';
import { Draft } from './Pages/Draft';
import { GroupStandings } from './Pages/GroupStandings';
import { Profile } from './Pages/Profile';
import { Teams } from './Pages/Teams';
import GetAuthInformation from './services/data/GetAuthInformation';
import { AppActionEnum, IAppState, LoginEnum } from './services/Stores/AppReducer';
import { RootContext } from './services/Stores/RootStore';

interface IAuthProps {};

export const AppAuthWrapper: React.FunctionComponent<IAuthProps> = (props: IAuthProps) => {
	const { state, dispatch } = React.useContext(RootContext);

	React.useEffect(() => {
		GetAuthInformation().then((response: any) => {
			if (response?.data !== undefined) {
				const data = response.data[0];

				const firstName = data.user_claims[9].val;
				const lastName = data.user_claims[10].val;
				const email = data.user_id;
				const token = data.access_token;

				dispatch({
					type: AppActionEnum.LOGIN,
					Name: firstName + " " + lastName,
					Email: email,
					Token: token,
					LoginStatus: LoginEnum.Success,
				});
			}
		}).catch((reason: any) => {
			dispatch({
				type: AppActionEnum.LOGIN_FAIL,
				LoginStatus: LoginEnum.Fail,
			});
		});
	}, []);

	return (
		<>
			{state.AppStore.LoginStatus === LoginEnum.Success ? (
				<>
					<AppNav />
					<main id="main" tabIndex={-1}>
						<Routes>
							<Route path="/" element={<GroupStandings />} />
							<Route path="/teams" element={<Teams />} />
							<Route path="/standings" element={<GroupStandings />} />
							<Route path="/draft" element={<Draft />} />
							<Route path="/profile" element={<Profile />} />
						</Routes>
					</main>
				</>
			) : (
				<>
					{state.AppStore.LoginStatus === LoginEnum.LoggingIn ? (
						<>
							<span>Please wait while we log you in...</span>
							<br />
							<Loading />
						</>
					) : (
						<>
							<span>There was an error while logging you in.</span>
						</>
					)}
				</>
			)}
		</>
	);
}