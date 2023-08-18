import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { UpdateUser } from '../../services/actions/PostRequests';
import { RootContext } from '../../services/Stores/RootStore';
import { SOMETHING_WENT_WRONG } from '../../Utils/AppConstants';
import { IUserDataResponse } from '../Draft/DraftProgress';

interface IUserInformationProps {}

const userInfoText: string = "User Information";
const usernameUpdated: string = "Username Updated!";

export const UserInformation: React.FC = (props: IUserInformationProps) => {
	const [refresh, SetRefresh] = React.useState<number>(0);
    const [requestResult, SetRequestResult] = React.useState<string>("");
    const [newUserName, SetNewUserName] = React.useState<string>("");

	const { state } = React.useContext(RootContext);

	React.useEffect(() => {
	}, [state]);

    const changeUsername = () => {
        UpdateUser(state.AppStore.Email, null, state.AppStore.GroupId, newUserName).then((response: IUserDataResponse) => {
            SetRequestResult(usernameUpdated);
        }).catch((reason: any) => {
            SetRequestResult(SOMETHING_WENT_WRONG);
            console.log(reason);
        });
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
                            <Form.Control type="text" placeholder={state.AppStore.Username} onChange={(e) => updateUserName(e)} />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Button
                            onClick={() => changeUsername()}
                            aria-controls="change-username-request"
                            variant={"dark"}>
                            Submit
                        </Button>
                        <br />
                        <span>{requestResult}</span>
                    </Col>
                </Row>
            </Container>
        </div>
	);
}