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
    playoffs: string;
}

export interface ILeagueStandingDataResponse {
	data: ILeagueStandingData[];
}

interface IStandingsPageProps {}

const Title = "Standings";

export const Standings: React.FunctionComponent<IStandingsPageProps> = (props: IStandingsPageProps) => {
	const [data, SetData] = React.useState<ILeagueStandingData[]>([]);
	const [dataFailedToLoad, SetDataFailedToLoad] = React.useState<Boolean>(false);

	React.useEffect(() => {
		GetLeagueStandingsData().then((response: ILeagueStandingDataResponse) => {
			if (response?.data) {
				SetData(response?.data);
			}
		}).catch((reason: any) => {
			SetDataFailedToLoad(true);
		});
	}, []);

	return (
		<div className='page-body'>
			<Card style={{padding: '10px'}}>
				<Card.Title>{Title}</Card.Title>
				<Card.Body>
					{!dataFailedToLoad ? (
						<LeagueStandingsTable data={data} />
					) : (
						<Error />
					)}
				</Card.Body>
			</Card>
		</div>
	);
}