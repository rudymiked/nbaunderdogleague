import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Route, Routes, useParams } from 'react-router-dom';
import { AppNav } from './Components/Shared/AppNav';
import { Loading } from './Components/Shared/Loading';
import { ArchiveStandings } from './Pages/ArchiveStandings';
import { Draft } from './Pages/Draft';
import { Home } from './Pages/Home';
import { IGroupData, IGroupDataArrayResponse, Profile } from './Pages/Profile';
import { PublicPolicy } from './Pages/PublicPolicy';
import { Teams } from './Pages/Teams';
import { AppStart, GetAllGroupsUserIsInByYear, GetAuthInformation } from './services/data/GetRequests';
import { AppActionEnum, LoginEnum } from './services/Stores/AppReducer';
import { RootContext } from './services/Stores/RootStore';
import { SOMETHING_WENT_WRONG } from './Utils/AppConstants';
import { Join } from './Pages/Join';
import { League } from './Pages/League';
import { GetStarted } from './Pages/GetStarted';

interface IAuthProps {};

const givenName: string = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname";
const surname: string = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname";
const redirectDefault: string = "/.auth/login/google?post_login_redirect_uri=/";

export const AppAuthWrapper: React.FunctionComponent<IAuthProps> = (props: IAuthProps) => {
	const [authEmail, SetAuthEmail] = React.useState<string>("");
	const { state, dispatch } = React.useContext(RootContext);
	const [redirectPage, SetRedirectPage] = React.useState<string>(redirectDefault);
	const { groupId } = useParams();

	React.useEffect(() => {
		AppStart();

		const page: string = window.location.href.split("/").at(-1);
		SetRedirectPage(redirectDefault + page);

		if (authEmail === "") {
			getAuthInfo();
		}

		if (state.AppStore.LoginStatus === LoginEnum.Success) {
			// need to update group information in state if the user refreshes the page (F5)
			updateGroup();
		}
	}, [state.AppStore.LoginStatus]);

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
			console.log("updateGroup");
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
					<Route path="/draft" element={<Draft />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/publicPolicy" element={<PublicPolicy />} />
					<Route path="/archive" element={<ArchiveStandings />} />
					<Route path="/join(/:groupId)" element={<Join />} />
					<Route path="/getstarted" element={<GetStarted />} />
				</Routes>
			</main>
		</>
	);
}