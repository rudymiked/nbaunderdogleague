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

export interface ITeamSelectorProps {}

interface ITeamsTableData extends IEntity {
	name: string;
	city: string;
	projectedWin: number;
	projectedLoss: number;
}
interface ITeamsTableResponse {
	data: ITeamsTableData[];
}

export const TeamSelector: React.FunctionComponent<ITeamSelectorProps> = (props: ITeamSelectorProps) => {
	const [selectedTeam, SetSelectedTeam] = React.useState<ITeamsTableData>();
	const [data, SetData] = React.useState<ITeamsTableData[]>([]);
	const [dataLoaded, SetDataLoaded] = React.useState<Boolean>(false);
	const [dataFailedToLoad, SetDataFailedToLoad] = React.useState<Boolean>(false);

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
			// TODO Make an API call
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
				<p><b>{selectedTeam ? selectedTeam.city : "."} {selectedTeam?.name}</b></p>
				<br />
				{!dataLoaded ? (
					<Loading />
				) : ( !dataFailedToLoad ? (
					<BootstrapTable
						bootstrap4
						keyField='name'
						selectRow={selectRow}
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