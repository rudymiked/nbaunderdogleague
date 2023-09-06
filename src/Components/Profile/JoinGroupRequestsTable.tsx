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

interface IJoinGroupRequestsTableProps {}

interface IJoinGroupRequestsData extends IEntity {
	groupId: string;
	email: string;
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
	const [dataLoaded, SetDataLoaded] = React.useState<boolean>(false);
	const [approvalStatus, SetApprovalStatus] = React.useState<Map<string, ApprovalStatus>>();
    
    const { state, dispatch } = React.useContext(RootContext);

    React.useEffect(() => {
		if (state.AppStore.GroupId !== "") {
			SetDataLoaded(false);
			GetJoinGroupRequests(state.AppStore.GroupId).then((response: IJoinGroupRequestsDataResponse) => {
				if (response?.data && response?.data.length > 0) {
						const data = response?.data;
						SetJoinRequests(data);

						const initialApprovalStatus: Map<string, ApprovalStatus> = new Map();

						for (let d of data) {
							initialApprovalStatus[d.email] = ApprovalStatus.Default;
						}

						SetApprovalStatus(initialApprovalStatus);
					}

					SetDataLoaded(true);
				}).catch((reason: any) => {
				SetDataLoaded(true);
                SetErrorText(SOMETHING_WENT_WRONG);
			});
		}
    }, []);

	const approveGroupRequest = (email: string) => {
		const currentApprovalStatus = approvalStatus;
		currentApprovalStatus[email] = ApprovalStatus.Approving;

		SetApprovalStatus(currentApprovalStatus);

		ApproveNewGroupMemberAction(state.AppStore.GroupId, email, state.AppStore.Email).then((response: any) => {
			const currentApprovalStatus = approvalStatus;
			currentApprovalStatus[email] = ApprovalStatus.Approved;
	
			SetApprovalStatus(currentApprovalStatus);
		}).catch((reason: any) => {
			const currentApprovalStatus = approvalStatus;
			currentApprovalStatus[email] = ApprovalStatus.DidNotApprove;
			SetApprovalStatus(currentApprovalStatus);
			console.log(reason);
		})
	}

    const columns: ColumnDescription[] = [
		{
			dataField: 'email',
			text: 'email',
			sort: true,
			sortCaret: sortCaretFunc,
		},
		{
            dataField: "actions",
            text: "Approve",
            isDummyField: true,
            formatter: (cell, row) => {
				if (approvalStatus[row.email] === undefined) {
					return <SomethingWentWrong/>;
				}

				switch (approvalStatus[row.email]) {
					case ApprovalStatus.Default:
						return (				
							<Button
								onClick={() => approveGroupRequest(row.email)}
							>
								{"Approve"}
							</Button>
						);
					case ApprovalStatus.Approved:
						return <p>Approved!</p>;
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
		},
	];

    return (
		<>
			<h4>Requests for {state.AppStore.GroupName} ({joinRequests.length})</h4>
			<p>{errorText}</p>
			{dataLoaded && 
				<BootstrapTable
					keyField='email'
					data={joinRequests}
					columns={columns} />
			}
		</>
    );
}