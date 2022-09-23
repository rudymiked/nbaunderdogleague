import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import GetAuthInformation from '../../services/data/GetAuthInformation';

export interface IUserInfo {
  FirstName: string;
  LastName: string; 
}

interface INavProps {};

export const AppNav: React.FunctionComponent<INavProps> = (props: INavProps) => {
  const navigate = useNavigate()

  const [ userInfo, SetUserInfo ] = React.useState<IUserInfo>({FirstName: "", LastName: ""});

  React.useEffect(() => {
    GetAuthInformation().then((response: any) =>{
      console.log(response);
      if (response?.data !== undefined) {
        const data = response.data;
        const respUserInfo: IUserInfo = {
          FirstName: data[0].user_claims[9].val,
          LastName: data[0].user_claims[10].val,
        }

        SetUserInfo(respUserInfo);
      }
    }).catch((reason: any) => {
      console.log(reason);
    });
  }, []);

  return (
      <Navbar collapseOnSelect fixed='top' className="navbar-orange" bg="" variant="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img
              src='/images/basketball_black.png'
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
              <Nav.Link 
                onClick={() => navigate("/")}
              >
                Home
              </Nav.Link>
              <Nav.Link 
                onClick={() => navigate("/draft")}
                >
                Draft
              </Nav.Link>
              <Nav.Link 
                onClick={() => navigate("/team")}
                >
                Team
              </Nav.Link>
              <Nav.Link 
                onClick={() => navigate("/standings")}
                >
                Standings
              </Nav.Link>
            </Nav>
            <div className="end">
              {/* <p>{userInfo.FirstName} {userInfo.LastName}</p> */}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}