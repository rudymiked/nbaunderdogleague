import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import { AppNav } from './Components/Shared/AppNav';
import { Loading } from './Components/Shared/Loading';
import { Draft } from './Pages/Draft';
import { GroupStandings } from './Pages/GroupStandings';
import { Login } from './Pages/Login';
import { Profile } from './Pages/Profile';
import { PublicPolicy } from './Pages/PublicPolicy';
import { Teams } from './Pages/Teams';
import GetAuthInformation from './services/data/GetAuthInformation';
import { AppActionEnum, LoginEnum } from './services/Stores/AppReducer';
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
			<AppNav />
			<main id="main" tabIndex={-1} className='page-body'>
				{state.AppStore.LoginStatus === LoginEnum.Success ? (
					<Routes>
						<Route path="/" element={<GroupStandings />} />
						<Route path="/teams" element={<Teams />} />
						<Route path="/standings" element={<GroupStandings />} />
						<Route path="/draft" element={<Draft />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/publicPolicy" element={<PublicPolicy />} />
						<Route path="/login" element={<Login />} />
					</Routes>
				) : (
					<>
						{state.AppStore.LoginStatus === LoginEnum.LoggingIn ? (
							<Card style={{padding: '10px'}}>
								<Card.Title className='card-title'>Please wait while we log you in...</Card.Title>
								<Card.Body>
									<Loading />
								</Card.Body>
							</Card>
						) : (
							<Card style={{padding: '10px'}}>
								<Card.Title className='card-title'>Login failed!</Card.Title>
								<Card.Body>
									<div>
										<span>Bummer! Please contact the site admin.</span>
										<br />
										<br />
										<a href="/.auth/login/facebook">Facebook Login</a>
										<a href="/.auth/login/google">Google Login</a>
									</div>
									<Button
										href="/"
										aria-controls="navigate-to-home">
										{"Retry login"}
									</Button>
								</Card.Body>
							</Card>
						)}
					</>
				)}
			</main>
		</>
	);
}