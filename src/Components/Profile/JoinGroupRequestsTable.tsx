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
	const [approvalStatus, SetApprovalStatus] = React.useState<ApprovalStatus>(ApprovalStatus.Default);
    
    const { state, dispatch } = React.useContext(RootContext);

    React.useEffect(() => {
		if (state.AppStore.GroupId !== "") {
			SetDataLoaded(false);
			GetJoinGroupRequests(state.AppStore.GroupId).then((response: IJoinGroupRequestsDataResponse) => {
				if (response?.data) {
					const data = response?.data;
					SetDataLoaded(true);
					SetJoinRequests(data);
				}
			}).catch((reason: any) => {
				SetDataLoaded(true);
                SetErrorText(SOMETHING_WENT_WRONG);
			});
		}
    }, []);

	const approveGroupRequest = (email: string) => {
		SetApprovalStatus(ApprovalStatus.Approving);

		ApproveNewGroupMemberAction(state.AppStore.GroupId, email, state.AppStore.Email).then((response: any) => {
			SetApprovalStatus(ApprovalStatus.Approved);
		}).catch((reason: any) => {
			SetApprovalStatus(ApprovalStatus.DidNotApprove);
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
				switch (approvalStatus) {
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