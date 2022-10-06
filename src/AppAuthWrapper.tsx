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

const givenName: string = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname";
const surname: string = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname";

export const AppAuthWrapper: React.FunctionComponent<IAuthProps> = (props: IAuthProps) => {
	const { state, dispatch } = React.useContext(RootContext);

	React.useEffect(() => {
		getAuthInfo();
	}, []);

	const getAuthInfo = () => {
		GetAuthInformation().then((response: any) => {
			if (response?.data !== undefined) {
				
				const data = response.data[0];
				console.log(data);

				const provider_name = data.provider_name;
				console.log(provider_name);

				let firstName: string = "";
				let lastName: string = "";

				for(const d of data?.user_claims) {
					console.log(d);
					if (d.typ === givenName) {
						firstName = d.val;
					}

					if (d.typ === surname) {
						lastName = d.val;
					}
				}

				const email = data?.user_id!;
				const token = data?.access_token!;

				if (email === "") {
					dispatch({
						type: AppActionEnum.LOGIN_FAIL,
						LoginStatus: LoginEnum.Fail,
					});
				} else {
					if (firstName === "") {
						firstName = email;
					}

					console.log(firstName);
					console.log(lastName);
					console.log(email);

					dispatch({
						type: AppActionEnum.LOGIN,
						Name: firstName + " " + lastName,
						Email: email,
						Token: token,
						LoginStatus: LoginEnum.Success,
					});
				}
			}
		}).catch((reason: any) => {
			console.log(reason);
			dispatch({
				type: AppActionEnum.LOGIN_FAIL,
				LoginStatus: LoginEnum.Fail,
			});
		});
	}

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
										<a href="/.auth/login/facebook?post_login_redirect_uri=/index.html">Facebook Login</a>
										<a href="/.auth/login/google?post_login_redirect_uri=/index.html">Google Login</a>
									</div>
									<Button
										onClick={getAuthInfo}
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