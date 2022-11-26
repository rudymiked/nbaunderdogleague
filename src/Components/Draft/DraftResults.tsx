import React from 'react';
import { Card, Button } from 'react-bootstrap';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { Loading } from '../Shared/Loading';
import { Error } from '../Error/Error';
import { RootContext } from '../../services/Stores/RootStore';
import { LoginEnum } from '../../services/Stores/AppReducer';
import { GetDraftResults } from '../../services/data/GetRequests';
import { IDraftProgressData } from './DraftProgress';
import { useNavigate } from 'react-router-dom';

interface IDraftResultsProps {}

interface IDraftResultsData extends IDraftProgressData {}

interface IDraftResultsResponse {
    data: IDraftResultsData[];
}

export const DraftResults: React.FunctionComponent<IDraftResultsProps> = (props: IDraftResultsProps) => {
	const [draftResults, SetDraftResults] = React.useState<IDraftResultsData[]>([]);
	const [draftDataLoaded, SetDraftDataLoaded] = React.useState<boolean>(false);
	const [dataFailedToLoad, SetDataFailedToLoad] = React.useState<boolean>(false);
    const [cardTitle, SetCardTitle] = React.useState<string>("Draft Results");

	const { state, dispatch } = React.useContext(RootContext);

    const navigate = useNavigate();

    React.useEffect(() => {
		if (state.AppStore.GroupId !== "") {
            SetCardTitle(state.AppStore.GroupName + " Draft Results");

			SetDraftDataLoaded(false);
			GetDraftResults(state.AppStore.GroupId).then((response: IDraftResultsResponse) => {
				if (response?.data) {
					const data = response?.data;
					SetDraftDataLoaded(true);
					SetDraftResults(data.sort((a: IDraftResultsData, b: IDraftResultsData) => (a.draftOrder > b.draftOrder) ? 1 : -1));
				} else {
					// something went wrong
				}
			}).catch((reason: any) => {
				SetDraftDataLoaded(true);
				SetDataFailedToLoad(true);
			});
		}
    }, [])

	const columns: ColumnDescription[] = [
		{
			dataField: 'draftOrder',
			text: 'Order',
		},
		{
			dataField: 'user',
			text: 'User',
		},
		{
			dataField: 'teamName',
			text: 'Team'
		},
	];

	const rowStyle = (row: IDraftProgressData, rowIndex: number) => {
		const style: React.CSSProperties = {};

		if (row.user === state.AppStore.Email.split("@")[0] || row.user === state.AppStore.Username) {
			style.backgroundColor = '#c8e6c9';
		}

		return style;
	};

	return (
		<Card style={{padding: '10px'}}>
			<Card.Title className='card-title'>{cardTitle}</Card.Title>
			<Card.Body style={{overflow: 'auto'}}>
				{state.AppStore.LoginStatus !== LoginEnum.Success ? (
					<div>
						<a href="/">Please Login</a>
					</div>
					) : (state.AppStore.GroupId !== "" ? (
							(!draftDataLoaded ? (
								<Loading />
								) : (!dataFailedToLoad ? (
                                        <>
                                            <BootstrapTable
                                                keyField='draftOrder'
                                                data={draftResults}
                                                columns={columns} 
                                                rowStyle={rowStyle} 
                                            />
                                            <hr />
                                            <div>
                                                <span>{"Don't see your group?"}</span>
                                                <br /><br />
                                                <Button
                                                    onClick={() => navigate("/profile")}
                                                    aria-controls="navigate-to-profile">
                                                    {"Join or Switch Groups"}
                                                </Button>
                                            </div>
                                        </>
									) : (
										<Error />
									)
								)
							)
						) : (<p>Please select a group in your profile</p>)
					)
				}
			</Card.Body>
		</Card>
	);
}