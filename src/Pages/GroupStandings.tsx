import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Error } from '../Components/Error/Error';
import { YourGroups } from '../Components/Groups/YourGroups';
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

	const navigate = useNavigate();

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
						<div>
							<span>{PleaseSelectGroup}</span>
							<br /><br />
							<YourGroups />
						</div>
					) : (!dataLoaded ? (
							<Loading />
						) : (!dataFailedToLoad ? (
								<GroupStandingsTable data={data} />
							) : (
								<Error />
							)
						)
					)}

					<div>
						<span>{"Don't see your group?"}</span>
						<br /><br />
						<Button
							onClick={() => navigate("/profile")}
							aria-controls="navigate-to-profile">
							{"Join a Group"}
						</Button>
					</div>
				</Card.Body>
			</Card>
		</div>
	);
}