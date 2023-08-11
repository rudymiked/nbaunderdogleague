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
	const [expanded, setExpanded] = React.useState(false);
	const { state, dispatch } = React.useContext(RootContext);
	const navigate = useNavigate();

	const navigateAndCollapse = (path: string) => {
		setExpanded(false);
		navigate(path);
	};

	const disabledUntilLoggedIn = () => {
		return state.AppStore.LoginStatus !== LoginEnum.Success ? 'disabled' : null;
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
				<Navbar.Toggle onClick={() => setExpanded(!expanded)} aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav>
						<Nav.Link className={disabledUntilLoggedIn()} onClick={() => navigateAndCollapse("/league")}>
							League
						</Nav.Link>
						<Nav.Link className={disabledUntilLoggedIn()} onClick={() => navigateAndCollapse("/draft")}>
							Draft
						</Nav.Link>
						<Nav.Link className={disabledUntilLoggedIn()} onClick={() => navigateAndCollapse("/teams")}>
							Stats
						</Nav.Link>
						<Nav.Link className={disabledUntilLoggedIn()} onClick={() => navigateAndCollapse("/profile")}>
							{<b>{state.AppStore.Name}</b>}
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}