import React from "react";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";
import { GetUserData } from "../../services/data/GetRequests";
import { RootContext } from "../../services/Stores/RootStore";
import { SOMETHING_WENT_WRONG } from "../../Utils/AppConstants";
import { IUserData, IUserDataResponse } from "./UserInformation";

interface IUsersInGroupTableProps {
}

export const UsersInGroupTable: React.FunctionComponent<IUsersInGroupTableProps> = (props: IUsersInGroupTableProps) => {
    const [userData, SetUsers] = React.useState<IUserData[]>([]);
    const [errorText, SetErrorText] = React.useState<string>("");
	const [userDataLoaded, SetUserDataLoaded] = React.useState<boolean>(false);
    
    const { state, dispatch } = React.useContext(RootContext);

    React.useEffect(() => {
		if (state.AppStore.GroupId !== "") {
			SetUserDataLoaded(false);
			GetUserData(state.AppStore.GroupId).then((response: IUserDataResponse) => {
				if (response?.data) {
					const data = response?.data;
					console.log(data);
					SetUserDataLoaded(true);
					SetUsers(data);
				}
			}).catch((reason: any) => {
				SetUserDataLoaded(true);
                SetErrorText(SOMETHING_WENT_WRONG);
			});
		}
    }, []);

    const columns: ColumnDescription[] = [
		{
			dataField: 'email',
			text: 'email'
		},
		{
			dataField: 'username',
			text: 'Username'
		},
		{
			dataField: 'team',
			text: 'Team'
		},
	];

    return (
		<>
			<h4>Users in {state.AppStore.GroupName} ({userData.length})</h4>
			<p>{errorText}</p>
			{userDataLoaded && <BootstrapTable
				keyField='email'
				data={userData}
				columns={columns} />
			}
		</>
    );
}