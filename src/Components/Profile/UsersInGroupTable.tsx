import React from "react";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";
import { GetUserData } from "../../services/data/GetRequests";
import { AppActionEnum } from "../../services/Stores/AppReducer";
import { RootContext } from "../../services/Stores/RootStore";
import { SOMETHING_WENT_WRONG } from "../../Utils/AppConstants";
import { IUserData, IUserDataResponse } from "../Draft/DraftProgress";

interface IUsersInGroupTableProps {}

export const UsersInGroupTable: React.FunctionComponent<IUsersInGroupTableProps> = (props: IUsersInGroupTableProps) => {
    const [userData, SetUsers] = React.useState<IUserData[]>([]);
    const [draftingResultText, SetDraftingResultText] = React.useState<string>("");
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

                    const userInfo: IUserData[] =  data?.filter((u: IUserData) => u.email === state.AppStore.Email);
                    const username: string = userInfo.length > 0 ? userInfo[0].username : state.AppStore.Email.split["@"][0];

                    if (state.AppStore.Username === "") {
                        dispatch({
                            type: AppActionEnum.UPDATE_USERNAME,
                            Username: username!,
                        });
                    }
				}
			}).catch((reason: any) => {
				SetUserDataLoaded(true);
                SetDraftingResultText(SOMETHING_WENT_WRONG);
				SetDataFailedToLoad(true);
			});
		}
    }, [state]);

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
            <p>{draftingResultText}</p>
            {userDataLoaded && <BootstrapTable
                keyField='email'
                data={userData}
                columns={columns} />
            }
        </>
    );
}