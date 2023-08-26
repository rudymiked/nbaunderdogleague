import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { IGroupData, IGroupDataArrayResponse } from "../../Pages/Profile";
import { SetupDraft } from "../Profile/SetupDraft";
import { UsersInGroupTable } from "../Profile/UsersInGroupTable";
import { RootContext } from "../../services/Stores/RootStore";
import { GetAllGroupsByYear } from "../../services/data/GetRequests";
import { ADMIN_EMAIL, CURRENT_YEAR } from "../../Utils/AppConstants";

interface IGroupManagementProps {}

export const GroupManagement: React.FunctionComponent<IGroupManagementProps> = (props: IGroupManagementProps) => {
	const [ownedGroups, SetOwnedGroups] = React.useState<IGroupData[]>([]);
	const [groups, SetGroups] = React.useState<IGroupData[]>([]);
	const [dataLoaded, SetDataLoaded] = React.useState<boolean>(false);
	const { state } = React.useContext(RootContext);
    
    React.useEffect(() => {
		if (state.AppStore.Email !== "") {
			loadGroups();

		} else {
			// user not logged in
		}
	}, [state]);


	const loadGroups = () => {
		GetAllGroupsByYear(CURRENT_YEAR).then((response: IGroupDataArrayResponse) => {
			if (response?.data) {
				const data = response.data;
				SetGroups(response.data.filter((group: IGroupData) => group.name && group.name !== ""));
				SetOwnedGroups(data.filter((group: IGroupData) => group.name && group.name !== "" && (group.owner === state.AppStore.Email || state.AppStore.Email === ADMIN_EMAIL)));
			} else {
				// something went wrong
			}

			SetDataLoaded(true);
		}).catch((reason: any) => {
			SetDataLoaded(true);
		});
	};

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <UsersInGroupTable />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <SetupDraft {...{
                            dataLoaded: dataLoaded,
                            ownedGroups: ownedGroups 
                        }} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}