import React from 'react';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { RootContext } from '../../services/Stores/RootStore';
import { sortCaretFunc } from '../../Utils/Utils';
import { SomethingWentWrong } from '../Error/SomethingWentWrong';
import { Loading } from '../Shared/Loading';
import { GetAllGroupsUserIsInByYear, GetGroupStandingsData } from '../../services/data/GetRequests';
import { IGroupData, IGroupDataArrayResponse } from '../../Pages/Profile';
import { AppActionEnum } from '../../services/Stores/AppReducer';

export interface IGroupStandingsData {
    governor: string;
    email: string;
    teamName: string;
    teamCity: string;
    projectedWin: number;
    projectedLoss: number;
    win: number;
    loss: number;
	score: number;
	playoffWins: number;
    playoffs: string;
}

export interface IGroupStandingsDataResponse {
	data: IGroupStandingsData[];
}

export interface IGroupStandingsTableProps {}

export const GroupStandingsTable: React.FunctionComponent<IGroupStandingsTableProps> = (props: IGroupStandingsTableProps) => {
	const [groupId, SetGroupId] = React.useState<string>("");
	const [data, SetData] = React.useState<IGroupStandingsData[]>([]);
	const [dataFailedToLoad, SetDataFailedToLoad] = React.useState<boolean>(false);
	const [dataLoaded, SetDataLoaded] = React.useState<boolean>(false);
	const [noGroups, SetNoGroups] = React.useState<boolean>(false);
	const { state, dispatch } = React.useContext(RootContext);

	React.useEffect(() => {
		if (groupId !== "") {
			SetNoGroups(false);

			GetGroupStandingsData(groupId).then((response: IGroupStandingsDataResponse) => {
				if (response?.data) {
					const data = response.data;
					SetDataLoaded(true);
					SetData(data);
				} else {
					// no standings data
				}
			}).catch((reason: any) => {
				SetDataLoaded(true);
				SetDataFailedToLoad(true);
			});
		}
	},	[groupId]);

	React.useEffect(() => {
		if (state.AppStore.Email !== "") {
			// user has logged in

			// is a user in (a) group(s)?
			// if so, show standings of first group queried.
			// give option to switch groups
			updateGroup();
		}
	}, [state]);

	const updateGroup = () => {
		if (state.AppStore.GroupId === "" && state.AppStore.Email !== "") {
			// group ID has not been set
			// need to load groups and set first index for standings
			// also need to set group ID in context
			
			GetAllGroupsUserIsInByYear(state.AppStore.Email).then((response: IGroupDataArrayResponse) => {
				if (response?.data) {
					const data = response.data;
					if (data.length > 0) {
						const firstGroup: IGroupData = data.find((group: IGroupData) => group.name && group.name !== "")!;

						if (firstGroup?.id.toString() !== "") {
							dispatch({
								type: AppActionEnum.UPDATE_GROUP,
								GroupId: firstGroup.id!,
								GroupName: firstGroup.name!,
							});
						}
					} else {
						// user is not in any groups
						SetNoGroups(true);
					}

					SetDataLoaded(true);
				}
			}).catch((reason) => {
				SetDataLoaded(true);
				SetDataFailedToLoad(true);
			});
		} else {
			// if group has already been loaded, but user chooses to change the group.
			SetGroupId(state.AppStore.GroupId);
		}
	}

	const columns: ColumnDescription[] = [
		{
			dataField: 'score',
			text: 'Score',
			sort: true,
			sortCaret: sortCaretFunc,
			style: (cell, row, rowIndex, colIndex) => {
				// color scale for points
				const score: number = row.score
				switch (true) {
					case score < .5: 
						return { backgroundColor: '#D92828' }
					case score < .75: 
						return { backgroundColor: '#D94628' }
					case score < 1: 
						return { backgroundColor: '#F67B43' }
					case score < 1.25: 
						return { backgroundColor: '#F6E743' }
					case score < 1.5: 
						return { backgroundColor: '#D9F643' }
					case score < 2: 
						return { backgroundColor: '#77F643' }					
					default: 
						return { backgroundColor: '#43F657' }
				}
			}
		},
		{
			dataField: 'governor',
			text: 'Governor',
			sort: true,
			sortCaret: sortCaretFunc,
		},
		{
			dataField: 'teamName',
			text: 'Team',
			sort: true,
			sortCaret: sortCaretFunc,
		},
		{
			dataField: 'win',
			text: 'W',
			sort: true,
			sortCaret: sortCaretFunc,
		},
		{
			dataField: 'loss',	
			text: 'L',
			sort: true,
			sortCaret: sortCaretFunc,
		},
		{
			dataField: 'playoffWins',
			text: 'Playoff W',
			sort: true,
			sortCaret: sortCaretFunc,
		},
		{
			dataField: 'projectedWin',
			text: 'Proj. W',
			sort: true,
			sortCaret: sortCaretFunc,
		},
		{
			dataField: 'projectedLoss',
			text: 'Proj. L',
			sort: true,
			sortCaret: sortCaretFunc,
		}
	];

	const rowStyle = (row: IGroupStandingsData, rowIndex: number) => {
		const style: React.CSSProperties = {};
		
		if (row.email === state.AppStore.Email) {
			style.fontWeight = 'bold';
		}

		return style;
	};

	return (
		<>
		{!dataLoaded && groupId && groupId !== "" ? (
			<Loading />
			) : (!dataFailedToLoad ? (
					<div hidden={noGroups}>
						<div hidden={data.length === 0}>
						<BootstrapTable 
						keyField='teamName'
						defaultSorted={[
							{
								dataField: 'name',
								order: 'desc' 
							}]}
						data={ data } 
						columns={ columns }
						rowStyle={rowStyle} 
					/>
						</div>
					</div>
				) : (
					<SomethingWentWrong />
				)
			)
		}
		</>
	);
}