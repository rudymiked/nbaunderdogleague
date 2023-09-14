import React from "react";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";
import { GetJoinGroupRequests } from "../../services/data/GetRequests";
import { RootContext } from "../../services/Stores/RootStore";
import { SOMETHING_WENT_WRONG } from "../../Utils/AppConstants";
import { IEntity } from "../../App";
import { Button } from "react-bootstrap";
import { ApproveNewGroupMemberAction } from "../../services/actions/PostRequests";
import { SomethingWentWrong } from "../Error/SomethingWentWrong";
import { sortCaretFunc } from "../../Utils/Utils";

interface IJoinGroupRequestsTableProps {
	refresh: number;
	SetRefresh: React.Dispatch<React.SetStateAction<number>>;
}

interface IJoinGroupRequestsData extends IEntity {
	groupId: string;
	email: string;
	approvalStatus: ApprovalStatus;
}

interface IJoinGroupRequestsDataResponse {
	data: IJoinGroupRequestsData[];
}

enum ApprovalStatus {
	Default, // initial state
	DidNotApprove,
	Approved,
	Approving
}

export const JoinGroupRequestsTable: React.FunctionComponent<IJoinGroupRequestsTableProps> = (props: IJoinGroupRequestsTableProps) => {
    const [joinRequests, SetJoinRequests] = React.useState<IJoinGroupRequestsData[]>([]);
    const [errorText, SetErrorText] = React.useState<string>("");
	const [updateData, SetUpdateData] = React.useState<string>("");
    
    const { state, dispatch } = React.useContext(RootContext);

    React.useEffect(() => {
		if (state.AppStore.GroupId !== "") {
			GetJoinGroupRequests(state.AppStore.GroupId, state.AppStore.Email).then((response: IJoinGroupRequestsDataResponse) => {
				if (response?.data && response?.data.length > 0) {
						const data = response?.data;
						SetJoinRequests(data);

					for (let d of data) {
						d.approvalStatus = ApprovalStatus.Default;
					}
					
					SetJoinRequests(data);
				}
			}).catch((reason: any) => {
				console.log(reason);
                SetErrorText(SOMETHING_WENT_WRONG);
			});
		}
    }, []);

	React.useEffect(() => {}, [joinRequests, updateData]); // update joinRequests state

	const approveGroupRequest = (email: string) => {
		const requests: IJoinGroupRequestsData[] = joinRequests;
		const userIndex: number = requests.findIndex(o => o.email === email);
		
		requests[userIndex].approvalStatus = ApprovalStatus.Approving;

		SetJoinRequests(requests);

		SetUpdateData(Date.now().toLocaleString());

		ApproveNewGroupMemberAction(state.AppStore.GroupId, email, state.AppStore.Email).then((response: any) => {
			const requests: IJoinGroupRequestsData[] = joinRequests;
			const userIndex: number = requests.findIndex(o => o.email === email);
			
			requests[userIndex].approvalStatus = ApprovalStatus.Approved;
	
			SetJoinRequests(requests);

			SetUpdateData(Date.now().toLocaleString());
		}).catch((reason: any) => {
			const requests: IJoinGroupRequestsData[] = joinRequests;
			const userIndex: number = requests.findIndex(o => o.email === email);
			
			requests[userIndex].approvalStatus = ApprovalStatus.DidNotApprove;
	
			SetJoinRequests(requests);

			SetUpdateData(Date.now().toLocaleString());

			console.log(reason);
		}).finally(() => {
			props.SetRefresh((refresh) => refresh + 1);
		})
	}

	const buttonFormatter = (cell: any, row: IJoinGroupRequestsData) => {
		if (row.approvalStatus === undefined) {
			return <SomethingWentWrong/>;
		}

		switch (row.approvalStatus) {
			case ApprovalStatus.Default:
				return (				
					<Button
						onClick={() => approveGroupRequest(row.email)}
					>
						{"Approve"}
					</Button>
				);
			case ApprovalStatus.Approved:
				return <p><b>Approved!</b></p>;
			case ApprovalStatus.Approving:
				return (				
					<Button
						disabled={true}>
						{"Please Wait..."}
					</Button>
				);
			case ApprovalStatus.DidNotApprove:
				return <SomethingWentWrong/>;
			default: {
				return <></>;
			}
		}
	}

    const columns: ColumnDescription[] = [
		{
			dataField: 'email',
			text: 'Email',
			sort: true,
			sortCaret: sortCaretFunc,
		},
		{
            dataField: "approvalStatus",
            text: "Approve",
            formatter: buttonFormatter.bind(this)
		},
	];

    return (
		<>
			<h4>Requests for {state.AppStore.GroupName} ({joinRequests.length})</h4>
			<p>{errorText}</p>
			<BootstrapTable
				keyField='email'
				data={joinRequests}
				columns={columns}
			/>
		</>
    );
}