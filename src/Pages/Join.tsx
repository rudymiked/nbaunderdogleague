import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { CURRENT_YEAR, NBAEndDate, NBAStartDate } from "../Utils/AppConstants";
import { JoinGroup } from "../Components/Profile/JoinGroup";
import { GetAllGroups } from "../services/data/GetRequests";
import { IGroupData, IGroupDataArrayResponse } from "./Profile";
import { RootContext } from "../services/Stores/RootStore";

interface IJoinPageProps {
    groupId: string;
}

export const Join: React.FunctionComponent = (props: IJoinPageProps) => {
	const [refresh, SetRefresh] = React.useState<number>(0);
	const [groups, SetGroups] = React.useState<IGroupData[]>([]);
	const [dataLoaded, SetDataLoaded] = React.useState<boolean>(false);
	const { state } = React.useContext(RootContext);

	React.useEffect(() => {
		if (state.AppStore.Email !== "") {
			loadGroups();

		} else {
			// user not logged in
		}

        console.log(props.groupId);
	}, [state]);

	const loadGroups = () => {
		GetAllGroups(true, state.AppStore.Email).then((response: IGroupDataArrayResponse) => {
			if (response?.data) {
				const data = response.data;
				SetGroups(data.filter((group: IGroupData) => group.name && group.name !== ""));
			} else {
				// something went wrong
			}

			SetDataLoaded(true);
		}).catch((reason: any) => {
			SetDataLoaded(true);
		});
	};
    
    return (
        <Container>
            <Row style={{padding: '10px', minHeight: '300px'}}>
            {/* {(new Date()).getTime() < NBAStartDate.getTime() && (new Date()).getTime() > NBAEndDate.getTime() ? ( */}
                <Card style={{padding: '10px'}}>
                    <Card.Title className='card-title'>Welcome to {CURRENT_YEAR} NBA fantasy!</Card.Title>
                    <Card.Body style={{overflow: 'auto'}}>
                        <Row>
                            <Col>
                                <JoinGroup {...{
                                    refresh,
                                    SetRefresh,
                                    groups,
                                    dataLoaded,
                                    loadGroups
                                }} />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                {/* ) : ( (new Date()).getTime() < NBAStartDate.getTime() ? (
                    <span>NBA Season has not begun. Please visit after {NBAStartDate.toDateString()}</span>
                    ) : (
                        <span>NBA Season has not ended. Please visit after {NBAEndDate.toDateString()}</span>
                    )
                )
            } */}
            </Row>
        </Container>
    );
}