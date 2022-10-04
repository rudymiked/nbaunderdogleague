import React from 'react';
import { Button, Collapse, Form } from 'react-bootstrap';
import { IGroupData, IGroupDataResponse, somethingWentWrongText } from '../../Pages/Profile';
import CreateGroupAction from '../../services/actions/CreateGroupAction';
import { RootContext } from '../../services/Stores/RootStore';

const buttonText: string = "Create a Group";
const blankGroupName: string = "Group name cannot be blank.";

export const CreateGroup: React.FunctionComponent = () => {
	const [newGroup, SetNewGroup] = React.useState<IGroupData>();
	const [open, SetOpen] = React.useState<boolean>(false);
	const [groupName, SetGroupName] = React.useState<string>("");
	const [requestResult, SetRequestResult] = React.useState<string>("");

	const { state, dispatch } = React.useContext(RootContext);

	const requestANewGroup = () => {
		if (groupName !== "") {
			CreateGroupAction(groupName, state.AppStore.Email).then((response: IGroupDataResponse) => {
				if (response?.data && response.data?.name !== null && response.data?.name !== "") {
					SetNewGroup(response.data);

					const groupSuccessMessage: string = "Group: " + response.data.name + " successfully created!";

					SetRequestResult(groupSuccessMessage);
				} else {
					SetRequestResult(somethingWentWrongText);
				}
			}).catch((reason: any) => {
				SetRequestResult(somethingWentWrongText);
			});
		} else {
			SetRequestResult(blankGroupName);
		}
	};

	const updateGroupName = (e: any) => {
		SetGroupName(e.target.value);
	};

	return (
		<>
			<Button
				variant="success"
				onClick={() => SetOpen(!open)}
				aria-controls="create-a-group-collapse-text"
				aria-expanded={open}
			>
				{buttonText}
			</Button>
			<br />
			<br />
			<Collapse in={open}>
				<div id="create-a-group-collapse-text">
					<Form.Group className="mb-3" controlId="formCreateGroup">
						<Form.Label>Group Name</Form.Label>
						<Form.Control type="text" placeholder="Group Name" onChange={(e) => updateGroupName(e)} />
						<Form.Text className="text-muted">
						</Form.Text>
					</Form.Group>
					<Button
						onClick={() => requestANewGroup()}
						aria-controls="create-a-group-request"
						aria-expanded={open}
					>
						Submit
					</Button>
					<br />
					<span>{requestResult}</span>
				</div>
			</Collapse>
		</>
	);
}