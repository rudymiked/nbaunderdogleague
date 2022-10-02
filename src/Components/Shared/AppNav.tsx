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
	const { state, dispatch } = React.useContext(RootContext);
	const navigate = useNavigate();

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
		<Navbar collapseOnSelect fixed='top' className="navbar-orange" bg="" variant="light" expand="lg">
			<Container>
				<Navbar.Brand href="/">
				<img
					src={basketball}
					width="30"
					height="30"
					className="d-inline-block align-top"
					alt="logo"
				/>
				</Navbar.Brand>
				<Navbar.Brand href="/">NBA Underdogs</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
				<Nav>
					<Nav.Link onClick={() => navigate("/standings")}>
						Standings
					</Nav.Link>
					<Nav.Link onClick={() => navigate("/teams")}>
						Teams
					</Nav.Link>
					<Nav.Link onClick={() => navigate("/draft")}>
						Draft
					</Nav.Link>
					<Nav.Link onClick={() => navigate("/Profile")}>
						{<b>{userInfo.FirstName} {userInfo.LastName}</b>}
					</Nav.Link>
				</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}