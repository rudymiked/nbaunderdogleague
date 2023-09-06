import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { UpdateUser } from '../../services/actions/PostRequests';
import { RootContext } from '../../services/Stores/RootStore';
import { SOMETHING_WENT_WRONG } from '../../Utils/AppConstants';
import { IEntity } from '../../App';
import { GetUserData } from '../../services/data/GetRequests';
import { AppActionEnum } from '../../services/Stores/AppReducer';
import { Guid } from 'guid-typescript';

interface IUserInformationProps {}

export interface IUserData extends IEntity {
	email: string;
	team: string;
	groupId: Guid;
	username: string;
}

export interface IUserDataResponse {
	data: IUserData[];
}

const userInfoText: string = "User Information";
const usernameUpdated: string = "Username Updated!";

export const UserInformation: React.FC = (props: IUserInformationProps) => {
    const [requestResult, SetRequestResult] = React.useState<string>("");
    const [newUserName, SetNewUserName] = React.useState<string>("");

	const { state, dispatch } = React.useContext(RootContext);

    React.useEffect(() => {
        if (state.AppStore.GroupId !== "") {
			GetUserData(state.AppStore.GroupId).then((response: IUserDataResponse) => {
				if (response?.data) {
                    const userInfo: IUserData[] = response.data?.filter((u: IUserData) => u.email === state.AppStore.Email);
                    const username: string = userInfo.length > 0 ? userInfo[0].username : state.AppStore.Email.split["@"][0];
            
                    if (state.AppStore.Username === "") {
                        dispatch({
                            type: AppActionEnum.UPDATE_USERNAME,
                            Username: username!,
                        });
                    }
				}
			}).catch((reason: any) => {
                console.log(reason);
			});
		}
    }, [])

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