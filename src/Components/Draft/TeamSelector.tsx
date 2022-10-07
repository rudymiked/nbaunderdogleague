import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './TeamSelector.css';
import BootstrapTable, { ColumnDescription, SelectRowProps } from 'react-bootstrap-table-next';
import { Loading } from '../Shared/Loading';
import { Error } from '../Error/Error';
import { IEntity } from '../../App';
import { sortCaretFunc } from '../../Utils/Utils';
import { RootContext } from '../../services/Stores/RootStore';
import GetAvailableTeamsToDraft from '../../services/data/GetAvailableTeamsToDraft';
import DraftTeamAction from '../../services/actions/DraftTeamAction';
import { IUserData } from '../SidePanel/DraftProgress';
import { Guid } from 'guid-typescript';

export interface ITeamSelectorProps {
	SetUserDrafted: React.Dispatch<React.SetStateAction<IUserData>>;
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

export const TeamSelector: React.FunctionComponent<ITeamSelectorProps> = (props: ITeamSelectorProps) => {
	const [selectedTeam, SetSelectedTeam] = React.useState<ITeamsTableData>();
	const [data, SetData] = React.useState<ITeamsTableData[]>([]);
	const [dataLoaded, SetDataLoaded] = React.useState<Boolean>(false);
	const [dataFailedToLoad, SetDataFailedToLoad] = React.useState<Boolean>(false);
	const [draftingResultText, SetDraftingResultText] = React.useState<string>("");

	const { state, dispatch } = React.useContext(RootContext);

	React.useEffect(() => {
		if (state.AppStore.GroupId !== "") {
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
	}, [state]);

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
			console.log("Drafting: " + selectedTeam?.name);
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

	return (
		<Card className='team-selector'>
			<Card.Title className='card-title'>{state.AppStore.GroupName} Draft</Card.Title>
			<Card.Body style={{overflow: 'auto'}}>
				<Button variant="danger" onClick={() => handleDraftClicked()}>
					Draft!
				</Button>
				<br />
				<br />
				<p>{draftingResultText}</p>
				<br />
				{!dataLoaded ? (
					<Loading />
				) : ( !dataFailedToLoad ? (
					<BootstrapTable
						bootstrap4
						keyField='name'
						selectRow={ selectRow }
						data={ data }
						columns={ columns } />
					) : (
						<Error />
					)
				)}
			</Card.Body>
		</Card>
	);
}