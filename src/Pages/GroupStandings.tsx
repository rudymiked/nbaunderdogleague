import React from 'react';
import { Card } from 'react-bootstrap';
import { Error } from '../Components/Error/Error';
import { GroupStandingsTable } from '../Components/Standings/GroupStandingsTable';
import GetGroupStandingsData from '../services/data/GetGroupStandingsData';

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
const loadingDataText: string = "Loading Data...";

export const GroupStandings: React.FunctionComponent<IStandingsPageProps> = (props: IStandingsPageProps) => {
	const [data, SetData] = React.useState<IGroupStandingsData[]>([]);
	const [dataFailedToLoad, SetDataFailedToLoad] = React.useState<Boolean>(false);
	const [dataLoaded, SetDataLoaded] = React.useState<boolean>(false);

	React.useEffect(() => {
		GetGroupStandingsData().then((response: IGroupStandingsDataResponse) => {
			if (response?.data) {
				SetDataLoaded(true);
				SetData(response?.data);
			}
		}).catch((reason: any) => {
			SetDataLoaded(true);
			SetDataFailedToLoad(true);
		});
	}, []);

	return (
		<div className='page-body'>
			<Card style={{padding: '10px'}}>
				<Card.Title className='card-title'>{Title}</Card.Title>
				<Card.Body style={{overflow: 'auto'}}>
					{!dataLoaded ? (
						<div>
							<p>{loadingDataText}</p>
						</div>
					) : ( !dataFailedToLoad ? (
							<GroupStandingsTable data={data} />
						) : (
							<Error />
						)
					)}
				</Card.Body>
			</Card>
		</div>
	);
}