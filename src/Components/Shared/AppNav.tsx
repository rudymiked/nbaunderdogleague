import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import GetAuthInformation from '../../services/data/GetAuthInformation';
import basketball from '../../images/basketball_black.png';
import { RootContext } from '../../services/Stores/RootStore';
import { AppActionEnum, LoginEnum } from '../../services/Stores/AppReducer';

export interface IUserInfo {
	FirstName: string;
	LastName: string;
	Email: string;
}

interface INavProps {};

export const AppNav: React.FunctionComponent<INavProps> = (props: INavProps) => {
	const [userInfo, SetUserInfo] = React.useState<IUserInfo>({FirstName: "", LastName: "", Email: ""});
	const [expanded, setExpanded] = React.useState(false);
	const { state, dispatch } = React.useContext(RootContext);
	const navigate = useNavigate();

	const navigateAndCollapse = (path: string) => {
		setExpanded(false);
		navigate(path);
	};

	React.useEffect(() => {
		GetAuthInformation().then((response: any) => {
			if (response?.data !== undefined) {
				const data = response.data;
				const respUserInfo: IUserInfo = {
					FirstName: data[0].user_claims[9].val,
					LastName: data[0].user_claims[10].val,
					Email: data[0].user_id,
				}

				SetUserInfo(respUserInfo);
				dispatch({
					type: AppActionEnum.LOGIN,
					token: data[0].access_token,
					Name: respUserInfo.FirstName + " " + respUserInfo.LastName,
					Email: respUserInfo.Email,
					LoginStatus: LoginEnum.Success,
				});
			}
		}).catch((reason: any) => {
			console.log(reason);
			dispatch({
				type: AppActionEnum.LOGIN_FAIL,
				LoginStatus: LoginEnum.Fail,
			});
		});
	}, []);

	return (
		<Navbar expanded={expanded} fixed='top' className="navbar-orange" bg="" variant="light" expand="lg">
			<Container>
				<Navbar.Brand href="/">
					<div>
						<img
							src={basketball}
							width="30"
							height="30"
							className="d-inline-block align-top"
							alt="logo"
						/>
						<span className="navbar-title">
							NBA Underdogs
						</span>
					</div>
				</Navbar.Brand>
				<Navbar.Toggle onClick={() => setExpanded(!expanded)} aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav>
						<Nav.Link onClick={() => navigateAndCollapse("/standings")}>
							Standings
						</Nav.Link>
						<Nav.Link onClick={() => navigateAndCollapse("/draft")}>
							Draft
						</Nav.Link>
						<Nav.Link onClick={() => navigateAndCollapse("/teams")}>
							NBA Data
						</Nav.Link>
						<Nav.Link onClick={() => navigateAndCollapse("/profile")}>
							{<b>{userInfo.FirstName} {userInfo.LastName}</b>}
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}