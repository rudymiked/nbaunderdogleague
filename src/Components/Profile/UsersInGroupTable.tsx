import React from "react";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";
import GetUserData from "../../services/data/GetUserData";
import { RootContext } from "../../services/Stores/RootStore";
import { IUserData, IUserDataResponse } from "../Draft/SidePanel/DraftProgress";


interface IUsersInGroupTableProps {}

export const UsersInGroupTable: React.FunctionComponent<IUsersInGroupTableProps> = (props: IUsersInGroupTableProps) => {
    const [userData, SetUsers] = React.useState<IUserData[]>([]);
	const [userDataLoaded, SetUserDataLoaded] = React.useState<boolean>(false);
	const [dataFailedToLoad, SetDataFailedToLoad] = React.useState<boolean>(false);
    
    const { state, dispatch } = React.useContext(RootContext);

    React.useEffect(() => {
		if (state.AppStore.GroupId !== "") {
			SetUserDataLoaded(false);
			GetUserData(state.AppStore.GroupId).then((response: IUserDataResponse) => {
				if (response?.data) {
					const data = response?.data;
					SetUserDataLoaded(true);
					SetUsers(data);
				}
			}).catch((reason: any) => {
				SetUserDataLoaded(true);
				SetDataFailedToLoad(true);
			});
		}
    }, [state]);

    const columns: ColumnDescription[] = [
		{
			dataField: 'email',
			text: 'User'
		},
	];

    return (
        <>
            <h4>Users in {state.AppStore.GroupName} ({userData.length})</h4>
            <BootstrapTable
                keyField='email'
                data={userData}
                columns={columns} />
        </>
    );
}