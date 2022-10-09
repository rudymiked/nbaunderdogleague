import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './TeamSelector.css';
import BootstrapTable, { ColumnDescription, SelectRowProps } from 'react-bootstrap-table-next';
import { Loading } from '../../Shared/Loading';
import { Error } from '../../Error/Error';
import { IEntity } from '../../../App';
import { sortCaretFunc } from '../../../Utils/Utils';
import { RootContext } from '../../../services/Stores/RootStore';
import GetAvailableTeamsToDraft from '../../../services/data/GetAvailableTeamsToDraft';
import DraftTeamAction from '../../../services/actions/DraftTeamAction';
import { Guid } from 'guid-typescript';
import { IUserData } from '../SidePanel/DraftProgress';

export interface ITeamSelectorProps {
	SetUserDrafted: React.Dispatch<React.SetStateAction<IUserData>>;
	currentDate: Date;
	draftStartTime: number;
	draftEndTime: number;
}

interface ITeamsTableData extends IEntity {
	name: string;
	city: string;
	projectedWin: number;
	projectedLoss: number;
}
interface ITeamsTableResponse {
	data: ITeamsTableData[];
}

export const success = "Success";
export const draftButtonText = "Draft!";

export const TeamSelector: React.FunctionComponent<ITeamSelectorProps> = (props: ITeamSelectorProps) => {
	const [selectedTeam, SetSelectedTeam] = React.useState<ITeamsTableData>();
	const [data, SetData] = React.useState<ITeamsTableData[]>([]);
	const [dataLoaded, SetDataLoaded] = React.useState<Boolean>(false);
	const [dataFailedToLoad, SetDataFailedToLoad] = React.useState<Boolean>(false);
	const [teamSelected, SetTeamSelected] = React.useState<Boolean>(false);
	const [draftingResultText, SetDraftingResultText] = React.useState<string>("");

	const { state, dispatch } = React.useContext(RootContext);

	React.useEffect(() => {
		if (props.currentDate.getMinutes() % 5 === 0 && props.currentDate.getSeconds() === 0) {
			getAvailableTeams();
		}
	}, [props.currentDate]);

	React.useEffect(() => {
		if (state.AppStore.GroupId !== "") {
			getAvailableTeams();
		}
	}, [state]);

	const getAvailableTeams = () => {
		SetDataLoaded(false);
		GetAvailableTeamsToDraft(state.AppStore.GroupId).then((response: ITeamsTableResponse) => {
			if (response?.data) {
				SetDataLoaded(true);
				SetData(response?.data);
			}
		}).catch((reason: any) => {
			SetDataLoaded(true);
			SetDataFailedToLoad(true);
		});
	}

	const columns: ColumnDescription[] = [
		{
			dataField: 'name',
			text: 'Team',
			sort: true,
			sortCaret: sortCaretFunc,
		},
		{
			dataField: 'projectedWin',
			text: 'Projected Wins',
			sort: true,
			sortCaret: sortCaretFunc,
		},
		{
			dataField: 'projectedLoss',
			text: 'Projected Losses',
			sort: true,
			sortCaret: sortCaretFunc,
		}
	];

	const onSelect = (row: any, isSelected: boolean) => {
		SetSelectedTeam(row);
		SetTeamSelected(true);
	};

    const selectRow: SelectRowProps<any> = {
        mode: 'radio',
        clickToSelect: true,
		onSelect: onSelect,
        style: { background: '#cf5c36' },
    };

	const handleDraftClicked = () => {
		// TODO Make this have state so the value is actually correct. Having a default blank/disabled is kind of a workaround
		if (selectedTeam?.name !== '') {
			DraftTeamAction(state.AppStore.GroupId, state.AppStore.Email, selectedTeam.name).then((response: any) => {
				if (response?.data) {
					const data = response.data;
					if (data === success) {
						const user: IUserData = {
							groupId: Guid.parse(state.AppStore.GroupId),
							email: state.AppStore.Email,
							team: selectedTeam.name,
							partitionKey: state.AppStore.GroupId,
							rowKey: state.AppStore.Email,
							timestamp: new Date(),
							eTag: "*",
						}

						props.SetUserDrafted(user);

						SetDraftingResultText("Successfully drafted: " + selectedTeam.city + " " + selectedTeam.name);
					} else {
						SetDraftingResultText(data);	
					}
				}
			}).catch((reason: any) => {
				console.log(reason);
			});
		}
	};

	const draftEnabled = (): boolean => {
		if (props.currentDate.getTime() < props.draftStartTime || props.currentDate.getTime() > props.draftEndTime) {
			return false;
		}

		if (!teamSelected) {
			return false
		}
		
		return true;
	}

	return (
		<Card>
			<Card.Title className='card-title'>{state.AppStore.GroupName} Draft</Card.Title>
			<Card.Body style={{overflow: 'auto'}}>
				{!dataLoaded ? (
					<Loading />
				) : ( !dataFailedToLoad ? (
					<>
						<p>Draft Start: {new Date(props.draftStartTime).toLocaleTimeString()}</p>
						<p>Draft Over: {new Date(props.draftEndTime).toLocaleTimeString()}</p>
						<Button 
							variant="danger" 
							onClick={() => handleDraftClicked()} 
							disabled={!draftEnabled()}>
							{draftButtonText}
						</Button>
						<br />
						<br />
						<p>{draftingResultText}</p>
						<br />
						<BootstrapTable
							bootstrap4
							keyField='name'
							selectRow={ selectRow }
							data={ data }
							columns={ columns } />
					</>
					) : (
						<Error />
					)
				)}
			</Card.Body>
		</Card>
	);
}