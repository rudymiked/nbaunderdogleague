import React from 'react';
import { Button, Collapse, Form } from 'react-bootstrap';
import { ICreateGroupDataResponse, IGroupData, IGroupDataResponse } from '../../Pages/Profile';
import { CreateGroupAction } from '../../services/actions/PostRequests';
import { RootContext } from '../../services/Stores/RootStore';
import { SOMETHING_WENT_WRONG, SUCCESS } from '../../Utils/AppConstants';

interface ICreateGroupProps {
	refresh: number;
	SetRefresh: React.Dispatch<React.SetStateAction<number>>;
}

const buttonText: string = "Create a Group";
const blankGroupName: string = "Group name cannot be blank.";

export const CreateGroup: React.FunctionComponent<ICreateGroupProps> = (props: ICreateGroupProps) => {
	const [newGroup, SetNewGroup] = React.useState<IGroupData>();
	const [open, SetOpen] = React.useState<boolean>(false);
	const [groupName, SetGroupName] = React.useState<string>("");
	const [requestResult, SetRequestResult] = React.useState<string>("");
	const [createGroupDisabled, SetCreateGroupDisabled] = React.useState<boolean>(false);

	const { state, dispatch } = React.useContext(RootContext);

	const requestANewGroup = () => {
		if (groupName !== "") {
			CreateGroupAction(groupName, state.AppStore.Email).then((response: ICreateGroupDataResponse) => {
				if (response?.data.groupEntity && response.data.groupEntity?.name !== null && response.data.groupEntity?.name !== "") {
						SetNewGroup(response.data.groupEntity);
						
						const groupSuccessMessage: string = "Group: " + response.data.groupEntity.name + " successfully created!";
						
						props.SetRefresh((refresh: number) => refresh + 1);
											
						SetCreateGroupDisabled(true);
					if (response?.data.status === SUCCESS) {
						SetRequestResult(groupSuccessMessage);
					} else {
						SetRequestResult(response.data.status);
					}
				} else {
					SetRequestResult(SOMETHING_WENT_WRONG);
				}
			}).catch((reason: any) => {
				console.log(reason);
				SetRequestResult(SOMETHING_WENT_WRONG);
			});
		} else {
			SetRequestResult(blankGroupName);
		}
	};

	const updateGroupName = (e: any) => {
		SetGroupName(e.target.value);
	};

	return (
		<div style={{padding: "10px", display:"block"}}>
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
						disabled={createGroupDisabled}
					>
						Submit
					</Button>
					<br />
					<span>{requestResult}</span>
				</div>
			</Collapse>
		</div>
	);
}