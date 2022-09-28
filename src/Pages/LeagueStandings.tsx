import React from 'react';
import { Card } from 'react-bootstrap';
import { Error } from '../Components/Error/Error';
import { LeagueStandingsTable } from '../Components/Standings/LeagueStandingsTable';
import GetLeagueStandingsData from '../services/data/GetLeagueStandingsData';

export interface ILeagueStandingData {
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

export interface ILeagueStandingDataResponse {
	data: ILeagueStandingData[];
}

interface IStandingsPageProps {}

const Title = "League Standings";
const loadingDataText: string = "Loading Data...";

export const LeagueStandings: React.FunctionComponent<IStandingsPageProps> = (props: IStandingsPageProps) => {
	const [data, SetData] = React.useState<ILeagueStandingData[]>([]);
	const [dataFailedToLoad, SetDataFailedToLoad] = React.useState<Boolean>(false);
	const [dataLoaded, SetDataLoaded] = React.useState<boolean>(false);

	React.useEffect(() => {
		GetLeagueStandingsData().then((response: ILeagueStandingDataResponse) => {
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
							<LeagueStandingsTable data={data} />
						) : (
							<Error />
						)
					)}
				</Card.Body>
			</Card>
		</div>
	);
}