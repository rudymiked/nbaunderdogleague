import React from 'react';
import { Card } from 'react-bootstrap';
import { Error } from '../Components/Error/Error';
import { StandingsTable } from '../Components/Standings/StandingsTable';
import GetStandingsData from '../services/data/GetStandingsData';

export interface IStandingData {
    governor: string;
    teamName: string;
    teamCity: string;
    projectedWin: number;
    projectedLoss: number;
    win: number;
    loss: number;
    playoffs: string;
}

export interface IStandingDataResponse {
	data: IStandingData[];
}

interface IStandingsPageProps {}

const Title = "Standings";

export const Standings: React.FunctionComponent<IStandingsPageProps> = (props: IStandingsPageProps) => {
	const [data, SetData] = React.useState<IStandingData[]>([]);
	const [dataFailedToLoad, SetDataFailedToLoad] = React.useState<Boolean>(false);

	React.useEffect(() => {
		GetStandingsData().then((response: IStandingDataResponse) => {
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
						<StandingsTable data={data} />
					) : (
						<Error />
					)}
				</Card.Body>
			</Card>
		</div>
	);
}