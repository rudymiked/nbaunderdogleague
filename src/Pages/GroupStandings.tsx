import React from 'react';
import { Card } from 'react-bootstrap';
import { Error } from '../Components/Error/Error';
import { Loading } from '../Components/Shared/Loading';
import { GroupStandingsTable } from '../Components/Standings/GroupStandingsTable';
import GetGroupStandingsData from '../services/data/GetGroupStandingsData';
import { RootContext } from '../services/Stores/RootStore';

export interface IGroupStandingsData {
    governor: string;
    teamName: string;
    teamCity: string;
    projectedWin: number;
    projectedLoss: number;
    win: number;
    loss: number;
	score: number;
    playoffs: string;
}

export interface IGroupStandingsDataResponse {
	data: IGroupStandingsData[];
}

interface IStandingsPageProps {}

const Title = "Group Standings";
const PleaseSelectGroup = "Please select a group.";

export const GroupStandings: React.FunctionComponent<IStandingsPageProps> = (props: IStandingsPageProps) => {
	const [data, SetData] = React.useState<IGroupStandingsData[]>([]);
	const [dataFailedToLoad, SetDataFailedToLoad] = React.useState<Boolean>(false);
	const [dataLoaded, SetDataLoaded] = React.useState<boolean>(false);
	const [noGroup, SetNoGroup] = React.useState<boolean>(false);

	const { state, dispatch } = React.useContext(RootContext);

	React.useEffect(() => {
		if (state.AppStore.GroupId !== "") {
			SetNoGroup(false);
			GetGroupStandingsData(state.AppStore.GroupId).then((response: IGroupStandingsDataResponse) => {
				if (response?.data) {
					SetDataLoaded(true);
					SetData(response?.data);
				}
			}).catch((reason: any) => {
				SetDataLoaded(true);
				SetDataFailedToLoad(true);
			});
		} else {
			SetNoGroup(true);
		}
	}, [state]);

	return (
		<div className='page-body'>
			<Card style={{padding: '10px'}}>
				<Card.Title className='card-title'>{Title}</Card.Title>
				<Card.Body style={{overflow: 'auto'}}>
					{noGroup ? (
						<span>{PleaseSelectGroup}</span>
					) : (!dataLoaded ? (
							<Loading />
						) : (!dataFailedToLoad ? (
								<GroupStandingsTable data={data} />
							) : (
								<Error />
							)
						)
					)}
				</Card.Body>
			</Card>
		</div>
	);
}