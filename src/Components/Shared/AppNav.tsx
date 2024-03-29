import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import basketball from '../../images/basketball_orange.png';
import { RootContext } from '../../services/Stores/RootStore';
import { LoginEnum } from '../../services/Stores/AppReducer';
import { SITE_NAME } from '../../Utils/AppConstants';

interface INavProps {};

export const AppNav: React.FunctionComponent<INavProps> = (props: INavProps) => {
	const [expanded, SetExpanded] = React.useState(false);
	const [profileLinkText, SetProfileLinkText] = React.useState<string>("");
	const [showAllNav, SetShowAllNav] = React.useState<boolean>(false);
	const { state, dispatch } = React.useContext(RootContext);
	const navigate = useNavigate();

	React.useEffect(() => {
		if (state.AppStore.LoginStatus === LoginEnum.Success) {
			SetShowAllNav(true);
			SetProfileLinkText(state.AppStore.Name);
		} else {
			SetShowAllNav(false);
			SetProfileLinkText("LOGIN");
		}
	}, [state])

	const navigateAndCollapse = (path: string) => {
		SetExpanded(false);
		navigate(path);
	};

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
							{SITE_NAME}
						</span>
					</div>
				</Navbar.Brand>
				<Navbar.Toggle onClick={() => SetExpanded(!expanded)} aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav>
						<Nav.Link hidden={!showAllNav} onClick={() => navigateAndCollapse("/league")}>
							League
						</Nav.Link>
						<Nav.Link hidden={!showAllNav} onClick={() => navigateAndCollapse("/draft")}>
							Draft
						</Nav.Link>
						<Nav.Link onClick={() => navigateAndCollapse("/teams")}>
							Teams
						</Nav.Link>
						<Nav.Link onClick={() => navigateAndCollapse("/players")}>
							Players
						</Nav.Link>
						<Nav.Link onClick={() => navigateAndCollapse("/profile")}>
							{<b>{profileLinkText}</b>}
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}