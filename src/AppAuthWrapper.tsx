import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import { AppNav } from './Components/Shared/AppNav';
import { Loading } from './Components/Shared/Loading';
import { ArchiveStandings } from './Pages/ArchiveStandings';
import { Draft } from './Pages/Draft';
import { GroupStandings } from './Pages/GroupStandings';
import { IGroupData, IGroupDataArrayResponse, Profile, somethingWentWrongText } from './Pages/Profile';
import { PublicPolicy } from './Pages/PublicPolicy';
import { Teams } from './Pages/Teams';
import { AppStart, GetAllGroupsUserIsInByYear, GetAuthInformation } from './services/data/GetRequests';
import { AppActionEnum, LoginEnum } from './services/Stores/AppReducer';
import { RootContext } from './services/Stores/RootStore';

interface IAuthProps {};

const givenName: string = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname";
const surname: string = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname";

export const AppAuthWrapper: React.FunctionComponent<IAuthProps> = (props: IAuthProps) => {
	const [authEmail, SetAuthEmail] = React.useState<string>("");
	const { state, dispatch } = React.useContext(RootContext);
	const [noGroups, SetNoGroups] = React.useState<boolean>(false);
	const [groupId, SetGroupId] = React.useState<string>("");

	React.useEffect(() => {
		AppStart();

		if (authEmail === "" && state.AppStore.LoginStatus !== LoginEnum.Fail) {
			getAuthInfo();
		}
	}, [state]);

	const getAuthInfo = () => {
		GetAuthInformation().then((response: any) => {
			if (response?.data !== undefined) {
				const data = response.data[0];

				const provider_name = data.provider_name;
				console.log("logged in using: " + provider_name);

				let firstName: string = "";
				let lastName: string = "";

				for(const d of data?.user_claims) {
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
					SetAuthEmail(email);
					if (firstName === "") {
						firstName = email;
					}

					dispatch({
						type: AppActionEnum.LOGIN,
						Name: firstName + " " + lastName,
						Email: email,
						Token: token,
						LoginStatus: LoginEnum.Success,
					});

					updateGroup();
				}
			}
		}).catch((reason: any) => {
			dispatch({
				type: AppActionEnum.LOGIN_FAIL,
				LoginStatus: LoginEnum.Fail,
			});
		});
	}

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
							console.log(somethingWentWrongText);
						}
					} else {
						// user is not in any groups
						SetNoGroups(true);
					}
				}
			}).catch((reason) => {
				SetNoGroups(true);
			});
		} else {
			// if group has already been loaded, but user chooses to change the group.
			SetGroupId(state.AppStore.GroupId);
		}
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
						<Route path="/archive" element={<ArchiveStandings />} />
					</Routes>
				) : (state.AppStore.LoginStatus === LoginEnum.LoggingIn ? (
						<Card style={{padding: '10px'}}>
							<Card.Title className='card-title'>Please wait while we log you in...</Card.Title>
							<Card.Body>
								<Loading />
							</Card.Body>
						</Card>
						) : (
							<Card style={{padding: '10px'}}>
								<Card.Title className='card-title'>Please Login</Card.Title>
								<Card.Body>
									<div>
										<Button
											href={"/.auth/login/google?post_login_redirect_uri=/standings"}
											aria-controls="login-with-google">
											{"Login with Google"}
										</Button>
										<br />
										<br />
										{/* <Button
											href={"/.auth/login/facebook?post_login_redirect_uri=/standings"}
											aria-controls="login-with-facebook">
											{"Login with Facebook"}
										</Button> */}
									</div>
								</Card.Body>
							</Card>
					)
				)}
			</main>
		</>
	);
}