import React from 'react';
import { Button, Container, Dropdown, Row, Col, ToggleButton } from 'react-bootstrap';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { IGroupData, IGroupDataArrayResponse } from '../../Pages/Profile';
import { RootContext } from '../../services/Stores/RootStore';
import { Loading } from '../Shared/Loading';
import { IDraftDataResponse } from '../Draft/DraftProgress';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SetupDraftAction } from '../../services/actions/PostRequests';
import { SOMETHING_WENT_WRONG } from '../../Utils/AppConstants';
import { GetAllGroupsUserIsInByYear } from '../../services/data/GetRequests';

// Join a group that someone else has created for this season

interface ISetupDraftProps {
    refresh: number;
}

export interface ISetupDraftResults {
	email: string;
	draftOrder: number;
	userStartTime: string;
	userEndTime: string;
}

const chooseGroupText = "Choose Group";

const hourOptions: number[] = [...Array(24).keys()];
const minuteOptions: number[] = [];
const windowOptions: number[] = [];

export const SetupDraft: React.FunctionComponent<ISetupDraftProps> = (props: ISetupDraftProps) => {
	const [requestResult, SetRequestResult] = React.useState<string>("");
	const [setupDraftData, SetSetupDraftData] = React.useState<ISetupDraftResults[]>([]);
	const [chooseGroupDropdownText, SetChooseGroupDropdownText] = React.useState<string>(chooseGroupText);
	const [selectedGroupId, SetSelectedGroupId] = React.useState<string>("");
	const [selectedGroupName, SetSelectedGroupName] = React.useState<string>("");
    const [clearTeams, SetClearTeams] = React.useState<boolean>(true);
    const [settingUpDraft, SetSettingUpDraft] = React.useState<boolean>(false);
    const [draftDate, SetDraftDate] = React.useState<Date>(new Date());
    const [draftHour, SetDraftHour] = React.useState<number>(0);
    const [draftMinute, SetDraftMinute] = React.useState<number>(0);
    const [draftWindow, SetDraftWindow] = React.useState<number>(5);

	const { state, dispatch } = React.useContext(RootContext);

    const [ownedGroups, SetOwnedGroups] = React.useState<IGroupData[]>([]);
	const [dataLoaded, SetDataLoaded] = React.useState<boolean>(false);
     
    React.useEffect(() => {
        if (state.AppStore.Email !== "") {
			loadGroups();

		} else {
			// user not logged in
		}

        minuteOptions.length = 0; // reset
        for (let i: number = 0;i<=55;i = i + 5) {
            minuteOptions.push(i);
        }

        windowOptions.length = 0;
        windowOptions.push(5);
        windowOptions.push(10);
    }, [props.refresh]);

	const loadGroups = () => {
		GetAllGroupsUserIsInByYear(state.AppStore.Email).then((response: IGroupDataArrayResponse) => {
			if (response?.data) {
				const data = response.data;
				SetOwnedGroups(data.filter((group: IGroupData) => group.name && group.name !== "" && (group.owner === state.AppStore.Email) && group.id.toString() === state.AppStore.GroupId));
			} else {
				// something went wrong
			}

			SetDataLoaded(true);
		}).catch((reason: any) => {
			SetDataLoaded(true);
		});
	};

	const selectAGroup = (key: string, name: string) => {
		SetSelectedGroupId(key);
		SetSelectedGroupName(name);
		SetChooseGroupDropdownText(name);
	};

	const setupDraftRequest = () => {
        draftDate.setHours(draftHour);
        draftDate.setMinutes(draftMinute);
        
        const utcDraftDate: Date = new Date(draftDate.toUTCString());

		SetupDraftAction(selectedGroupId, state.AppStore.Email, clearTeams, utcDraftDate, draftWindow).then((response: IDraftDataResponse) => {
			if (response?.data !== undefined) {
                SetRequestResult("");
                const data = response?.data;
                const draftResults: ISetupDraftResults[] = [];
                
                for(const d of data) {
                    draftResults.push({
                        draftOrder: d.draftOrder,
                        email: d.email,
                        userStartTime: new Date(d.userStartTime).toDateString(),
                        userEndTime: new Date(d.userEndTime).toString(),
                    });
                }

                SetSetupDraftData(draftResults.sort((a: ISetupDraftResults, b: ISetupDraftResults) => (a.draftOrder > b.draftOrder) ? 1 : -1));
			}
		}).catch((reason: any) => {
            SetRequestResult(SOMETHING_WENT_WRONG);
			SetSetupDraftData([]);
		});
	};

    const columns: ColumnDescription[] = [
		{
			dataField: 'draftOrder',
			text: 'Order'
		},
		{
			dataField: 'email',
			text: 'User'
		},
		{
			dataField: 'userStartTime',
			text: 'Start Draft Time'
		},
		{
			dataField: 'userEndTime',
			text: 'End Draft Time'
		},
	];

	return (
		<div style={{padding: "10px", display:"block"}}>
			{dataLoaded ? (
				ownedGroups.length !== 0 ? (
					<div id="choose-a-group-collapse-text">
                        <h4>Setup Draft</h4>
						<Dropdown>
							<Dropdown.Toggle id="groups-dropdown">
								{chooseGroupDropdownText}
							</Dropdown.Toggle>
							<Dropdown.Menu>
								{ownedGroups.filter((val) => val?.name !== "").map(group => (
									<Dropdown.Item
										key={group.id.toString()}
										value={group.name}
										onClick={() => selectAGroup(group.id.toString(), group.name)}>
										{group.name}
									</Dropdown.Item>
								))}
							</Dropdown.Menu>
						</Dropdown>
						<br />

						{selectedGroupId !== "" &&
							<>
                                <p><b>Settings</b></p>
                                <Container>
                                    <Row>
                                        <Col>
                                            <p>Draft Date</p>
                                            <DatePicker 
                                                selected={draftDate} 
                                                onChange={(date: Date) => SetDraftDate(date)} />
                                        </Col>
                                        <Col>
                                            <p>Start Hour</p>
                                            <Dropdown>
                                                <Dropdown.Toggle id="groups-dropdown">
                                                    {draftHour}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {hourOptions.map(hour => (
                                                        <Dropdown.Item
                                                            key={hour}
                                                            value={hour}
                                                            onClick={() => SetDraftHour(hour)}>
                                                            {hour}
                                                        </Dropdown.Item>
                                                    ))}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                        <Col>
                                            <p>Start Minute</p>
                                            <Dropdown>
                                                <Dropdown.Toggle id="groups-dropdown">
                                                    {draftMinute}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {minuteOptions.map(minute => (
                                                        <Dropdown.Item
                                                            key={minute}
                                                            value={minute}
                                                            onClick={() => SetDraftMinute(minute)}>
                                                            {minute}
                                                        </Dropdown.Item>
                                                    ))}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                        <Col>
                                            <p>Draft Window</p>
                                            <Dropdown>
                                                <Dropdown.Toggle id="groups-dropdown">
                                                    {draftWindow}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {windowOptions.map(window => (
                                                        <Dropdown.Item
                                                            key={window}
                                                            value={window}
                                                            onClick={() => SetDraftWindow(window)}>
                                                            {window}
                                                        </Dropdown.Item>
                                                    ))}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                        <Col> 
                                            <p>Clear Teams?</p>                             
                                            <ToggleButton
                                                className="mb-2"
                                                id="toggle-clear-teams"
                                                type="checkbox"
                                                variant="outline-primary"
                                                checked={clearTeams}
                                                value="1"
                                                onChange={(e) => SetClearTeams(e.currentTarget.checked)}>
                                                {"Clear Teams"}
                                            </ToggleButton> 
                                        </Col>
                                    </Row>
                                </Container>
                                <br />
								<Button
									onClick={() => {
                                        SetSettingUpDraft(true);
										SetSetupDraftData([]);
										setupDraftRequest();
                                        SetSettingUpDraft(false);
									}}
                                    variant="danger"
                                    disabled={settingUpDraft}
									aria-controls="setup-draft-request">
									{"Setup Draft"}
								</Button>
                                <br />
                                <br />
                                <BootstrapTable
									keyField='draftOrder'
									data={setupDraftData}
									columns={columns} />
							</>
						}
					</div>
				) : (
					<div>
					</div>
				)
				) : (
				<div>
					<Loading />
				</div>
				)
			}
			<span>{requestResult}</span>
		</div>
	);
}