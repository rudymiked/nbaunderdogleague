import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { RootContext } from '../../services/Stores/RootStore';

interface IUserInformationProps {}

const userInfoText: string = "User Information";

export const UserInformation: React.FC = (props: IUserInformationProps) => {
	const [refresh, SetRefresh] = React.useState<number>(0);
    const [requestResult, SetRequestResult] = React.useState<string>("");
    const [newUserName, SetNewUserName] = React.useState<string>("");

	const { state } = React.useContext(RootContext);

	React.useEffect(() => {
	}, [state]);

	React.useEffect(() => {
		console.log(refresh);
	}, [refresh]);

    const changeUsername = () => {

    };

    const updateUserName = (e: any) => {
		SetNewUserName(e.target.value);
	};

	return (
		<div style={{padding: "10px", display:"block"}}>
            <h4>{userInfoText}</h4>
            <Container>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formCreateGroup">
                            <Form.Label>Update Username</Form.Label>
                            <Form.Control type="text" placeholder={state.AppStore.Name} onChange={(e) => updateUserName(e)} />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Button
                            onClick={() => changeUsername()}
                            aria-controls="change-username-request">
                            Submit
                        </Button>
                        <br />
                        <span>{requestResult}</span>
                    </Col>
                </Row>
            </Container>
            <hr />
        </div>
	);
}